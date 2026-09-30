import React, { useEffect, useRef } from 'react';
import { Player, QuestState } from '../types';
import { npcLocations, TILE } from '../data/npcs';
import { questsData } from '../data/quests';
import { drawCharacter } from '../utils/drawCharacter';
import { playStepSound } from '../utils/audio';

interface CanvasGameProps {
  player: Player;
  setPlayer: React.Dispatch<React.SetStateAction<Player>>;
  questState: QuestState;
  activeNPC: string | null;
  setActiveNPC: (npc: string | null) => void;
  keys: { up: boolean; down: boolean; left: boolean; right: boolean; action: boolean };
  onInteract: (npcKey?: string) => void;
  dialogOpen: boolean;
}

const COLS = 70;
const ROWS = 65;
const MAP_W = COLS * TILE;
const MAP_H = ROWS * TILE;

const ROOM_INFO: Record<string, { r1: number; r2: number; c1: number; c2: number; floorType?: string }> = {
  portaria:    { r1: 5,  r2: 12, c1: 30, c2: 40, floorType: 'granite' },
  secretaria:  { r1: 17, r2: 24, c1: 10, c2: 20, floorType: 'marble' },
  diretoria:   { r1: 17, r2: 24, c1: 50, c2: 60, floorType: 'mahogany' },
  cozinha:     { r1: 29, r2: 36, c1: 10, c2: 20, floorType: 'terracotta' },
  reforco:     { r1: 29, r2: 36, c1: 50, c2: 60, floorType: 'wood' },
  financeiro:  { r1: 41, r2: 48, c1: 10, c2: 20, floorType: 'marble' },
  artes:       { r1: 41, r2: 48, c1: 50, c2: 60, floorType: 'stone' },
  ti:          { r1: 17, r2: 24, c1: 22, c2: 29, floorType: 'slate' },
  brecho:      { r1: 17, r2: 24, c1: 41, c2: 48, floorType: 'parquet' },
  comunicacao: { r1: 29, r2: 36, c1: 22, c2: 29, floorType: 'slate' },
  refeitorio:  { r1: 29, r2: 36, c1: 41, c2: 48, floorType: 'terracotta' },
  danca:       { r1: 53, r2: 60, c1: 20, c2: 30, floorType: 'parquet' },
  teatro:      { r1: 53, r2: 60, c1: 40, c2: 50, floorType: 'stage' },
  saude:       { r1: 53, r2: 60, c1: 5,  c2: 15, floorType: 'mint' },
  biblioteca:  { r1: 53, r2: 60, c1: 55, c2: 65, floorType: 'carpet' },
  jardim:      { r1: 58, r2: 62, c1: 32, c2: 38, floorType: 'gravel' }
};

function seededRand(x: number, y: number, seed = 0) {
  let n = Math.sin(x * 127.1 + y * 311.7 + seed * 74.7) * 43758.5453123;
  return n - Math.floor(n);
}

