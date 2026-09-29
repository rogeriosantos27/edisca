import React, { useEffect, useRef } from 'react';
import { Player, QuestState } from '../types';
import { questsData } from '../data/quests';
import { npcLocations, TILE } from '../data/npcs';

interface MiniMapProps {
  player: Player;
  questState: QuestState;
  isOpen: boolean;
  onClose: () => void;
}

const COLS = 70;
const ROWS = 65;

export const MiniMap: React.FC<MiniMapProps> = ({ player, questState, isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw background
    ctx.fillStyle = '#1c2e22';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const scaleX = canvas.width / (COLS * TILE);
    const scaleY = canvas.height / (ROWS * TILE);

    // Draw main pathways background
    ctx.fillStyle = '#a87541';
    // Vertical corridor
    ctx.fillRect(32 * TILE * scaleX, 12 * TILE * scaleY, 7 * TILE * scaleX, 46 * TILE * scaleY);
    // Horizontal corridors
    ctx.fillRect(8 * TILE * scaleX, 25 * TILE * scaleY, 54 * TILE * scaleX, 3 * TILE * scaleY);
    ctx.fillRect(8 * TILE * scaleX, 37 * TILE * scaleY, 54 * TILE * scaleX, 3 * TILE * scaleY);
    ctx.fillRect(8 * TILE * scaleX, 49 * TILE * scaleY, 54 * TILE * scaleX, 3 * TILE * scaleY);

    // Draw rooms
    for (const key in npcLocations) {
      const loc = npcLocations[key];
      const isDone = questState[key]?.completed;

      const rx = (loc.x - TILE * 2.5) * scaleX;
      const ry = (loc.y - TILE * 2.5) * scaleY;
      const rw = 5 * TILE * scaleX;
      const rh = 4 * TILE * scaleY;

      ctx.fillStyle = isDone ? '#10b981' : '#3b82f6';
      ctx.fillRect(rx, ry, rw, rh);
      ctx.strokeStyle = isDone ? '#a7f3d0' : '#bfdbfe';
      ctx.lineWidth = 1;
      ctx.strokeRect(rx, ry, rw, rh);

      // Icon
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(questsData[key]?.icon || '📍', loc.x * scaleX, loc.y * scaleY + 3);
    }

    // Draw Player Dot
    const px = player.x * scaleX;
    const py = player.y * scaleY;

    // Pulse outer ring
    ctx.fillStyle = 'rgba(255, 230, 109, 0.4)';
    ctx.beginPath();
    ctx.arc(px, py, 8, 0, Math.PI * 2);
    ctx.fill();

    // Player center dot
    ctx.fillStyle = '#ffe66d';
    ctx.beginPath();
    ctx.arc(px, py, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#292f36';
    ctx.lineWidth = 1.5;
    ctx.stroke();

  }, [player.x, player.y, questState, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#1f262e] border-4 border-[#ffe66d] rounded-2xl p-4 sm:p-5 max-w-lg w-full flex flex-col items-center shadow-2xl">
        <div className="flex justify-between items-center w-full mb-3">
          <h3 className="font-['Baloo_2',sans-serif] font-extrabold text-xl text-[#ffe66d] flex items-center gap-2">
            🗺️ Mini-Mapa do Campus
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center text-sm cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="relative border-3 border-[#ffe66d] rounded-xl overflow-hidden shadow-inner bg-[#1c2e22]">
          <canvas ref={canvasRef} width={360} height={335} className="block w-full h-auto" />
        </div>

        <div className="flex items-center gap-4 mt-3 text-xs text-white/80 font-bold">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#3b82f6] border border-white/40" /> Pendente
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#10b981] border border-white/40" /> Concluído
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ffe66d] border border-[#292f36]" /> Seu Personagem
          </div>
        </div>
      </div>
    </div>
  );
};
