import React, { useState, useEffect, useCallback } from 'react';
import { Player, QuestState, Question } from './types';
import { questsData } from './data/quests';
import { getRandomQuestionsForRoom } from './data/questionBank';
import { npcLocations, TILE } from './data/npcs';
import { CanvasGame } from './components/CanvasGame';
import { MiniMap } from './components/MiniMap';
import { SectorsModal } from './components/SectorsModal';
import {
  playInteractSound,
  playCorrectSound,
  playWrongSound,
  playQuestCompleteSound,
  playVictorySound,
  toggleMute,
  getIsMuted
} from './utils/audio';

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerNameInput, setPlayerNameInput] = useState("Bailarino(a)");

  const [player, setPlayer] = useState<Player>({
    name: "Bailarino(a)",
    x: 35 * TILE,
    y: 15 * TILE,
    width: 24,
    height: 38,
    speed: 8,
    score: 0
  });

  const [questState, setQuestState] = useState<QuestState>(() => {
    const state: QuestState = {};
    for (let key in questsData) {
      state[key] = { currentQ: 0, completed: false };
    }
    return state;
  });

  // Active session randomized questions for each sector
  const [roomQuestions, setRoomQuestions] = useState<Record<string, Question[]>>({});

  const [activeNPC, setActiveNPC] = useState<string | null>(null);

  // Dialog & Modal State
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogStage, setDialogStage] = useState<'intro' | 'question' | 'feedback' | 'completed' | 'victory'>('intro');
  const [dialogNPCKey, setDialogNPCKey] = useState<string | null>(null);
  const [feedbackCorrect, setFeedbackCorrect] = useState(false);
  const [feedbackExp, setFeedbackExp] = useState("");

  const [isMuted, setIsMuted] = useState(() => getIsMuted());
  const [isMiniMapOpen, setIsMiniMapOpen] = useState(false);
  const [isSectorsModalOpen, setIsSectorsModalOpen] = useState(false);

  // Key controls state
  const [keys, setKeys] = useState({
    up: false,
    down: false,
    left: false,
    right: false,
    action: false
  });

  // Touch & Tablet controls state
  const isTouchDevice = () => {
    if (typeof window === 'undefined') return false;
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) ||
      window.innerWidth <= 1366
    );
  };

  const [touchControlsEnabled, setTouchControlsEnabled] = useState(() => {
    try {
      const stored = localStorage.getItem('edisca_touch_controls');
      if (stored !== null) return JSON.parse(stored);
    } catch {}
    return isTouchDevice();
  });

  const [isRunning, setIsRunning] = useState(false);
  const [showSectorIcons, setShowSectorIcons] = useState(true);

  // Auto-detect on window resize / orientation change if not manually set
  useEffect(() => {
    const handleDeviceCheck = () => {
      try {
        const stored = localStorage.getItem('edisca_touch_controls');
        if (stored === null) {
          setTouchControlsEnabled(isTouchDevice());
        }
      } catch {
        setTouchControlsEnabled(isTouchDevice());
      }
    };
    window.addEventListener('resize', handleDeviceCheck);
    window.addEventListener('orientationchange', handleDeviceCheck);
    return () => {
      window.removeEventListener('resize', handleDeviceCheck);
      window.removeEventListener('orientationchange', handleDeviceCheck);
    };
  }, []);

  const handleToggleTouchControls = () => {
    setTouchControlsEnabled(prev => {
      const next = !prev;
      try {
        localStorage.setItem('edisca_touch_controls', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleToggleSprint = () => {
    setIsRunning(prev => {
      const next = !prev;
      setPlayer(p => ({ ...p, speed: next ? 12 : 8 }));
      return next;
    });
  };

  // Open Dialog handler with Audio Trigger
  const openDialog = useCallback((npcKey: string) => {
    playInteractSound();
    setDialogNPCKey(npcKey);
    const state = questState[npcKey];

    // Ensure we have a fresh randomized set of questions for this sector
    setRoomQuestions(prev => {
      if (!prev[npcKey] || state.currentQ === 0) {
        return { ...prev, [npcKey]: getRandomQuestionsForRoom(npcKey, 5) };
      }
      return prev;
    });

    if (state.completed) {
      setDialogStage('completed');
    } else {
      setDialogStage('intro');
    }
    setDialogOpen(true);
  }, [questState]);

  // Handle Keyboard events
  useEffect(() => {
    const setKeyState = (keyName: string, isDown: boolean) => {
      if (keyName === "ArrowUp" || keyName === "w" || keyName === "W") {
        setKeys(prev => prev.up === isDown ? prev : ({ ...prev, up: isDown }));
      }
      if (keyName === "ArrowDown" || keyName === "s" || keyName === "S") {
        setKeys(prev => prev.down === isDown ? prev : ({ ...prev, down: isDown }));
      }
      if (keyName === "ArrowLeft" || keyName === "a" || keyName === "A") {
        setKeys(prev => prev.left === isDown ? prev : ({ ...prev, left: isDown }));
      }
      if (keyName === "ArrowRight" || keyName === "d" || keyName === "D") {
        setKeys(prev => prev.right === isDown ? prev : ({ ...prev, right: isDown }));
      }
      if (keyName === "Shift") {
        setIsRunning(isDown);
        setPlayer(p => ({ ...p, speed: isDown ? 12 : 8 }));
      }
      if (keyName === " " || keyName === "Enter") {
        setKeys(prev => prev.action === isDown ? prev : ({ ...prev, action: isDown }));
        if (isDown && activeNPC && !dialogOpen && gameStarted) {
          openDialog(activeNPC);
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => setKeyState(e.key, true);
    const handleKeyUp = (e: KeyboardEvent) => setKeyState(e.key, false);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [activeNPC, dialogOpen, gameStarted, openDialog]);

  const handleStartGame = () => {
    const cleanName = playerNameInput.trim() || "Bailarino(a)";
    setPlayer(prev => ({ ...prev, name: cleanName }));

    // Generate a fresh random question pool for all rooms
    const freshQuestions: Record<string, Question[]> = {};
    for (let key in questsData) {
      freshQuestions[key] = getRandomQuestionsForRoom(key, 5);
    }
    setRoomQuestions(freshQuestions);
    setGameStarted(true);
  };

  const startChallenge = () => {
    setDialogStage('question');
  };

  const handleAnswer = (selectedIdx: number) => {
    if (!dialogNPCKey) return;
    const activeQs = roomQuestions[dialogNPCKey] || getRandomQuestionsForRoom(dialogNPCKey, 5);
    const qIndex = questState[dialogNPCKey].currentQ;
    const question = activeQs[qIndex];

    if (!question) return;

    if (selectedIdx === question.ans) {
      playCorrectSound();
      setPlayer(prev => ({ ...prev, score: prev.score + 20 }));
      setFeedbackCorrect(true);
      setFeedbackExp(question.exp);

      setQuestState(prev => {
        const nextQ = prev[dialogNPCKey].currentQ + 1;
        const isFinished = nextQ >= 5;
        if (isFinished) {
          playQuestCompleteSound();
        }
        return {
          ...prev,
          [dialogNPCKey]: {
            currentQ: nextQ,
            completed: isFinished
          }
        };
      });
    } else {
      playWrongSound();
      setFeedbackCorrect(false);
      setFeedbackExp("Essa não é a resposta correta para a nossa rotina. Pense em como as coisas funcionam aqui e tente novamente!");
    }
    setDialogStage('feedback');
  };

  const handleNextOrEarnMedal = () => {
    if (!dialogNPCKey) return;
    const currentState = questState[dialogNPCKey];

    if (currentState.completed) {
      setDialogOpen(false);
      // Check if ALL 16 rooms are completed for grand victory
      const allDone = (Object.values(questState) as { currentQ: number; completed: boolean }[]).every(s => s.completed);
      if (allDone) {
        playVictorySound();
        setTimeout(() => {
          setDialogStage('victory');
          setDialogOpen(true);
        }, 600);
      }
    } else {
      setDialogStage('question');
    }
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const handleToggleSound = () => {
    const muted = toggleMute();
    setIsMuted(muted);
  };

  const handleSelectSector = (sectorKey: string) => {
    if (npcLocations[sectorKey]) {
      setPlayer(prev => ({
        ...prev,
        x: npcLocations[sectorKey].x,
        y: npcLocations[sectorKey].y + 40
      }));
    }
  };

  const roomData = dialogNPCKey ? questsData[dialogNPCKey] : null;
  const activeRoomQuestions = dialogNPCKey ? (roomQuestions[dialogNPCKey] || getRandomQuestionsForRoom(dialogNPCKey, 5)) : [];
  const currentQIndex = dialogNPCKey ? Math.min(questState[dialogNPCKey]?.currentQ || 0, 4) : 0;
  const currentQ = activeRoomQuestions[currentQIndex] || null;

  const completedCount = (Object.values(questState) as { completed?: boolean }[]).filter(s => s?.completed).length;

  return (
    <div id="game-wrapper" className="fixed inset-0 w-full h-full overflow-hidden bg-[#142018] font-['Nunito',sans-serif] select-none touch-none">
      {/* Start Screen */}
      {!gameStarted && (
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center p-4 bg-gradient-to-b from-[#7fe3d4] via-[#4ecdc4] to-[#21665c]">
          <h1 className="font-['Baloo_2',sans-serif] font-extrabold text-5xl sm:text-6xl md:text-7xl text-[#ffe66d] drop-shadow-[3px_3px_0px_#ff6b6b] mb-2 text-center tracking-wide">
            EDISCA
          </h1>
          <h2 className="font-['Baloo_2',sans-serif] font-bold text-base sm:text-lg md:text-xl bg-gradient-to-r from-[#ff6b6b] to-[#ff8e8e] text-white px-5 py-2 rounded-full border-3 border-[#292f36] mb-6 text-center shadow-[0_4px_0_#292f36] max-w-[90%]">
            Uma aventura educativa pelos caminhos da EDISCA.
          </h2>

          <div className="bg-[rgba(32,38,46,0.92)] backdrop-blur-md border-4 border-[#ffe66d] rounded-2xl p-6 sm:p-8 w-full max-w-[400px] text-center shadow-2xl">
            <p className="mb-3 text-[#ffe66d] font-bold text-base sm:text-lg">Identifique-se, educando(a):</p>
            <input
              type="text"
              value={playerNameInput}
              onChange={(e) => setPlayerNameInput(e.target.value)}
              maxLength={15}
              className="w-full p-3 rounded-xl border-3 border-[#4ecdc4] text-lg sm:text-xl font-extrabold text-center mb-6 outline-none bg-white text-[#292f36] focus:border-[#ffe66d] focus:ring-4 focus:ring-[#ffe66d]/30"
            />
            <button
              onClick={handleStartGame}
              className="w-full bg-gradient-to-b from-[#ff8a8a] to-[#ff6b6b] hover:brightness-110 active:scale-98 text-white font-['Baloo_2',sans-serif] font-extrabold text-lg sm:text-xl py-3 px-6 rounded-xl border-3 border-[#292f36] shadow-[0_5px_0_#292f36] active:translate-y-1 active:shadow-none uppercase tracking-wider cursor-pointer transition-all"
            >
              Iniciar Aventura
            </button>
          </div>
        </div>
      )}

      {/* Main Canvas Game */}
      {gameStarted && (
        <>
          <CanvasGame
            player={player}
            setPlayer={setPlayer}
            questState={questState}
            activeNPC={activeNPC}
            setActiveNPC={setActiveNPC}
            keys={keys}
            onInteract={(npcKey) => {
              const target = npcKey || activeNPC;
              if (target && !dialogOpen) openDialog(target);
            }}
            dialogOpen={dialogOpen}
          />

          {/* Responsive HUD Header */}
          <div className="fixed top-2 left-2 sm:top-3 sm:left-3 right-2 sm:right-auto z-10 flex flex-col gap-2 pointer-events-none max-w-[calc(100vw-16px)]">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pointer-events-auto">
              {/* Player Badge */}
              <div className="bg-[rgba(32,38,46,0.92)] backdrop-blur-md border-3 border-[#ffe66d] rounded-xl px-2.5 sm:px-3.5 py-1.5 inline-flex items-center gap-2 font-['Baloo_2',sans-serif] shadow-lg">
                <strong className="text-[#ffe66d] text-xs sm:text-base truncate max-w-[110px] sm:max-w-[150px]">{player.name}</strong>
                <span className="text-white font-extrabold text-xs sm:text-base">⭐ {player.score}</span>
              </div>

              {/* Sound Button */}
              <button
                onClick={handleToggleSound}
                title={isMuted ? "Ativar som" : "Desativar som"}
                className="bg-[rgba(32,38,46,0.92)] backdrop-blur-md border-3 border-[#ffe66d] rounded-xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-sm sm:text-lg active:scale-95 transition-all cursor-pointer shadow-lg hover:bg-white/10"
              >
                {isMuted ? "🔇" : "🔊"}
              </button>

              {/* Touch Controls Toggle Button */}
              <button
                onClick={handleToggleTouchControls}
                title="Ativar ou ocultar botões de controle na tela"
                className={`bg-[rgba(32,38,46,0.92)] backdrop-blur-md border-3 rounded-xl px-2 sm:px-3 h-8 sm:h-10 flex items-center justify-center text-[11px] sm:text-xs font-bold font-['Baloo_2',sans-serif] active:scale-95 transition-all cursor-pointer shadow-lg gap-1 ${
                  touchControlsEnabled
                    ? 'border-[#4ecdc4] text-[#4ecdc4]'
                    : 'border-white/30 text-white/50'
                }`}
              >
                <span>🎮</span>
                <span className="hidden sm:inline">Botões:</span>
                <span>{touchControlsEnabled ? 'ON' : 'OFF'}</span>
              </button>

              {/* Mini-Map Button */}
              <button
                onClick={() => setIsMiniMapOpen(true)}
                title="Abrir Mini-Mapa do Campus"
                className="bg-[rgba(32,38,46,0.92)] backdrop-blur-md border-3 border-[#ffe66d] rounded-xl px-2 sm:px-3 h-8 sm:h-10 flex items-center justify-center text-[11px] sm:text-xs font-bold text-[#ffe66d] font-['Baloo_2',sans-serif] active:scale-95 transition-all cursor-pointer shadow-lg hover:bg-white/10 gap-1"
              >
                <span>🗺️</span> <span className="hidden sm:inline">Mapa</span>
              </button>

              {/* Sectors Modal Button */}
              <button
                onClick={() => setIsSectorsModalOpen(true)}
                title="Ver Lista Completa de Setores"
                className="bg-[rgba(32,38,46,0.92)] backdrop-blur-md border-3 border-[#ffe66d] rounded-xl px-2 sm:px-3 h-8 sm:h-10 flex items-center justify-center text-[11px] sm:text-xs font-bold text-[#ffe66d] font-['Baloo_2',sans-serif] active:scale-95 transition-all cursor-pointer shadow-lg hover:bg-white/10 gap-1"
              >
                <span>🏛️</span> <span className="hidden sm:inline">Setores</span>
              </button>

              {/* Sector Badges Progress Pill / Toggle */}
              <button
                onClick={() => setShowSectorIcons(prev => !prev)}
                title="Expandir/Recolher ícones de setores"
                className="bg-[rgba(32,38,46,0.92)] backdrop-blur-md border-3 border-[#ffe66d] rounded-xl px-2 sm:px-2.5 h-8 sm:h-10 flex items-center justify-center text-[11px] sm:text-xs font-bold text-[#ffe66d] font-['Baloo_2',sans-serif] active:scale-95 transition-all cursor-pointer shadow-lg hover:bg-white/10 gap-1"
              >
                <span>🏆</span> {completedCount}/16
                <span className="text-[10px] text-white/70">{showSectorIcons ? '▲' : '▼'}</span>
              </button>
            </div>

            {/* Collapsible 16 Sector Badges row */}
            {showSectorIcons && (
              <div className="bg-[rgba(32,38,46,0.92)] backdrop-blur-md border-3 border-[#ffe66d] rounded-xl p-1.5 sm:p-2 flex flex-wrap gap-1 sm:gap-1.5 max-w-[270px] sm:max-w-[360px] shadow-lg pointer-events-auto">
                {Object.keys(questsData).map(key => {
                  const isCompleted = questState[key]?.completed;
                  return (
                    <div
                      key={key}
                      onClick={() => handleSelectSector(key)}
                      title={`${questsData[key].room} (Clique para ir)`}
                      className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex justify-center items-center text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                        isCompleted
                          ? 'opacity-100 border-2 border-[#ffe66d] bg-gradient-to-br from-[#fff4b8] to-[#fca311] shadow-[0_0_12px_#ffe66d] scale-105'
                          : 'opacity-40 border-2 border-dashed border-white/40 bg-white/10 hover:opacity-80'
                      }`}
                    >
                      {questsData[key].icon}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Desktop Keyboard Hints (only when virtual buttons are disabled) */}
          {!touchControlsEnabled && (
            <div className="fixed top-3 right-3 z-10 bg-[rgba(32,38,46,0.88)] backdrop-blur-md border-2 border-[#4ecdc4] p-2.5 sm:p-3 rounded-xl text-white text-[11px] sm:text-xs text-right shadow-lg leading-relaxed pointer-events-none">
              ⌨️ <b>WASD / Setas</b> para Andar<br />
              🔘 <b>Espaço / Enter</b> para Interagir
            </div>
          )}

          {/* Proximity Prompt (Neatly anchored near top, never blocking the middle screen) */}
          {activeNPC && !questState[activeNPC]?.completed && !dialogOpen && (
            <button
              onClick={() => openDialog(activeNPC)}
              className="fixed top-20 sm:top-24 left-1/2 -translate-x-1/2 z-20 bg-[rgba(26,34,44,0.95)] backdrop-blur-md border-3 border-[#ffe66d] px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-full font-extrabold font-['Baloo_2',sans-serif] text-white shadow-2xl text-center active:scale-95 transition-all cursor-pointer flex items-center gap-2 max-w-[94vw] animate-pulse hover:border-[#4ecdc4]"
            >
              <span className="text-sm sm:text-base">💬</span>
              <span className="text-xs sm:text-sm truncate">
                Falar com <b className="text-[#ffe66d]">{questsData[activeNPC].npcs.join(" & ")}</b> ({questsData[activeNPC].room})
              </span>
              <span className="bg-[#ff6b6b] text-white text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-full uppercase shrink-0">
                Toque
              </span>
            </button>
          )}

          {/* Virtual Touch Screen Controls for Tablets & Mobile */}
          {touchControlsEnabled && (
            <>
              {/* Virtual DPAD - Left Side */}
              <div
                className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-20 pointer-events-auto select-none touch-none"
                style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)', paddingLeft: 'env(safe-area-inset-left, 0px)' }}
              >
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 bg-[rgba(24,31,39,0.85)] backdrop-blur-md rounded-3xl border-3 border-[#ffe66d]/70 shadow-[0_8px_24px_rgba(0,0,0,0.5)] p-2 flex items-center justify-center">
                  {/* Up */}
                  <button
                    onPointerDown={(e) => {
                      e.preventDefault();
                      try { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); } catch {}
                      setKeys(prev => prev.up ? prev : ({ ...prev, up: true }));
                    }}
                    onPointerUp={(e) => {
                      e.preventDefault();
                      try { (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId); } catch {}
                      setKeys(prev => !prev.up ? prev : ({ ...prev, up: false }));
                    }}
                    onPointerLeave={() => setKeys(prev => !prev.up ? prev : ({ ...prev, up: false }))}
                    onPointerCancel={() => setKeys(prev => !prev.up ? prev : ({ ...prev, up: false }))}
                    className={`absolute top-2 left-1/2 -translate-x-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center text-xl font-bold transition-transform shadow-md cursor-pointer ${
                      keys.up
                        ? 'bg-[#ffe66d] text-[#1b2026] scale-95 shadow-inner'
                        : 'bg-white/10 hover:bg-white/20 active:bg-[#ffe66d] text-white border border-white/20'
                    }`}
                  >
                    ▲
                  </button>

                  {/* Down */}
                  <button
                    onPointerDown={(e) => {
                      e.preventDefault();
                      try { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); } catch {}
                      setKeys(prev => prev.down ? prev : ({ ...prev, down: true }));
                    }}
                    onPointerUp={(e) => {
                      e.preventDefault();
                      try { (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId); } catch {}
                      setKeys(prev => !prev.down ? prev : ({ ...prev, down: false }));
                    }}
                    onPointerLeave={() => setKeys(prev => !prev.down ? prev : ({ ...prev, down: false }))}
                    onPointerCancel={() => setKeys(prev => !prev.down ? prev : ({ ...prev, down: false }))}
                    className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center text-xl font-bold transition-transform shadow-md cursor-pointer ${
                      keys.down
                        ? 'bg-[#ffe66d] text-[#1b2026] scale-95 shadow-inner'
                        : 'bg-white/10 hover:bg-white/20 active:bg-[#ffe66d] text-white border border-white/20'
                    }`}
                  >
                    ▼
                  </button>

                  {/* Left */}
                  <button
                    onPointerDown={(e) => {
                      e.preventDefault();
                      try { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); } catch {}
                      setKeys(prev => prev.left ? prev : ({ ...prev, left: true }));
                    }}
                    onPointerUp={(e) => {
                      e.preventDefault();
                      try { (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId); } catch {}
                      setKeys(prev => !prev.left ? prev : ({ ...prev, left: false }));
                    }}
                    onPointerLeave={() => setKeys(prev => !prev.left ? prev : ({ ...prev, left: false }))}
                    onPointerCancel={() => setKeys(prev => !prev.left ? prev : ({ ...prev, left: false }))}
                    className={`absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center text-xl font-bold transition-transform shadow-md cursor-pointer ${
                      keys.left
                        ? 'bg-[#ffe66d] text-[#1b2026] scale-95 shadow-inner'
                        : 'bg-white/10 hover:bg-white/20 active:bg-[#ffe66d] text-white border border-white/20'
                    }`}
                  >
                    ◀
                  </button>

                  {/* Right */}
                  <button
                    onPointerDown={(e) => {
                      e.preventDefault();
                      try { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); } catch {}
                      setKeys(prev => prev.right ? prev : ({ ...prev, right: true }));
                    }}
                    onPointerUp={(e) => {
                      e.preventDefault();
                      try { (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId); } catch {}
                      setKeys(prev => !prev.right ? prev : ({ ...prev, right: false }));
                    }}
                    onPointerLeave={() => setKeys(prev => !prev.right ? prev : ({ ...prev, right: false }))}
                    onPointerCancel={() => setKeys(prev => !prev.right ? prev : ({ ...prev, right: false }))}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center text-xl font-bold transition-transform shadow-md cursor-pointer ${
                      keys.right
                        ? 'bg-[#ffe66d] text-[#1b2026] scale-95 shadow-inner'
                        : 'bg-white/10 hover:bg-white/20 active:bg-[#ffe66d] text-white border border-white/20'
                    }`}
                  >
                    ▶
                  </button>

                  {/* Center Accent */}
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1b2026] border-2 border-[#ffe66d]/40 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#4ecdc4]" />
                  </div>
                </div>
              </div>

              {/* Action & Sprint Buttons - Right Side */}
              <div
                className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 pointer-events-auto select-none touch-none flex flex-col items-center gap-2.5"
                style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)', paddingRight: 'env(safe-area-inset-right, 0px)' }}
              >
                {/* Sprint Toggle Button */}
                <button
                  onClick={handleToggleSprint}
                  className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full border-2 font-['Baloo_2',sans-serif] font-bold text-xs flex items-center gap-1.5 shadow-lg active:scale-95 transition-all cursor-pointer backdrop-blur-md ${
                    isRunning
                      ? 'bg-gradient-to-r from-[#ffe66d] to-[#fca311] text-[#292f36] border-white shadow-[0_0_12px_#ffe66d]'
                      : 'bg-[rgba(24,31,39,0.85)] text-white/90 border-[#4ecdc4]/60 hover:border-[#4ecdc4]'
                  }`}
                >
                  <span>{isRunning ? '⚡ Correndo' : '🚶 Andando'}</span>
                </button>

                {/* Primary Interact Button */}
                <button
                  onPointerDown={(e) => {
                    e.preventDefault();
                    if (activeNPC && !dialogOpen) {
                      openDialog(activeNPC);
                    }
                  }}
                  onClick={() => {
                    if (activeNPC && !dialogOpen) {
                      openDialog(activeNPC);
                    }
                  }}
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 flex flex-col items-center justify-center shadow-2xl active:scale-95 transition-all cursor-pointer select-none font-['Baloo_2',sans-serif] font-extrabold ${
                    activeNPC && !dialogOpen
                      ? 'bg-gradient-to-br from-[#ffe66d] via-[#fca311] to-[#ff6b6b] text-[#292f36] border-white ring-4 ring-[#ffe66d]/40 shadow-[0_0_20px_#ffe66d] animate-pulse'
                      : 'bg-gradient-to-br from-[#2a3441] to-[#1a2129] text-white/80 border-[#ffe66d]/60 shadow-lg'
                  }`}
                >
                  <span className="text-xl sm:text-2xl">{activeNPC && !dialogOpen ? '💬' : '✨'}</span>
                  <span className="text-[11px] sm:text-xs font-black tracking-wide leading-none mt-1">
                    {activeNPC && !dialogOpen ? 'FALAR' : 'AÇÃO'}
                  </span>
                  {activeNPC && !dialogOpen && (
                    <span className="text-[9px] font-bold opacity-90 truncate max-w-[66px] sm:max-w-[76px] mt-0.5">
                      {questsData[activeNPC]?.room || ''}
                    </span>
                  )}
                </button>
              </div>
            </>
          )}

          {/* Mini-Map Overlay */}
          <MiniMap
            player={player}
            questState={questState}
            isOpen={isMiniMapOpen}
            onClose={() => setIsMiniMapOpen(false)}
          />

          {/* Sectors Modal */}
          <SectorsModal
            isOpen={isSectorsModalOpen}
            onClose={() => setIsSectorsModalOpen(false)}
            questState={questState}
            onSelectSector={handleSelectSector}
          />

          {/* Dialog Modal */}
          {dialogOpen && roomData && (
            <div className="fixed inset-0 z-30 bg-black/75 backdrop-blur-xs flex justify-center items-center p-3 sm:p-4">
              <div className="bg-[rgba(32,38,46,0.96)] backdrop-blur-md border-4 border-[#ffe66d] rounded-2xl w-full max-w-[680px] max-h-[88dvh] flex flex-col shadow-2xl overflow-hidden text-white">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#292f36] to-[#1b2026] p-3.5 sm:p-4 flex items-center justify-between border-b-3 border-[#ffe66d]">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-tr from-[#ff6b6b] to-[#ff9a9a] border-3 border-[#ffe66d] rounded-full flex justify-center items-center text-xl sm:text-2xl shadow-md shrink-0">
                      {roomData.icon}
                    </div>
                    <div>
                      <div className="font-bold text-[#ffe66d] text-lg sm:text-xl font-['Baloo_2',sans-serif]">
                        {roomData.npcs.length > 2
                          ? `${roomData.npcs.slice(0, -1).join(", ")} e ${roomData.npcs[roomData.npcs.length - 1]}`
                          : roomData.npcs.join(" & ")}
                      </div>
                      <div className="text-xs sm:text-sm opacity-80 font-semibold">{roomData.room}</div>
                    </div>
                  </div>

                  {/* Progress Indicator Dots */}
                  {dialogNPCKey && (
                    <div className="flex gap-1 bg-white/10 px-2.5 py-1 rounded-full border border-white/10">
                      {[0, 1, 2, 3, 4].map(idx => (
                        <span
                          key={idx}
                          className={`w-2.5 h-2.5 rounded-full ${
                            idx < (questState[dialogNPCKey]?.currentQ || 0)
                              ? 'bg-[#4ecdc4]'
                              : idx === (questState[dialogNPCKey]?.currentQ || 0)
                                ? 'bg-[#ffe66d] animate-pulse'
                                : 'bg-white/20'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="p-4 sm:p-6 text-sm sm:text-base leading-relaxed overflow-y-auto font-semibold">
                  {dialogStage === 'completed' && (
                    <div className="text-center py-4">
                      <p className="text-lg sm:text-xl text-[#4ecdc4] font-extrabold mb-3">✨ Missão Cumprida!</p>
                      <p>Excelente trabalho! Nosso setor está mais organizado e preparado graças a você.</p>
                    </div>
                  )}

                  {dialogStage === 'intro' && (
                    <div className="py-2">
                      <p className="mb-4 text-white/95 leading-relaxed">{roomData.intro}</p>
                    </div>
                  )}

                  {dialogStage === 'question' && currentQ && (
                    <div>
                      <div className="text-[#ffe66d] font-bold mb-2 text-sm sm:text-base">
                        Desafio Operacional {currentQIndex + 1}/5:
                      </div>
                      <div className="mb-4 text-white/95 font-medium text-base sm:text-lg">{currentQ.q}</div>
                      <div className="flex flex-col gap-2 sm:gap-2.5">
                        {currentQ.opts.map((opt, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleAnswer(idx)}
                            className="bg-white/5 hover:bg-[#4ecdc4] hover:text-[#292f36] active:bg-[#4ecdc4] active:text-[#292f36] border-2 border-[#4ecdc4] border-l-6 text-left p-3 sm:p-3.5 rounded-xl text-sm sm:text-base font-bold transition-all cursor-pointer"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {dialogStage === 'feedback' && (
                    <div className="py-2 sm:py-3">
                      {feedbackCorrect ? (
                        <div>
                          <h3 className="text-[#4ecdc4] font-extrabold text-xl sm:text-2xl mb-2 sm:mb-3 font-['Baloo_2',sans-serif]">
                            ✨ Brilhante! É assim que se faz.
                          </h3>
                          <p className="text-white/90 leading-relaxed text-sm sm:text-base">{feedbackExp}</p>
                        </div>
                      ) : (
                        <div>
                          <h3 className="text-[#ff6b6b] font-extrabold text-xl sm:text-2xl mb-2 sm:mb-3 font-['Baloo_2',sans-serif]">
                            ❌ Atenção!
                          </h3>
                          <p className="text-white/90 leading-relaxed text-sm sm:text-base">{feedbackExp}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {dialogStage === 'victory' && (
                    <div className="text-center py-4">
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#ffe66d] font-['Baloo_2',sans-serif] mb-3">
                        PARABÉNS, {player.name}!
                      </h2>
                      <p className="text-sm sm:text-base leading-relaxed text-white/95 mb-4">
                        Você ajudou em todos os setores da instituição! Agora você entende perfeitamente que o espetáculo no palco só acontece por causa do trabalho de cada equipe nos bastidores. O talento brilha onde a educação e a união são a base!
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="p-3.5 sm:p-4 bg-black/20 flex justify-end gap-3 border-t border-white/10">
                  {dialogStage === 'completed' && (
                    <button
                      onClick={closeDialog}
                      className="bg-gradient-to-b from-[#ff8a8a] to-[#ff6b6b] text-white font-extrabold font-['Baloo_2',sans-serif] py-2 px-5 sm:py-2.5 sm:px-6 rounded-xl border-2 border-[#292f36] shadow-md hover:brightness-110 cursor-pointer"
                    >
                      Valeu!
                    </button>
                  )}

                  {dialogStage === 'intro' && (
                    <>
                      <button
                        onClick={startChallenge}
                        className="bg-gradient-to-b from-[#ff8a8a] to-[#ff6b6b] text-white font-extrabold font-['Baloo_2',sans-serif] py-2 px-5 sm:py-2.5 sm:px-6 rounded-xl border-2 border-[#292f36] shadow-md hover:brightness-110 cursor-pointer"
                      >
                        Começar
                      </button>
                      <button
                        onClick={closeDialog}
                        className="bg-[#292f36] text-white/80 font-bold font-['Baloo_2',sans-serif] py-2 px-4 sm:py-2.5 sm:px-5 rounded-xl border-2 border-white/20 hover:text-white cursor-pointer"
                      >
                        Depois
                      </button>
                    </>
                  )}

                  {dialogStage === 'feedback' && (
                    <button
                      onClick={handleNextOrEarnMedal}
                      className="bg-gradient-to-b from-[#ffe66d] to-[#fca311] text-[#292f36] font-extrabold font-['Baloo_2',sans-serif] py-2 px-5 sm:py-2.5 sm:px-6 rounded-xl border-2 border-[#292f36] shadow-md hover:brightness-110 cursor-pointer"
                    >
                      {feedbackCorrect
                        ? (questState[dialogNPCKey!].completed ? "Receber Selo" : "Próxima Situação")
                        : "Tentar Novamente"}
                    </button>
                  )}

                  {dialogStage === 'victory' && (
                    <button
                      onClick={() => window.location.reload()}
                      className="bg-gradient-to-b from-[#ffe66d] to-[#fca311] text-[#292f36] font-extrabold font-['Baloo_2',sans-serif] py-2 px-5 sm:py-2.5 sm:px-6 rounded-xl border-2 border-[#292f36] shadow-md hover:brightness-110 cursor-pointer"
                    >
                      Recomeçar
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