export const CanvasGame: React.FC<CanvasGameProps> = ({
  player,
  setPlayer,
  questState,
  setActiveNPC,
  keys,
  dialogOpen,
  onInteract
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mapRef = useRef<number[][]>([]);
  const camRef = useRef({ x: player.x, y: player.y });
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeNPCRef = useRef<string | null>(null);
  const lastSyncTimeRef = useRef(0);

  // Props in refs so the render loop runs uninterrupted at 60/120fps without re-triggering useEffect
  const keysRef = useRef(keys);
  useEffect(() => { keysRef.current = keys; }, [keys]);

  const dialogOpenRef = useRef(dialogOpen);
  useEffect(() => { dialogOpenRef.current = dialogOpen; }, [dialogOpen]);

  const questStateRef = useRef(questState);
  useEffect(() => { questStateRef.current = questState; }, [questState]);

  const playerRef = useRef(player);
  useEffect(() => { playerRef.current = player; }, [player]);

  const onInteractRef = useRef(onInteract);
  useEffect(() => { onInteractRef.current = onInteract; }, [onInteract]);

  // Player physics state in refs for smooth subpixel movement
  const posRef = useRef({ x: player.x, y: player.y });
  const facingRef = useRef<'down' | 'up' | 'left' | 'right'>('down');
  const isMovingRef = useRef(false);
  const lastStepTimeRef = useRef(0);

  // Tap-to-move & touch destination targets
  const targetDestRef = useRef<{ x: number; y: number; npcKey?: string } | null>(null);
  const tapMarkerRef = useRef<{ x: number; y: number; time: number } | null>(null);

  // Flora & Fauna refs
  const flowersRef = useRef<{ x: number; y: number; hue: number }[]>([]);
  const butterfliesRef = useRef<{ x: number; y: number; a: number; speed: number; hue: number; wobble: number }[]>([]);
  const birdsRef = useRef<{ x: number; y: number; dir: number; speed: number; offset: number }[]>([]);
  const leavesRef = useRef<{ x: number; y: number; speed: number; drift: number; hue: number }[]>([]);
  const fountainParticlesRef = useRef<{ x: number; y: number; vx: number; vy: number; life: number }[]>([]);

  // Sync state to ref when player updates externally (e.g. initial start, save load, sector teleport)
  useEffect(() => {
    const dist = Math.hypot(posRef.current.x - player.x, posRef.current.y - player.y);
    if (dist > 15) {
      posRef.current.x = player.x;
      posRef.current.y = player.y;
      camRef.current.x = player.x;
      camRef.current.y = player.y;
    }
  }, [player.x, player.y, player.name]);

  // Map Initialization & Offscreen Canvas Pre-rendering
  useEffect(() => {
    const grid: number[][] = [];
    for (let r = 0; r < ROWS; r++) {
      grid[r] = [];
      for (let c = 0; c < COLS; c++) {
        if (r < 2 || r > ROWS - 3 || c < 2 || c > COLS - 3) grid[r][c] = 4; // Water
        else grid[r][c] = 0; // Grass
      }
    }

    const build = (r1: number, r2: number, c1: number, c2: number) => {
      for (let r = r1; r <= r2; r++) {
        for (let c = c1; c <= c2; c++) {
          grid[r][c] = (r === r1 || r === r2 || c === c1 || c === c2) ? 1 : 3;
        }
      }
      grid[r2][Math.floor((c1 + c2) / 2)] = 3;
      grid[r2][Math.floor((c1 + c2) / 2) - 1] = 3;
    };

    build(5, 12, 30, 40);  // Portaria
    build(17, 24, 10, 20); // Secretaria
    build(17, 24, 50, 60); // Diretoria
    build(29, 36, 10, 20); // Cozinha
    build(29, 36, 50, 60); // Reforco
    build(41, 48, 10, 20); // Financeiro
    build(41, 48, 50, 60); // Artes

    build(17, 24, 22, 29); // TI
    build(17, 24, 41, 48); // Brecho
    build(29, 36, 22, 29); // Comunicacao
    build(29, 36, 41, 48); // Refeitorio

    build(53, 60, 20, 30); // Danca
    build(53, 60, 40, 50); // Teatro
    build(53, 60, 5, 15);  // Saude
    build(53, 60, 55, 65); // Biblioteca

    build(58, 62, 32, 38); // Jardim
    grid[58][34] = 0; grid[58][35] = 2; grid[58][36] = 2;

    // Main Pathways - Connecting all room doors seamlessly
    for (let r = 12; r <= 62; r++) {
      for (let c = 32; c <= 38; c++) grid[r][c] = 2;
    }
    for (let c = 8; c <= 62; c++) {
      for (let r = 25; r <= 27; r++) grid[r][c] = 2;
      for (let r = 37; r <= 39; r++) grid[r][c] = 2;
      for (let r = 49; r <= 51; r++) grid[r][c] = 2;
      for (let r = 61; r <= 62; r++) grid[r][c] = 2;
    }

    mapRef.current = grid;

    // Flora setup
    const tileClear = (r: number, c: number, margin: number) => {
      for (let dr = -margin; dr <= margin; dr++) {
        for (let dc = -margin; dc <= margin; dc++) {
          let rr = r + dr, cc = c + dc;
          if (rr < 0 || rr >= ROWS || cc < 0 || cc >= COLS) return false;
          let t = grid[rr][cc];
          if (t === 1 || t === 2 || t === 3) return false;
        }
      }
      return true;
    };

    const trees: { x: number; y: number; scale: number; sway: number; big: boolean }[] = [];
    const bushes: { x: number; y: number; sway: number }[] = [];
    const flowers: { x: number; y: number; hue: number }[] = [];

    for (let r = 3; r < ROWS - 3; r++) {
      for (let c = 3; c < COLS - 3; c++) {
        if (grid[r][c] !== 0) continue;
        let rt = seededRand(r, c, 10);
        if (rt < 0.018 && tileClear(r, c, 1)) {
          trees.push({
            x: c * TILE + TILE / 2,
            y: r * TILE + TILE / 2,
            scale: 0.85 + seededRand(r, c, 11) * 0.5,
            sway: r * 13 + c * 7,
            big: seededRand(r, c, 12) > 0.5
          });
          continue;
        }
        let rb = seededRand(r, c, 20);
        if (rb < 0.015 && tileClear(r, c, 0)) {
          bushes.push({ x: c * TILE + TILE / 2, y: r * TILE + TILE / 2, sway: r * 9 + c * 5 });
          continue;
        }
        let rf = seededRand(r, c, 30);
        if (rf < 0.025 && tileClear(r, c, 0)) {
          flowers.push({ x: c * TILE + TILE / 2, y: r * TILE + TILE / 2, hue: Math.floor(seededRand(r, c, 31) * 5) });
        }
      }
    }

    flowersRef.current = flowers;

    butterfliesRef.current = Array.from({ length: 8 }, () => ({
      x: MAP_W * Math.random(),
      y: MAP_H * Math.random(),
      a: Math.random() * Math.PI * 2,
      speed: 22 + Math.random() * 18,
      hue: Math.floor(Math.random() * 3),
      wobble: Math.random() * 10
    }));

    birdsRef.current = Array.from({ length: 5 }, () => ({
      x: MAP_W * Math.random(),
      y: 150 + Math.random() * (MAP_H - 300),
      dir: Math.random() > 0.5 ? 1 : -1,
      speed: 50 + Math.random() * 40,
      offset: Math.random() * 1000
    }));

    leavesRef.current = Array.from({ length: 20 }, () => ({
      x: MAP_W * Math.random(),
      y: MAP_H * Math.random(),
      speed: 8 + Math.random() * 12,
      drift: Math.random() * Math.PI * 2,
      hue: Math.floor(Math.random() * 3)
    }));

    fountainParticlesRef.current = Array.from({ length: 12 }, () => ({
      x: 35 * TILE,
      y: 20 * TILE,
      vx: (Math.random() - 0.5) * 20,
      vy: -20 - Math.random() * 15,
      life: Math.random()
    }));

    // Pre-render the entire static world onto an offscreen canvas
    const offscreen = document.createElement('canvas');
    offscreen.width = MAP_W;
    offscreen.height = MAP_H;
    const offCtx = offscreen.getContext('2d');
    if (offCtx) {
      renderStaticMap(offCtx, grid, trees, bushes);
    }
    offscreenCanvasRef.current = offscreen;
  }, []);

  // Feet-Based Smooth Collision Detection
  const checkCollision = (nx: number, ny: number) => {
    const grid = mapRef.current;
    if (!grid.length) return false;

    // Check collision box around player's feet for smooth doorways and cornering
    const feetX = nx + 4;
    const feetY = ny + player.height - 12;
    const feetW = player.width - 8;
    const feetH = 10;

    const c1 = Math.floor(feetX / TILE);
    const c2 = Math.floor((feetX + feetW) / TILE);
    const r1 = Math.floor(feetY / TILE);
    const r2 = Math.floor((feetY + feetH) / TILE);

    for (let r = r1; r <= r2; r++) {
      for (let c = c1; c <= c2; c++) {
        if (!grid[r] || grid[r][c] === 1 || grid[r][c] === 4) return true;
      }
    }
    return false;
  };

  // Main Render Loop - Locked at 60/120 FPS Uninterrupted
  useEffect(() => {
    let animFrameId: number;
    let lastTime = performance.now();

    const render = (now: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dt = Math.min(0.04, (now - lastTime) / 1000);
      lastTime = now;

      const curKeys = keysRef.current;
      const curDialogOpen = dialogOpenRef.current;
      const curPlayer = playerRef.current;
      const currentSpeed = curPlayer.speed || 8;

      // Handle Smooth Fluid Player Physics
      if (!curDialogOpen) {
        let inputX = 0;
        let inputY = 0;

        if (curKeys.up) inputY -= 1;
        if (curKeys.down) inputY += 1;
        if (curKeys.left) inputX -= 1;
        if (curKeys.right) inputX += 1;

        if (inputX !== 0 || inputY !== 0) {
          // Manual input (keys or virtual D-pad) overrides any tap destination
          targetDestRef.current = null;
          isMovingRef.current = true;
          // Determine facing direction
          if (Math.abs(inputY) >= Math.abs(inputX)) {
            facingRef.current = inputY < 0 ? 'up' : 'down';
          } else {
            facingRef.current = inputX < 0 ? 'left' : 'right';
          }

          // Normalize diagonal speed vector
          const len = Math.hypot(inputX, inputY);
          const moveSpeed = currentSpeed * 44 * dt;
          const vx = (inputX / len) * moveSpeed;
          const vy = (inputY / len) * moveSpeed;

          let newX = posRef.current.x;
          let newY = posRef.current.y;

          if (!checkCollision(newX + vx, newY)) newX += vx;
          if (!checkCollision(newX, newY + vy)) newY += vy;

          if (newX !== posRef.current.x || newY !== posRef.current.y) {
            posRef.current.x = newX;
            posRef.current.y = newY;

            // Throttled sync so React doesn't re-render on every animation frame
            if (now - lastSyncTimeRef.current > 320) {
              lastSyncTimeRef.current = now;
              setPlayer(prev => (Math.abs(prev.x - newX) < 1 && Math.abs(prev.y - newY) < 1) ? prev : ({ ...prev, x: newX, y: newY }));
            }

            const stepInterval = currentSpeed > 10 ? 220 : 300;
            if (now - lastStepTimeRef.current > stepInterval) {
              playStepSound();
              lastStepTimeRef.current = now;
            }
          }
        } else if (targetDestRef.current) {
          // Smooth Tap-to-Move towards destination
          const dx = targetDestRef.current.x - posRef.current.x;
          const dy = targetDestRef.current.y - posRef.current.y;
          const dist = Math.hypot(dx, dy);

          if (dist > 8) {
            isMovingRef.current = true;
            if (Math.abs(dy) >= Math.abs(dx)) {
              facingRef.current = dy < 0 ? 'up' : 'down';
            } else {
              facingRef.current = dx < 0 ? 'left' : 'right';
            }

            const moveSpeed = Math.min(dist, currentSpeed * 44 * dt);
            const vx = (dx / dist) * moveSpeed;
            const vy = (dy / dist) * moveSpeed;

            let newX = posRef.current.x;
            let newY = posRef.current.y;

            let moved = false;
            if (!checkCollision(newX + vx, newY)) {
              newX += vx;
              moved = true;
            }
            if (!checkCollision(newX, newY + vy)) {
              newY += vy;
              moved = true;
            }

            if (moved && (newX !== posRef.current.x || newY !== posRef.current.y)) {
              posRef.current.x = newX;
              posRef.current.y = newY;

              if (now - lastSyncTimeRef.current > 320) {
                lastSyncTimeRef.current = now;
                setPlayer(prev => (Math.abs(prev.x - newX) < 1 && Math.abs(prev.y - newY) < 1) ? prev : ({ ...prev, x: newX, y: newY }));
              }

              const stepInterval = currentSpeed > 10 ? 220 : 300;
              if (now - lastStepTimeRef.current > stepInterval) {
                playStepSound();
                lastStepTimeRef.current = now;
              }
            } else {
              targetDestRef.current = null;
              isMovingRef.current = false;
              setPlayer(prev => ({ ...prev, x: posRef.current.x, y: posRef.current.y }));
            }
          } else {
            // Reached destination
            const reachedNPC = targetDestRef.current.npcKey;
            targetDestRef.current = null;
            isMovingRef.current = false;
            setPlayer(prev => ({ ...prev, x: posRef.current.x, y: posRef.current.y }));
            if (reachedNPC) {
              onInteractRef.current(reachedNPC);
            }
          }
        } else {
          if (isMovingRef.current) {
            isMovingRef.current = false;
            setPlayer(prev => ({ ...prev, x: posRef.current.x, y: posRef.current.y }));
          }
        }

        // Smooth Camera Lerp
        const targetCamX = posRef.current.x + curPlayer.width / 2 - canvas.width / 2;
        const targetCamY = posRef.current.y + curPlayer.height / 2 - canvas.height / 2;

        camRef.current.x += (targetCamX - camRef.current.x) * (1 - Math.exp(-14 * dt));
        camRef.current.y += (targetCamY - camRef.current.y) * (1 - Math.exp(-14 * dt));

        // Constrain Camera to Map Bounds
        camRef.current.x = Math.max(0, Math.min(camRef.current.x, MAP_W - canvas.width));
        camRef.current.y = Math.max(0, Math.min(camRef.current.y, MAP_H - canvas.height));

        // Proximity NPC check (only fires state update when entering or leaving proximity)
        let nearest: string | null = null;
        for (let key in npcLocations) {
          let loc = npcLocations[key];
          let dist = Math.hypot(posRef.current.x - loc.x, posRef.current.y - loc.y);
          if (dist < 88) {
            nearest = key;
            break;
          }
        }
        if (nearest !== activeNPCRef.current) {
          activeNPCRef.current = nearest;
          setActiveNPC(nearest);
        }
      }

      // Update Fountain Particles
      const fountainX = 35 * TILE;
      const fountainY = 20 * TILE;
      for (let p of fountainParticlesRef.current) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vy += 40 * dt;
        p.life += dt * 1.5;
        if (p.life > 1 || p.y > fountainY) {
          p.x = fountainX;
          p.y = fountainY - 8;
          p.vx = (Math.random() - 0.5) * 22;
          p.vy = -22 - Math.random() * 16;
          p.life = 0;
        }
      }

      // Update Fauna
      for (let b of butterfliesRef.current) {
        b.a += (seededRand(Math.floor(b.x), Math.floor(b.y), 1) - 0.5) * 0.6 * dt * 10;
        b.x += Math.cos(b.a) * b.speed * dt;
        b.y += Math.sin(b.a) * b.speed * dt + Math.sin(now / 300 + b.wobble) * 0.4;
        if (b.x < TILE * 2) b.a = 0;
        if (b.x > MAP_W - TILE * 2) b.a = Math.PI;
        if (b.y < TILE * 2) b.a = Math.PI / 2;
        if (b.y > MAP_H - TILE * 2) b.a = -Math.PI / 2;
      }

      for (let bird of birdsRef.current) {
        bird.x += bird.dir * bird.speed * dt;
        if (bird.x > MAP_W + 60) bird.x = -60;
        if (bird.x < -60) bird.x = MAP_W + 60;
      }

      for (let lf of leavesRef.current) {
        lf.y += lf.speed * dt;
        lf.x += Math.sin(now / 500 + lf.drift) * 12 * dt;
        if (lf.y > MAP_H) lf.y = 0;
      }

      // Fast solid clear
      ctx.fillStyle = '#142018';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      const camX = Math.floor(camRef.current.x);
      const camY = Math.floor(camRef.current.y);
      ctx.translate(-camX, -camY);

      // Fast single-blit hardware draw of the static world slice from offscreen canvas
      if (offscreenCanvasRef.current) {
        ctx.drawImage(
          offscreenCanvasRef.current,
          camX, camY, canvas.width, canvas.height,
          camX, camY, canvas.width, canvas.height
        );
      }

      // Render Dynamic Fountain ripples & water spray
      drawFountainRipples(ctx, fountainX, fountainY, fountainParticlesRef.current, now);

      // Render Swaying Flowers
      const viewL = camX - 60, viewR = camX + canvas.width + 60, viewT = camY - 90, viewB = camY + canvas.height + 60;
      for (const f of flowersRef.current) {
        if (f.x > viewL && f.x < viewR && f.y > viewT && f.y < viewB) {
          const palettes = [["#f43f5e", "#fecdd3"], ["#f59e0b", "#fde68a"], ["#8b5cf6", "#ddd6fe"], ["#ec4899", "#fbcfe8"], ["#3b82f6", "#bfdbfe"]];
          const [dark, light] = palettes[f.hue];
          for (let i = 0; i < 4; i++) {
            let ang = i * 1.7 + f.hue;
            let px = f.x + Math.cos(ang) * 6, py = f.y + Math.sin(ang) * 5 + Math.sin(now / 700 + f.x) * 1;
            ctx.fillStyle = i % 2 === 0 ? dark : light;
            ctx.beginPath(); ctx.arc(px, py, 2.4, 0, Math.PI * 2); ctx.fill();
          }
          ctx.fillStyle = "#facc15"; ctx.beginPath(); ctx.arc(f.x, f.y, 1.4, 0, Math.PI * 2); ctx.fill();
        }
      }

      // Render NPCs with bounce animation & badge icons
      const curQuestState = questStateRef.current;
      for (let key in npcLocations) {
        let loc = npcLocations[key];
        let count = loc.npcs.length;
        let bounce = Math.sin(now / 200 + loc.x) * 2;
        let spacing = 18;
        let startX = loc.x - ((count - 1) * spacing) / 2;

        for (let i = 0; i < count; i++) {
          let n = loc.npcs[i];
          drawCharacter(
            ctx,
            startX + (i * spacing),
            loc.y + bounce + (i % 2 * 2),
            n,
            false,
            now,
            'down',
            false
          );
        }

        // Floating speech bubble when player is near NPC
        let dist = Math.hypot(posRef.current.x - loc.x, posRef.current.y - loc.y);
        if (dist < 90 && !curDialogOpen) {
          const bubbleY = loc.y - 38 + Math.sin(now / 220) * 2;
          const bubbleText = curQuestState[key]?.completed ? "Selo conquistado!" : "Toque para conversar!";

          ctx.font = "bold 11px 'Baloo 2', sans-serif";
          const textW = ctx.measureText(bubbleText).width;
          const bw = textW + 16;
          const bh = 20;

          // Shadow
          ctx.fillStyle = "rgba(0,0,0,0.22)";
          ctx.fillRect(loc.x - bw / 2 + 2, bubbleY - bh + 2, bw, bh);

          ctx.fillStyle = curQuestState[key]?.completed ? "#4ecdc4" : "#ffe66d";
          ctx.fillRect(loc.x - bw / 2, bubbleY - bh, bw, bh);
          ctx.strokeStyle = "#292f36";
          ctx.lineWidth = 1.5;
          ctx.strokeRect(loc.x - bw / 2, bubbleY - bh, bw, bh);

          // Arrow stem
          ctx.fillStyle = curQuestState[key]?.completed ? "#4ecdc4" : "#ffe66d";
          ctx.beginPath();
          ctx.moveTo(loc.x - 4, bubbleY);
          ctx.lineTo(loc.x + 4, bubbleY);
          ctx.lineTo(loc.x, bubbleY + 5);
          ctx.fill();

          ctx.fillStyle = "#292f36";
          ctx.textAlign = "center";
          ctx.fillText(bubbleText, loc.x, bubbleY - 6);
          ctx.textAlign = "left";
        }

        // Active quest icon badge
        if (!curQuestState[key]?.completed) {
          ctx.fillStyle = "#ffe66d";
          ctx.font = "bold 24px 'Baloo 2', sans-serif";
          ctx.fillText("!", loc.x + 8, loc.y - 16 + bounce);
        }
      }

      // Draw Tap-to-move destination marker (ring pulse)
      if (tapMarkerRef.current) {
        const age = now - tapMarkerRef.current.time;
        if (age < 900) {
          const progress = age / 900;
          const radius = 6 + progress * 24;
          const alpha = (1 - progress) * 0.85;

          ctx.strokeStyle = `rgba(255, 230, 109, ${alpha})`;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(tapMarkerRef.current.x, tapMarkerRef.current.y, radius, 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = `rgba(78, 205, 196, ${alpha * 0.7})`;
          ctx.beginPath();
          ctx.arc(tapMarkerRef.current.x, tapMarkerRef.current.y, 5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          tapMarkerRef.current = null;
        }
      }

      // Render Hero Player Character with facing & walk cycle
      drawCharacter(
        ctx,
        posRef.current.x,
        posRef.current.y,
        {
          gender: 'M',
          skin: '#ffdbac',
          shirt: '#18181b',
          pants: '#18181b',
          hair: '#292524',
          hStyle: 3,
          glasses: false
        },
        true,
        now,
        facingRef.current,
        isMovingRef.current
      );

      // Air Fauna Overlay
      for (const lf of leavesRef.current) {
        if (lf.x > viewL && lf.x < viewR && lf.y > viewT && lf.y < viewB) {
          const colors = ["#eab308", "#f97316", "#a16207"];
          ctx.fillStyle = colors[lf.hue];
          ctx.save(); ctx.translate(lf.x, lf.y); ctx.rotate(now / 600 + lf.drift);
          ctx.beginPath(); ctx.ellipse(0, 0, 3, 1.6, 0, 0, Math.PI * 2); ctx.fill();
          ctx.restore();
        }
      }

      for (const bf of butterfliesRef.current) {
        if (bf.x > viewL && bf.x < viewR && bf.y > viewT && bf.y < viewB) {
          let flap = Math.sin(now / 90 + bf.x) * 0.5 + 0.5;
          const colors = [["#f59e0b", "#fde68a"], ["#ec4899", "#fbcfe8"], ["#38bdf8", "#bae6fd"]];
          const [c1, c2] = colors[bf.hue];
          ctx.save(); ctx.translate(bf.x, bf.y);
          ctx.fillStyle = c1;
          ctx.beginPath(); ctx.ellipse(-3, 0, 3.2 * (0.4 + flap * 0.6), 4, 0.3, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = c2;
          ctx.beginPath(); ctx.ellipse(3, 0, 3.2 * (0.4 + flap * 0.6), 4, -0.3, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = "#292f36"; ctx.fillRect(-0.5, -3, 1, 6);
          ctx.restore();
        }
      }

      for (const bd of birdsRef.current) {
        if (bd.y > viewT && bd.y < viewB) {
          let flap = Math.sin(now / 120 + bd.offset) * 4;
          ctx.strokeStyle = "#292f36"; ctx.lineWidth = 1.6; ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(bd.x - 6, bd.y - flap); ctx.quadraticCurveTo(bd.x, bd.y + 3, bd.x + 6, bd.y - flap);
          ctx.stroke();
        }
      }

      ctx.restore();
      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animFrameId);
  }, [setPlayer, setActiveNPC]);

  // Handle Window & Container Resize Responsively
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // Handle Tap or Click to Move / Interact on Canvas
  const handleCanvasPointer = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (dialogOpenRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = (e.clientX - rect.left) * (canvas.width / rect.width);
    const clickY = (e.clientY - rect.top) * (canvas.height / rect.height);
    const worldX = camRef.current.x + clickX;
    const worldY = camRef.current.y + clickY;

    // Check if tapped near an NPC
    let clickedNPC: string | null = null;
    for (let key in npcLocations) {
      const loc = npcLocations[key];
      const dist = Math.hypot(worldX - loc.x, worldY - loc.y);
      if (dist < 64) {
        clickedNPC = key;
        break;
      }
    }

    if (clickedNPC) {
      const distToPlayer = Math.hypot(posRef.current.x - npcLocations[clickedNPC].x, posRef.current.y - npcLocations[clickedNPC].y);
      if (distToPlayer < 90) {
        onInteractRef.current(clickedNPC);
        return;
      }
      targetDestRef.current = {
        x: npcLocations[clickedNPC].x,
        y: npcLocations[clickedNPC].y + 36,
        npcKey: clickedNPC
      };
    } else {
      targetDestRef.current = {
        x: Math.max(TILE * 2, Math.min(worldX, MAP_W - TILE * 2)),
        y: Math.max(TILE * 2, Math.min(worldY, MAP_H - TILE * 2))
      };
    }

    tapMarkerRef.current = {
      x: targetDestRef.current.x,
      y: targetDestRef.current.y,
      time: performance.now()
    };
  };

  return (
    <canvas
      ref={canvasRef}
      onPointerDown={handleCanvasPointer}
      className="block w-full h-full touch-none select-none cursor-pointer"
    />
  );
};

// Helper: Find Room at grid position
function findRoomAtTile(r: number, c: number): string | null {
  for (let key in ROOM_INFO) {
    let room = ROOM_INFO[key];
    if (r >= room.r1 && r <= room.r2 && c >= room.c1 && c <= room.c2) {
      return key;
    }
  }
  return null;
}

// Custom Room Floor Styles
function drawCustomFloor(ctx: CanvasRenderingContext2D, tx: number, ty: number, r: number, c: number, floorType: string, below: number) {
  const isDoorway = (below === 0 || below === 2);
  if (isDoorway) {
    ctx.fillStyle = "#78350f"; ctx.fillRect(tx, ty, TILE, TILE);
    ctx.fillStyle = "#a16207"; ctx.fillRect(tx + 3, ty + 3, TILE - 6, TILE - 6);
    ctx.fillStyle = "#92400e";
    ctx.fillRect(tx + 3, ty + 3, (TILE - 6) / 2 - 1, TILE - 6);
    ctx.fillRect(tx + 3 + (TILE - 6) / 2 + 1, ty + 3, (TILE - 6) / 2 - 1, TILE - 6);
    ctx.fillStyle = "#fbbf24";
    ctx.beginPath(); ctx.arc(tx + TILE / 2 - 3, ty + TILE / 2, 1.6, 0, Math.PI * 2); ctx.arc(tx + TILE / 2 + 3, ty + TILE / 2, 1.6, 0, Math.PI * 2); ctx.fill();
    return;
  }

  const checker = (r + c) % 2 === 0;

  switch (floorType) {
    case 'parquet': // Dance studio golden parquet
      ctx.fillStyle = checker ? "#fde68a" : "#fef08a";
      ctx.fillRect(tx, ty, TILE, TILE);
      ctx.strokeStyle = "rgba(180, 83, 9, 0.15)";
      ctx.strokeRect(tx, ty, TILE, TILE);
      break;
    case 'stage': // Theater dark mahogany stage
      ctx.fillStyle = checker ? "#451a03" : "#3b1402";
      ctx.fillRect(tx, ty, TILE, TILE);
      ctx.strokeStyle = "rgba(0,0,0,0.25)";
      ctx.strokeRect(tx, ty, TILE, TILE);
      break;
    case 'mint': // Health clinic clean mint tile
      ctx.fillStyle = checker ? "#ccfbf1" : "#e0f2fe";
      ctx.fillRect(tx, ty, TILE, TILE);
      ctx.strokeStyle = "rgba(13, 148, 136, 0.12)";
      ctx.strokeRect(tx, ty, TILE, TILE);
      break;
    case 'terracotta': // Kitchen & Refeitorio warm ceramic
      ctx.fillStyle = checker ? "#ea580c" : "#c2410c";
      ctx.fillRect(tx, ty, TILE, TILE);
      ctx.strokeStyle = "rgba(67, 20, 7, 0.2)";
      ctx.strokeRect(tx, ty, TILE, TILE);
      break;
    case 'slate': // TI & Communication slate gray
      ctx.fillStyle = checker ? "#334155" : "#1e293b";
      ctx.fillRect(tx, ty, TILE, TILE);
      ctx.strokeStyle = "rgba(255,255,255,0.05)";
      ctx.strokeRect(tx, ty, TILE, TILE);
      break;
    case 'marble': // Secretariat & Directors light marble
      ctx.fillStyle = checker ? "#f8fafc" : "#f1f5f9";
      ctx.fillRect(tx, ty, TILE, TILE);
      ctx.strokeStyle = "rgba(148, 163, 184, 0.15)";
      ctx.strokeRect(tx, ty, TILE, TILE);
      break;
    case 'carpet': // Library cozy carpet
      ctx.fillStyle = checker ? "#fef3c7" : "#fde68a";
      ctx.fillRect(tx, ty, TILE, TILE);
      ctx.strokeStyle = "rgba(161, 98, 7, 0.1)";
      ctx.strokeRect(tx, ty, TILE, TILE);
      break;
    case 'gravel': // Garden floor
      ctx.fillStyle = checker ? "#d6d3d1" : "#e7e5e4";
      ctx.fillRect(tx, ty, TILE, TILE);
      break;
    default:
      ctx.fillStyle = checker ? "#fef3c7" : "#fde9a8";
      ctx.fillRect(tx, ty, TILE, TILE);
      ctx.strokeStyle = "rgba(0,0,0,0.05)"; ctx.strokeRect(tx, ty, TILE, TILE);
  }
}

// Courtyard Fountain Static Basin
function drawStaticFountain(ctx: CanvasRenderingContext2D, fx: number, fy: number) {
  // Shadow
  ctx.fillStyle = "rgba(0,0,0,0.22)";
  ctx.beginPath(); ctx.ellipse(fx, fy + 12, 38, 18, 0, 0, Math.PI * 2); ctx.fill();

  // Outer Stone Basin
  ctx.fillStyle = "#78716c";
  ctx.beginPath(); ctx.ellipse(fx, fy, 36, 16, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#a8a29e";
  ctx.beginPath(); ctx.ellipse(fx, fy - 3, 34, 14, 0, 0, Math.PI * 2); ctx.fill();

  // Water Basin
  ctx.fillStyle = "#0284c7";
  ctx.beginPath(); ctx.ellipse(fx, fy - 3, 30, 11, 0, 0, Math.PI * 2); ctx.fill();

  // Center Pillar
  ctx.fillStyle = "#57534e";
  ctx.fillRect(fx - 6, fy - 16, 12, 14);
  ctx.fillStyle = "#a8a29e";
  ctx.beginPath(); ctx.ellipse(fx, fy - 16, 12, 5, 0, 0, Math.PI * 2); ctx.fill();
}

// Fountain Dynamic Ripples & Particles
function drawFountainRipples(ctx: CanvasRenderingContext2D, fx: number, fy: number, particles: { x: number; y: number; vx: number; vy: number; life: number }[], now: number) {
  const r = (now / 30) % 24;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.ellipse(fx, fy - 3, r, r * 0.4, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = "#e0f2fe";
  for (let p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Static Bushes & Trees
function drawStaticBushesAndTrees(
  ctx: CanvasRenderingContext2D,
  bushes: { x: number; y: number; sway: number }[],
  trees: { x: number; y: number; scale: number; sway: number; big: boolean }[]
) {
  for (const b of bushes) {
    ctx.fillStyle = "rgba(0,0,0,0.15)";
    ctx.beginPath();
    ctx.ellipse(b.x, b.y + 6, 12, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#3f8f3f";
    ctx.beginPath();
    ctx.arc(b.x - 6, b.y, 7, 0, Math.PI * 2);
    ctx.arc(b.x + 6, b.y, 7, 0, Math.PI * 2);
    ctx.arc(b.x, b.y - 5, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#5cb35c";
    ctx.beginPath();
    ctx.arc(b.x - 2, b.y - 6, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  for (const t of trees) {
    const s = t.scale, big = t.big;
    ctx.fillStyle = "rgba(0,0,0,0.18)";
    ctx.beginPath();
    ctx.ellipse(t.x, t.y + 4, 16 * s, 6 * s, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#5b3a21";
    ctx.lineWidth = 6 * s;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(t.x, t.y);
    ctx.lineTo(t.x, t.y - 22 * s);
    ctx.stroke();

    const green1 = big ? "#2f6b2f" : "#3a7d3a", green2 = big ? "#3f8f3f" : "#4fa84f", green3 = big ? "#5cb35c" : "#68c268";
    ctx.fillStyle = green1;
    ctx.beginPath();
    ctx.arc(t.x, t.y - 26 * s, 20 * s, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = green2;
    ctx.beginPath();
    ctx.arc(t.x - 10 * s, t.y - 36 * s, 15 * s, 0, Math.PI * 2);
    ctx.arc(t.x + 11 * s, t.y - 34 * s, 15 * s, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = green3;
    ctx.beginPath();
    ctx.arc(t.x - 2 * s, t.y - 44 * s, 13 * s, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Room Sign Helper
function drawSign(ctx: CanvasRenderingContext2D, x: number, y: number, text: string, icon: string) {
  let label = (icon ? icon + "  " : "") + text;
  ctx.font = "bold 12px 'Baloo 2', sans-serif";
  let textW = ctx.measureText(label).width;
  let boxW = Math.max(textW + 18, 60);
  let offset = (boxW - 60) / 2;
  let sx = x - offset;

  ctx.fillStyle = "rgba(0,0,0,0.22)"; ctx.fillRect(sx + 3, y + 3, boxW, 20);
  ctx.fillStyle = "#5b3a21"; ctx.fillRect(x + 26, y + 20, 8, 16);
  ctx.fillStyle = "#78350f"; ctx.fillRect(x + 27, y + 20, 2, 16);
  ctx.fillStyle = "#92400e"; ctx.fillRect(sx, y, boxW, 20);
  ctx.strokeStyle = "#451a03"; ctx.lineWidth = 2; ctx.strokeRect(sx, y, boxW, 20);
  ctx.fillStyle = "#d97706"; ctx.fillRect(sx + 2, y + 2, boxW - 4, 16);
  ctx.fillStyle = "rgba(255,255,255,0.18)"; ctx.fillRect(sx + 2, y + 2, boxW - 4, 4);
  ctx.fillStyle = "#451a03";
  ctx.beginPath(); ctx.arc(sx + 6, y + 5, 1.4, 0, Math.PI * 2); ctx.arc(sx + boxW - 6, y + 5, 1.4, 0, Math.PI * 2); ctx.fill();

  ctx.fillStyle = "#fffbeb"; ctx.textAlign = "center";
  ctx.fillText(label, x + 30, y + 14);
  ctx.textAlign = "left";
}

// Room Decor Helper Primitives
function drawRoomDecor(ctx: CanvasRenderingContext2D, key: string, room: { r1: number; r2: number; c1: number; c2: number }) {
  const ix = (room.c1 + 1) * TILE;
  const iy = (room.r1 + 1) * TILE;
  const iw = (room.c2 - room.c1 - 1) * TILE;
  const ih = (room.r2 - room.r1 - 1) * TILE;

  const shadow = (x: number, y: number, w: number, h: number) => {
    ctx.fillStyle = "rgba(0,0,0,0.18)"; ctx.fillRect(x, y + h, w, 3);
  };

  const desk = (x: number, y: number, color = "#a16207") => {
    shadow(x, y, 30, 16);
    ctx.fillStyle = "#78350f"; ctx.fillRect(x + 1, y + 15, 4, 11); ctx.fillRect(x + 25, y + 15, 4, 11);
    ctx.fillStyle = color; ctx.fillRect(x, y, 30, 15);
    ctx.strokeStyle = "rgba(0,0,0,0.25)"; ctx.lineWidth = 1; ctx.strokeRect(x, y, 30, 15);
    ctx.fillStyle = "rgba(255,255,255,0.15)"; ctx.fillRect(x, y, 30, 3);
  };

  const chair = (x: number, y: number, color = "#7c2d12") => {
    ctx.fillStyle = color; ctx.fillRect(x, y - 10, 12, 6); ctx.fillRect(x, y, 12, 12);
    ctx.fillStyle = "rgba(0,0,0,0.2)"; ctx.fillRect(x, y + 12, 12, 2);
  };

  const shelf = (x: number, y: number, w: number, h: number) => {
    shadow(x, y, w, h);
    ctx.fillStyle = "#92400e"; ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = "rgba(0,0,0,0.3)"; ctx.strokeRect(x, y, w, h);
    const bookColors = ["#dc2626", "#2563eb", "#16a34a", "#f59e0b", "#7c3aed", "#ec4899"];
    const rows = Math.max(1, Math.floor(h / 16));
    for (let ri = 0; ri < rows; ri++) {
      let bx = x + 3, by = y + 3 + ri * (h / rows);
      let i = 0;
      while (bx < x + w - 4) {
        ctx.fillStyle = bookColors[(i + ri * 3) % bookColors.length];
        let bw = 3 + ((i * 7 + ri) % 4);
        ctx.fillRect(bx, by, bw, h / rows - 6);
        bx += bw + 1; i++;
      }
    }
  };

  const cabinet = (x: number, y: number, w = 24, h = 32, color = "#57534e") => {
    shadow(x, y, w, h);
    ctx.fillStyle = color; ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = "rgba(0,0,0,0.3)"; ctx.strokeRect(x, y, w, h);
    ctx.beginPath(); ctx.moveTo(x + w / 2, y + 3); ctx.lineTo(x + w / 2, y + h - 3); ctx.strokeStyle = "rgba(0,0,0,0.25)"; ctx.stroke();
    ctx.fillStyle = "#fbbf24"; ctx.fillRect(x + w / 2 - 3, y + h / 2 - 1, 2, 3); ctx.fillRect(x + w / 2 + 1, y + h / 2 - 1, 2, 3);
  };

  const computer = (x: number, y: number) => {
    ctx.fillStyle = "#334155"; ctx.fillRect(x, y, 18, 13);
    ctx.fillStyle = "#7dd3fc"; ctx.fillRect(x + 2, y + 2, 14, 9);
    ctx.fillStyle = "#1e293b"; ctx.fillRect(x + 6, y + 13, 6, 4); ctx.fillRect(x + 2, y + 17, 14, 2);
  };

  const plant = (x: number, y: number) => {
    ctx.fillStyle = "#7c2d12"; ctx.fillRect(x, y + 9, 13, 9);
    ctx.fillStyle = "#16a34a";
    ctx.beginPath(); ctx.arc(x + 6, y + 3, 7, 0, Math.PI * 2); ctx.arc(x, y + 8, 5, 0, Math.PI * 2); ctx.arc(x + 13, y + 8, 5, 0, Math.PI * 2); ctx.fill();
  };

  const rug = (x: number, y: number, w: number, h: number, color = "#b91c1c") => {
    ctx.fillStyle = color; ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = "rgba(255,255,255,0.25)"; ctx.lineWidth = 2; ctx.strokeRect(x + 3, y + 3, w - 6, h - 6);
  };

  const clock = (x: number, y: number) => {
    ctx.fillStyle = "#fef9c3"; ctx.beginPath(); ctx.arc(x, y, 8, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "#78350f"; ctx.lineWidth = 2; ctx.stroke();
    ctx.strokeStyle = "#000"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - 5); ctx.moveTo(x, y); ctx.lineTo(x + 4, y + 2); ctx.stroke();
  };

  const counter = (x: number, y: number, w = 44, h = 14) => {
    shadow(x, y, w, h);
    ctx.fillStyle = "#a8a29e"; ctx.fillRect(x, y, w, h);
    ctx.fillStyle = "#78716c"; ctx.fillRect(x, y + h - 3, w, 3);
  };

  const blackboard = (x: number, y: number, w = 54, h = 26) => {
    ctx.fillStyle = "#78350f"; ctx.fillRect(x - 3, y - 3, w + 6, h + 6);
    ctx.fillStyle = "#1f3d2b"; ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = "rgba(255,255,255,0.55)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x + 6, y + 8); ctx.lineTo(x + w * 0.4, y + 8); ctx.moveTo(x + 6, y + 16); ctx.lineTo(x + w * 0.6, y + 16); ctx.stroke();
    ctx.fillStyle = "#e7e5e4"; ctx.fillRect(x + w - 16, y + h - 6, 12, 4);
  };

  const emoji = (x: number, y: number, ch: string, size = 16) => {
    ctx.font = size + "px Arial";
    ctx.textAlign = "center"; ctx.fillText(ch, x, y);
    ctx.textAlign = "left";
  };

  switch (key) {
    case "reforco":
      blackboard(ix + iw / 2 - 30, iy + 6, 60, 24);
      clock(ix + iw - 16, iy + 12);
      for (let i = 0; i < 3; i++) { desk(ix + 14 + i * 40, iy + 46, "#c07a2b"); chair(ix + 22 + i * 40, iy + 66); }
      for (let i = 0; i < 3; i++) { desk(ix + 14 + i * 40, iy + 82, "#c07a2b"); chair(ix + 22 + i * 40, iy + 102); }
      cabinet(ix + iw - 30, iy + ih - 40, 26, 34);
      emoji(ix + iw - 46, iy + ih - 14, "🎒", 18);
      emoji(ix + 16, iy + ih - 10, "📚", 16);
      break;
    case "artes":
      ctx.strokeStyle = "#78350f"; ctx.lineWidth = 2;
      [20, 60, 100].forEach(ex => {
        let ey = iy + 20;
        ctx.beginPath(); ctx.moveTo(ix + ex, ey + 26); ctx.lineTo(ix + ex + 7, ey); ctx.moveTo(ix + ex + 14, ey + 26); ctx.lineTo(ix + ex + 7, ey); ctx.moveTo(ix + ex - 4, ey + 22); ctx.lineTo(ix + ex + 18, ey + 22); ctx.stroke();
        ctx.fillStyle = "#fefce8"; ctx.fillRect(ix + ex - 2, ey + 2, 18, 15); ctx.strokeStyle = "#a8a29e"; ctx.strokeRect(ix + ex - 2, ey + 2, 18, 15);
      });
      shelf(ix + iw - 40, iy + 10, 32, 50);
      desk(ix + 20, iy + ih - 34, "#e5e7eb"); desk(ix + 70, iy + ih - 34, "#e5e7eb");
      emoji(ix + 30, iy + ih - 40, "🖌️", 16); emoji(ix + 80, iy + ih - 40, "🎨", 18);
      break;
    case "danca":
      ctx.fillStyle = "#78350f"; ctx.fillRect(ix + 4, iy + 8, 18, ih - 20);
      ctx.fillStyle = "#bae6fd"; ctx.globalAlpha = 0.65; ctx.fillRect(ix + 6, iy + 10, 14, ih - 24); ctx.globalAlpha = 1;
      ctx.fillStyle = "#57534e"; ctx.fillRect(ix + 30, iy + 18, 5, 22); ctx.fillRect(ix + iw - 30, iy + 18, 5, 22);
      ctx.strokeStyle = "#a16207"; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(ix + 30, iy + 20); ctx.lineTo(ix + iw - 30, iy + 20); ctx.stroke();
      ctx.fillStyle = "#1c1917"; ctx.fillRect(ix + iw - 30, iy + ih - 34, 14, 20);
      emoji(ix + iw / 2, iy + ih - 10, "🩰", 18);
      break;
    case "teatro":
      ctx.fillStyle = "#7f1d1d"; ctx.fillRect(ix + 6, iy + 8, 18, ih - 40); ctx.fillRect(ix + iw - 24, iy + 8, 18, ih - 40);
      ctx.fillStyle = "#facc15"; ctx.globalAlpha = 0.15;
      ctx.beginPath(); ctx.moveTo(ix + iw * 0.3, iy + 4); ctx.lineTo(ix + iw * 0.3 - 12, iy + 50); ctx.lineTo(ix + iw * 0.3 + 12, iy + 50); ctx.fill();
      ctx.beginPath(); ctx.moveTo(ix + iw * 0.7, iy + 4); ctx.lineTo(ix + iw * 0.7 - 12, iy + 50); ctx.lineTo(ix + iw * 0.7 + 12, iy + 50); ctx.fill();
      ctx.globalAlpha = 1;
      for (let i = 0; i < 4; i++) chair(ix + 30 + i * 26, iy + ih - 26, "#7f1d1d");
      emoji(ix + iw / 2, iy + ih / 2, "🎭", 22);
      break;
    case "biblioteca":
      shelf(ix + 6, iy + 8, 20, ih - 60); shelf(ix + 34, iy + 8, 20, ih - 60);
      shelf(ix + iw - 26, iy + 8, 20, ih - 60);
      rug(ix + iw / 2 - 26, iy + ih - 40, 52, 28, "#78350f");
      desk(ix + iw / 2 - 15, iy + ih - 36, "#d6d3d1"); computer(ix + iw / 2 - 9, iy + ih - 48);
      emoji(ix + 60, iy + ih - 46, "📖", 16);
      break;
    case "cozinha":
      ctx.fillStyle = "#e5e7eb"; ctx.fillRect(ix + 12, iy + 20, 26, 20);
      ctx.fillStyle = "#e0f2fe"; ctx.fillRect(ix + iw - 26, iy + 10, 18, 32);
      counter(ix + 10, iy + 34, iw - 50, 12);
      cabinet(ix + iw - 30, iy + ih - 40, 24, 30);
      emoji(ix + 70, iy + ih - 20, "🍲", 18);
      break;
    case "secretaria":
      counter(ix + 10, iy + 16, iw - 40, 16);
      computer(ix + 20, iy + 4); computer(ix + 60, iy + 4);
      cabinet(ix + iw - 30, iy + 10, 22, 30);
      emoji(ix + 20, iy + ih - 16, "📞", 16);
      break;
    case "diretoria":
      desk(ix + iw / 2 - 15, iy + ih / 2, "#78350f"); chair(ix + iw / 2 - 6, iy + ih / 2 + 18);
      computer(ix + iw / 2 - 9, iy + ih / 2 - 12);
      cabinet(ix + 8, iy + 8, 22, 34); cabinet(ix + iw - 30, iy + 8, 22, 34);
      plant(ix + iw - 24, iy + ih - 30);
      emoji(ix + 20, iy + ih - 20, "🏆", 16);
      break;
    case "financeiro":
      desk(ix + 14, iy + ih - 36, "#a16207"); computer(ix + 20, iy + ih - 50);
      desk(ix + 60, iy + ih - 36, "#a16207"); computer(ix + 66, iy + ih - 50);
      cabinet(ix + iw - 30, iy + ih - 40, 22, 32);
      emoji(ix + 100, iy + 14, "🧮", 16);
      break;
    case "portaria":
      counter(ix + iw / 2 - 30, iy + ih - 30, 60, 16);
      computer(ix + iw / 2 - 9, iy + ih - 44);
      emoji(ix + iw / 2 + 20, iy + ih - 40, "📋", 16);
      break;
    case "saude":
      ctx.fillStyle = "#f1f5f9"; ctx.fillRect(ix + 12, iy + 12, 44, 18);
      ctx.strokeStyle = "#94a3b8"; ctx.strokeRect(ix + 12, iy + 12, 44, 18);
      ctx.fillStyle = "#38bdf8"; ctx.fillRect(ix + 12, iy + 12, 10, 18);
      plant(ix + iw - 24, iy + 10);
      rug(ix + 10, iy + ih - 26, 40, 16, "#5eead4");
      emoji(ix + iw / 2, iy + ih / 2, "➕", 18);
      break;
    case "ti":
      desk(ix + iw / 2 - 15, iy + ih / 2 - 6, "#334155"); computer(ix + iw / 2 - 9, iy + ih / 2 - 20);
      cabinet(ix + 8, iy + 8, 20, 28);
      emoji(ix + iw - 24, iy + 16, "🖥️", 16);
      break;
    case "brecho":
      shelf(ix + 8, iy + 8, iw - 16, 14);
      counter(ix + iw / 2 - 20, iy + ih - 26, 40, 14);
      emoji(ix + 20, iy + ih - 38, "👗", 18); emoji(ix + iw - 30, iy + ih - 38, "🧥", 18);
      break;
    case "comunicacao":
      desk(ix + iw / 2 - 15, iy + ih / 2 - 6, "#0f766e"); computer(ix + iw / 2 - 9, iy + ih / 2 - 20);
      emoji(ix + iw - 24, iy + 16, "📢", 16);
      break;
    case "refeitorio":
      counter(ix + 8, iy + ih - 24, iw - 16, 14);
      cabinet(ix + iw - 28, iy + 8, 22, 30);
      emoji(ix + iw / 2, iy + ih - 34, "🍽️", 18);
      break;
    case "jardim":
      cabinet(ix + 6, iy + 6, 20, 26);
      plant(ix + iw - 24, iy + 6); plant(ix + iw / 2, iy + ih - 20);
      emoji(ix + iw - 40, iy + ih - 16, "🧹", 16);
      break;
  }
}

// Pre-render the entire static world onto an offscreen canvas
function renderStaticMap(
  ctx: CanvasRenderingContext2D,
  grid: number[][],
  trees: { x: number; y: number; scale: number; sway: number; big: boolean }[],
  bushes: { x: number; y: number; sway: number }[]
) {
  // Clear map background
  ctx.fillStyle = "#1c2e22";
  ctx.fillRect(0, 0, MAP_W, MAP_H);

  // 1. Render all tiles
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (!grid[r]) continue;
      const tx = c * TILE;
      const ty = r * TILE;
      const type = grid[r][c];
      const above = (r > 0) ? grid[r - 1][c] : -1;
      const below = (r < ROWS - 1) ? grid[r + 1][c] : -1;
      const left = (c > 0) ? grid[r][c - 1] : -1;
      const right = (c < COLS - 1) ? grid[r][c + 1] : -1;

      if (type === 0) {
        // Grass
        const v = seededRand(r, c, 1);
        ctx.fillStyle = v < 0.55 ? "#5f9c2e" : (v < 0.8 ? "#6bab34" : "#568c29");
        ctx.fillRect(tx, ty, TILE, TILE);

        // Grass tufts
        ctx.strokeStyle = "rgba(70,110,30,0.55)";
        ctx.lineWidth = 1.3;
        for (let g = 0; g < 3; g++) {
          const gx = tx + 7 + g * 12 + seededRand(r, c, g + 3) * 6;
          const gy = ty + TILE - 4;
          ctx.beginPath();
          ctx.moveTo(gx, gy);
          ctx.lineTo(gx + 1, gy - 8);
          ctx.stroke();
        }

        // Small decorative stones
        if (seededRand(r, c, 7) < 0.05) {
          ctx.fillStyle = "#9ca39a";
          ctx.beginPath();
          ctx.ellipse(tx + TILE * 0.7, ty + TILE * 0.35, 3.2, 2, 0.3, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (type === 1) {
        // Walls & Facades
        const isRoof = (below === 3) && (above !== 1);
        const isFront = (above === 3) && (below !== 1);

        if (isRoof) {
          ctx.fillStyle = "rgba(0,0,0,0.22)";
          ctx.fillRect(tx - 2, ty - 6, TILE + 4, 8);
          const roofGrad = ctx.createLinearGradient(tx, ty - 10, tx, ty + TILE * 0.6);
          roofGrad.addColorStop(0, "#c2540f");
          roofGrad.addColorStop(1, "#7c2d12");
          ctx.fillStyle = roofGrad;
          ctx.fillRect(tx, ty - 10, TILE, TILE * 0.6);
          ctx.strokeStyle = "rgba(0,0,0,0.22)";
          ctx.lineWidth = 1;
          for (let i = 1; i < 4; i++) {
            ctx.beginPath();
            ctx.moveTo(tx, ty - 10 + i * 6);
            ctx.lineTo(tx + TILE, ty - 10 + i * 6);
            ctx.stroke();
          }
          ctx.fillStyle = "#57534e";
          ctx.fillRect(tx, ty + TILE * 0.5, TILE, TILE * 0.5);
        } else if (isFront) {
          ctx.fillStyle = "#eee7d8";
          ctx.fillRect(tx, ty, TILE, TILE);
          ctx.fillStyle = "rgba(0,0,0,0.12)";
          ctx.fillRect(tx, ty + TILE - 6, TILE, 6);
          ctx.strokeStyle = "rgba(0,0,0,0.1)";
          ctx.strokeRect(tx, ty, TILE, TILE);
        } else {
          ctx.fillStyle = "#ded7c7";
          ctx.fillRect(tx, ty, TILE, TILE);
          ctx.strokeStyle = "rgba(0,0,0,0.07)";
          ctx.lineWidth = 1;
          for (let i = 1; i < 3; i++) {
            ctx.beginPath();
            ctx.moveTo(tx, ty + i * (TILE / 3));
            ctx.lineTo(tx + TILE, ty + i * (TILE / 3));
            ctx.stroke();
          }
          if (above === 1 && below === 1 && seededRand(r, c, 40) < 0.5) {
            ctx.fillStyle = "#38bdf8";
            ctx.fillRect(tx + 10, ty + 12, TILE - 20, 16);
            ctx.strokeStyle = "#78350f";
            ctx.lineWidth = 2;
            ctx.strokeRect(tx + 10, ty + 12, TILE - 20, 16);
            ctx.beginPath();
            ctx.moveTo(tx + TILE / 2, ty + 12);
            ctx.lineTo(tx + TILE / 2, ty + 28);
            ctx.stroke();
            ctx.fillStyle = "rgba(255,255,255,0.35)";
            ctx.fillRect(tx + 12, ty + 14, 6, 4);
          }
        }
      } else if (type === 2) {
        // Pathways
        const v = seededRand(r, c, 50);
        ctx.fillStyle = v < 0.5 ? "#c98a4b" : (v < 0.8 ? "#bf7d3e" : "#ad7038");
        ctx.fillRect(tx, ty, TILE, TILE);
        ctx.strokeStyle = "rgba(0, 0, 0, 0.08)";
        ctx.lineWidth = 1;
        ctx.strokeRect(tx, ty, TILE, TILE);

        ctx.fillStyle = "rgba(101,163,13,0.35)";
        if (above === 0) ctx.fillRect(tx, ty, TILE, 4);
        if (below === 0) ctx.fillRect(tx, ty + TILE - 4, TILE, 4);
        if (left === 0) ctx.fillRect(tx, ty, 4, TILE);
        if (right === 0) ctx.fillRect(tx + TILE - 4, ty, 4, TILE);
      } else if (type === 3) {
        // Custom room floor
        const roomKey = findRoomAtTile(r, c);
        const floorType = roomKey && ROOM_INFO[roomKey]?.floorType ? ROOM_INFO[roomKey].floorType : 'wood';
        drawCustomFloor(ctx, tx, ty, r, c, floorType, below);
      } else if (type === 4) {
        // Water pond base
        ctx.fillStyle = "#0284c7";
        ctx.fillRect(tx, ty, TILE, TILE);
        ctx.strokeStyle = "rgba(14, 165, 233, 0.4)";
        ctx.strokeRect(tx, ty, TILE, TILE);
      }
    }
  }

  // 2. Static Room Furniture & Decor
  for (let key in ROOM_INFO) {
    const room = ROOM_INFO[key];
    drawRoomDecor(ctx, key, room);
  }

  // 3. Room Signs
  for (let key in npcLocations) {
    drawSign(ctx, npcLocations[key].x - 15, npcLocations[key].y - 30, questsData[key].room, questsData[key].icon);
  }

  // 4. Central Fountain stone base
  drawStaticFountain(ctx, 35 * TILE, 20 * TILE);

  // 5. Static Bushes & Trees
  drawStaticBushesAndTrees(ctx, bushes, trees);
}
