import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Player, QuestState, Question } from './types';
import { questsData } from './data/quests';
import { getRandomQuestionsForRoom } from './data/questionBank';
import { getQuestionReasoning } from './data/questionReasoning';
import { npcLocations, TILE } from './data/npcs';
import { CanvasGame } from './components/CanvasGame';
import { MiniMap } from './components/MiniMap';
import { SectorsModal } from './components/SectorsModal';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import { NPCAvatar } from './components/NPCAvatar';
import {
  loadGameSave,
  saveGame,
  clearGameSave,
  hasActiveProgress,
  SavedGame,
  getCompletedQuestsCount
} from './utils/storage';
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
  const initialSaveRef = useRef<SavedGame | null>(loadGameSave());
  const [savedGame, setSavedGame] = useState<SavedGame | null>(() => initialSaveRef.current);

  const [gameStarted, setGameStarted] = useState(() => {
    // If the player was in an active game session, automatically return right to where they were!
    return !!initialSaveRef.current?.gameStarted;
  });

  const [playerNameInput, setPlayerNameInput] = useState(() => {
    return initialSaveRef.current?.player?.name || "Bailarino(a)";
  });

  const [playerAgeInput, setPlayerAgeInput] = useState<number>(() => {
    return initialSaveRef.current?.player?.age || 10;
  });

  const [player, setPlayer] = useState<Player>(() => {
    if (initialSaveRef.current?.player) {
      return {
        ...initialSaveRef.current.player,
        age: initialSaveRef.current.player.age || 10
      };
    }
    return {
      name: "Bailarino(a)",
      age: 10,
      x: 35 * TILE,
      y: 15 * TILE,
      width: 24,
      height: 38,
      speed: 8,
      score: 0
    };
  });

  const [questState, setQuestState] = useState<QuestState>(() => {
    if (initialSaveRef.current?.questState) {
      return initialSaveRef.current.questState;
    }
    const state: QuestState = {};
    for (let key in questsData) {
      state[key] = { currentQ: 0, completed: false };
    }
    return state;
  });

  // Active session randomized questions for each sector
  const [roomQuestions, setRoomQuestions] = useState<Record<string, Question[]>>(() => {
    if (initialSaveRef.current?.roomQuestions && Object.keys(initialSaveRef.current.roomQuestions).length > 0) {
      return initialSaveRef.current.roomQuestions;
    }
    return {};
  });

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
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [savePulse, setSavePulse] = useState(false);

  // Toast notifying player their session was seamlessly restored
  const [resumeToast, setResumeToast] = useState<string | null>(() => {
    if (initialSaveRef.current?.gameStarted) {
      const c = getCompletedQuestsCount(initialSaveRef.current.questState);
      return `Progresso restaurado! Você está onde parou (${c}/16 selos).`;
    }
    return null;
  });

  useEffect(() => {
    if (resumeToast) {
      const timer = setTimeout(() => setResumeToast(null), 4500);
      return () => clearTimeout(timer);
    }
  }, [resumeToast]);

  // Keep references synced for auto-save and beforeunload
  const playerRef = useRef(player);
  playerRef.current = player;
  const questStateRef = useRef(questState);
  questStateRef.current = questState;
  const roomQuestionsRef = useRef(roomQuestions);
  roomQuestionsRef.current = roomQuestions;
  const gameStartedRef = useRef(gameStarted);
  gameStartedRef.current = gameStarted;

  // Immediate save on critical gameplay updates (score, completed quests, questions)
  useEffect(() => {
    if (!gameStarted) return;
    saveGame(player, questState, roomQuestions, true);
    setSavePulse(true);
    const t = setTimeout(() => setSavePulse(false), 1800);
    return () => clearTimeout(t);
  }, [player.score, questState, roomQuestions, gameStarted]);

  // Periodic position auto-save (every 2.5s while playing)
  useEffect(() => {
    if (!gameStarted) return;
    const interval = setInterval(() => {
      saveGame(playerRef.current, questStateRef.current, roomQuestionsRef.current, true);
    }, 2500);
    return () => clearInterval(interval);
  }, [gameStarted]);

  // Always save immediately on page reload, tab close, or app switch
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (gameStartedRef.current) {
        saveGame(playerRef.current, questStateRef.current, roomQuestionsRef.current, true);
      }
    };
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && gameStartedRef.current) {
        saveGame(playerRef.current, questStateRef.current, roomQuestionsRef.current, true);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

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

    // Ensure we have a randomized set of questions adapted to the player's age
    setRoomQuestions(prev => {
      if (!prev[npcKey] || prev[npcKey].length === 0) {
        return { ...prev, [npcKey]: getRandomQuestionsForRoom(npcKey, 5, player.age) };
      }
      return prev;
    });

    if (state.completed) {
      setDialogStage('completed');
    } else {
      setDialogStage('intro');
    }
    setDialogOpen(true);
  }, [questState, player.age]);

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
    const cleanAge = Math.min(18, Math.max(7, Number(playerAgeInput) || 10));
    const newPlayer: Player = {
      name: cleanName,
      age: cleanAge,
      x: 35 * TILE,
      y: 15 * TILE,
      width: 24,
      height: 38,
      speed: 8,
      score: 0
    };
    setPlayer(newPlayer);

    const freshState: QuestState = {};
    for (let key in questsData) {
      freshState[key] = { currentQ: 0, completed: false };
    }
    setQuestState(freshState);

    // Generate a fresh random question pool for all rooms adapted to the student's age
    const freshQuestions: Record<string, Question[]> = {};
    for (let key in questsData) {
      freshQuestions[key] = getRandomQuestionsForRoom(key, 5, cleanAge);
    }
    setRoomQuestions(freshQuestions);
    setGameStarted(true);

    saveGame(newPlayer, freshState, freshQuestions, true);
    setSavedGame({
      version: 1,
      player: newPlayer,
      questState: freshState,
      roomQuestions: freshQuestions,
      gameStarted: true,
      savedAt: Date.now()
    });
  };

  const handleConfirmReset = () => {
    clearGameSave();
    setSavedGame(null);
    const cleanAge = Math.min(18, Math.max(7, Number(playerAgeInput) || player.age || 10));
    const resetPlayer: Player = {
      name: playerNameInput.trim() || player.name || "Bailarino(a)",
      age: cleanAge,
      x: 35 * TILE,
      y: 15 * TILE,
      width: 24,
      height: 38,
      speed: 8,
      score: 0
    };
    setPlayer(resetPlayer);
    const freshState: QuestState = {};
    for (let key in questsData) {
      freshState[key] = { currentQ: 0, completed: false };
    }
    setQuestState(freshState);
    const freshQuestions: Record<string, Question[]> = {};
    for (let key in questsData) {
      freshQuestions[key] = getRandomQuestionsForRoom(key, 5, cleanAge);
    }
    setRoomQuestions(freshQuestions);
    setGameStarted(false);
    setIsResetModalOpen(false);
    setDialogOpen(false);
    setResumeToast(`Progresso reiniciado! Perguntas adaptadas para ${cleanAge} anos foram geradas.`);
    setTimeout(() => setResumeToast(null), 4000);
  };

  const handlePlayAgainWithNewQuestions = () => {
    // Generate fresh questions for all rooms adapted to player.age
    const freshQuestions: Record<string, Question[]> = {};
    for (let key in questsData) {
      freshQuestions[key] = getRandomQuestionsForRoom(key, 5, player.age);
    }
    const freshState: QuestState = {};
    for (let key in questsData) {
      freshState[key] = { currentQ: 0, completed: false };
    }
    const resetPlayer: Player = {
      ...player,
      score: 0,
      x: 35 * TILE,
      y: 15 * TILE
    };
    setPlayer(resetPlayer);
    setQuestState(freshState);
    setRoomQuestions(freshQuestions);
    setDialogOpen(false);
    setDialogStage('intro');
    saveGame(resetPlayer, freshState, freshQuestions, true);
    setResumeToast(`Nova jornada iniciada com perguntas adaptadas para ${player.age} anos!`);
    setTimeout(() => setResumeToast(null), 4000);
  };

  const startChallenge = () => {
    setDialogStage('question');
  };

  const handleAnswer = (selectedIdx: number) => {
    if (!dialogNPCKey) return;
    const activeQs = roomQuestions[dialogNPCKey] || getRandomQuestionsForRoom(dialogNPCKey, 5, player.age);
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
      const reasoning = getQuestionReasoning(question, dialogNPCKey);
      setFeedbackExp(reasoning);
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
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center p-4 bg-gradient-to-b from-[#7fe3d4] via-[#4ecdc4] to-[#21665c] overflow-y-auto">
          <h1 className="font-['Baloo_2',sans-serif] font-extrabold text-5xl sm:text-6xl md:text-7xl text-[#ffe66d] drop-shadow-[3px_3px_0px_#ff6b6b] mb-2 text-center tracking-wide">
            EDISCA
          </h1>
          <h2 className="font-['Baloo_2',sans-serif] font-bold text-base sm:text-lg md:text-xl bg-gradient-to-r from-[#ff6b6b] to-[#ff8e8e] text-white px-5 py-2 rounded-full border-3 border-[#292f36] mb-6 text-center shadow-[0_4px_0_#292f36] max-w-[90%]">
            Uma aventura educativa pelos caminhos da EDISCA.
          </h2>

          <div className="bg-[rgba(32,38,46,0.92)] backdrop-blur-md border-4 border-[#ffe66d] rounded-2xl p-6 sm:p-8 w-full max-w-[420px] text-center shadow-2xl">
            {savedGame && hasActiveProgress(savedGame) ? (
              <>
                <div className="bg-[#15191e] border-2 border-[#4ecdc4]/60 rounded-xl p-4 mb-5 text-left shadow-inner">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black uppercase tracking-wider text-[#4ecdc4] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#4ecdc4] animate-ping" />
                      Progresso Salvo
                    </span>
                    <span className="text-xs text-white/60">
                      {new Date(savedGame.savedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="font-['Baloo_2',sans-serif] font-bold text-2xl text-[#ffe66d] flex items-center justify-between">
                    <span>{savedGame.player.name}</span>
                    <span className="text-xs bg-[#ffe66d]/20 text-[#ffe66d] border border-[#ffe66d]/40 px-2 py-0.5 rounded-full font-sans font-extrabold">
                      {savedGame.player.age || 10} anos
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-xs sm:text-sm font-semibold text-white/80">
                    <span className="text-[#ffe66d]">⭐ {savedGame.player.score} pontos</span>
                    <span>•</span>
                    <span className="text-[#4ecdc4]">{getCompletedQuestsCount(savedGame.questState)} de 16 selos</span>
                  </div>
                  <div className="text-[11px] font-bold text-[#4ecdc4] mt-1.5 flex items-center gap-1">
                    <span>{(savedGame.player.age || 10) <= 9 ? '🌱' : (savedGame.player.age || 10) <= 12 ? '🌿' : '🌳'}</span>
                    <span>
                      {(savedGame.player.age || 10) <= 9
                        ? 'Nível Infantil (Perguntas Fáceis)'
                        : (savedGame.player.age || 10) <= 12
                        ? 'Nível Intermediário'
                        : 'Nível Juvenil / Avançado'}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setGameStarted(true);
                      setResumeToast(`Bem-vindo(a) de volta, ${player.name}!`);
                    }}
                    className="w-full bg-gradient-to-b from-[#4ecdc4] to-[#20a39e] hover:brightness-110 active:scale-98 text-white font-['Baloo_2',sans-serif] font-extrabold text-lg sm:text-xl py-3.5 px-6 rounded-xl border-3 border-[#292f36] shadow-[0_5px_0_#292f36] active:translate-y-1 active:shadow-none uppercase tracking-wider cursor-pointer transition-all flex items-center justify-center gap-2"
                  >
                    <span>▶️</span> Continuar Onde Parei
                  </button>

                  <button
                    onClick={() => setIsResetModalOpen(true)}
                    className="w-full bg-white/10 hover:bg-white/20 active:scale-98 text-red-300 hover:text-red-200 font-['Baloo_2',sans-serif] font-bold text-sm py-2.5 px-4 rounded-xl border-2 border-red-400/40 cursor-pointer transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>🔄</span> Reiniciar Progresso
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Bailarina Avatar Preview */}
                <div className="flex flex-col items-center mb-3">
                  <NPCAvatar
                    profile={{
                      name: "Bailarina",
                      gender: 'F',
                      skin: '#7c4a24',
                      shirt: '#18181b',
                      pants: '#18181b',
                      hair: '#1c1917',
                      hStyle: 3,
                      glasses: false
                    }}
                    size={68}
                    className="border-3 border-[#ffe66d] shadow-xl"
                  />
                  <span className="text-xs font-bold text-[#ffe66d] mt-1.5 font-['Baloo_2',sans-serif]">
                    Bailarina da EDISCA
                  </span>
                </div>

                <p className="mb-3 text-[#ffe66d] font-bold text-base sm:text-lg">Identifique-se, educando(a):</p>
                
                {/* Nome do Educando */}
                <div className="mb-3.5 text-left">
                  <label className="block text-xs font-bold text-white/80 uppercase tracking-wide mb-1">
                    Nome ou Apelido:
                  </label>
                  <input
                    type="text"
                    value={playerNameInput}
                    onChange={(e) => setPlayerNameInput(e.target.value)}
                    maxLength={15}
                    placeholder="Ex: Sofia"
                    className="w-full p-2.5 sm:p-3 rounded-xl border-3 border-[#4ecdc4] text-base sm:text-lg font-extrabold text-center outline-none bg-white text-[#292f36] focus:border-[#ffe66d] focus:ring-4 focus:ring-[#ffe66d]/30"
                  />
                </div>

                {/* Idade do Educando */}
                <div className="mb-5 text-left">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-white/80 uppercase tracking-wide">
                      Qual a sua idade?
                    </label>
                    <span className="text-xs font-extrabold text-[#ffe66d] bg-white/10 px-2 py-0.5 rounded-full border border-[#ffe66d]/30">
                      {playerAgeInput} anos
                    </span>
                  </div>

                  {/* Stepper Controls */}
                  <div className="flex items-center gap-2 mb-2">
                    <button
                      type="button"
                      onClick={() => setPlayerAgeInput(prev => Math.max(7, prev - 1))}
                      title="Diminuir idade"
                      className="w-10 h-10 bg-white/10 hover:bg-white/20 active:scale-95 text-white font-extrabold text-xl rounded-xl border-2 border-white/20 flex items-center justify-center cursor-pointer transition-all"
                    >
                      −
                    </button>
                    
                    <div className="flex-1 bg-white/5 border-2 border-white/20 rounded-xl py-1 px-3 text-center">
                      <span className="text-xl sm:text-2xl font-black text-[#ffe66d] font-['Baloo_2',sans-serif]">
                        {playerAgeInput} <span className="text-xs font-semibold text-white/80">anos</span>
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setPlayerAgeInput(prev => Math.min(18, prev + 1))}
                      title="Aumentar idade"
                      className="w-10 h-10 bg-white/10 hover:bg-white/20 active:scale-95 text-white font-extrabold text-xl rounded-xl border-2 border-white/20 flex items-center justify-center cursor-pointer transition-all"
                    >
                      +
                    </button>
                  </div>

                  {/* Quick Age Buttons */}
                  <div className="grid grid-cols-4 gap-1.5 mb-2.5">
                    {[8, 10, 12, 14].map((sAge) => (
                      <button
                        key={sAge}
                        type="button"
                        onClick={() => setPlayerAgeInput(sAge)}
                        className={`py-1 px-1 rounded-lg text-xs font-extrabold transition-all cursor-pointer border ${
                          playerAgeInput === sAge
                            ? 'bg-[#ffe66d] text-[#1b2026] border-[#ffe66d] scale-102 shadow-md'
                            : 'bg-white/10 text-white/80 border-white/15 hover:bg-white/20'
                        }`}
                      >
                        {sAge} anos
                      </button>
                    ))}
                  </div>

                  {/* Adaptive Level Explanation Badge */}
                  <div className="bg-[#15191e] border-2 border-[#4ecdc4]/40 rounded-xl p-2.5 flex items-center gap-2.5 text-left">
                    <span className="text-2xl">
                      {playerAgeInput <= 9 ? '🌱' : playerAgeInput <= 12 ? '🌿' : '🌳'}
                    </span>
                    <div className="text-xs">
                      <div className="font-extrabold text-[#ffe66d]">
                        {playerAgeInput <= 9
                          ? 'Nível Infantil (7 a 9 anos)'
                          : playerAgeInput <= 12
                          ? 'Nível Intermediário (10 a 12 anos)'
                          : 'Nível Juvenil / Avançado (13+ anos)'}
                      </div>
                      <div className="text-white/70 text-[11px] leading-tight">
                        {playerAgeInput <= 9
                          ? 'Perguntas muito mais fáceis, diretas, com números pequenos e noções visuais.'
                          : playerAgeInput <= 12
                          ? 'Desafios equilibrados de medidas, tempo e trabalho em equipe.'
                          : 'Cálculos de proporções, porcentagem, técnica cênica e cidadania.'}
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleStartGame}
                  className="w-full bg-gradient-to-b from-[#ff8a8a] to-[#ff6b6b] hover:brightness-110 active:scale-98 text-white font-['Baloo_2',sans-serif] font-extrabold text-lg sm:text-xl py-3 px-6 rounded-xl border-3 border-[#292f36] shadow-[0_5px_0_#292f36] active:translate-y-1 active:shadow-none uppercase tracking-wider cursor-pointer transition-all"
                >
                  Iniciar Aventura
                </button>
              </>
            )}
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
              <div className="bg-[rgba(32,38,46,0.92)] backdrop-blur-md border-3 border-[#ffe66d] rounded-xl px-2 sm:px-2.5 py-1 sm:py-1.5 inline-flex items-center gap-1.5 sm:gap-2 font-['Baloo_2',sans-serif] shadow-lg">
                <NPCAvatar
                  profile={{
                    name: player.name,
                    gender: 'F',
                    skin: '#7c4a24',
                    shirt: '#18181b',
                    pants: '#18181b',
                    hair: '#1c1917',
                    hStyle: 3,
                    glasses: false
                  }}
                  size={26}
                  className="ring-1 ring-[#ffe66d] shrink-0"
                />
                <strong className="text-[#ffe66d] text-xs sm:text-base truncate max-w-[90px] sm:max-w-[130px]">{player.name}</strong>
                <span className="text-white/90 font-extrabold text-[10px] sm:text-xs bg-white/15 px-1.5 py-0.5 rounded border border-white/25">
                  {player.age}a
                </span>
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

              {/* Reset Game Button (Opens Confirmation Modal) */}
              <button
                onClick={() => setIsResetModalOpen(true)}
                title="Reiniciar aventura do início (requer confirmação)"
                className="bg-[rgba(32,38,46,0.92)] backdrop-blur-md border-3 border-red-400/70 hover:border-red-400 rounded-xl px-2 sm:px-2.5 h-8 sm:h-10 flex items-center justify-center text-[11px] sm:text-xs font-bold text-red-300 font-['Baloo_2',sans-serif] active:scale-95 transition-all cursor-pointer shadow-lg hover:bg-red-500/20 gap-1"
              >
                <span>🔄</span> <span className="hidden sm:inline">Reiniciar</span>
              </button>

              {/* Auto-save Status Indicator */}
              <div
                title="Progresso salvo automaticamente no navegador"
                className={`bg-[rgba(32,38,46,0.92)] backdrop-blur-md border-2 rounded-xl px-2 sm:px-2.5 h-8 sm:h-10 flex items-center justify-center text-[10px] sm:text-xs font-bold transition-all duration-300 gap-1 select-none ${
                  savePulse
                    ? 'border-[#4ecdc4] text-[#4ecdc4] bg-[#4ecdc4]/20 scale-105 shadow-[0_0_8px_#4ecdc4]'
                    : 'border-white/20 text-white/60'
                }`}
              >
                <span>💾</span>
                <span className="hidden md:inline">{savePulse ? 'Salvando...' : 'Salvo ✓'}</span>
              </div>
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

          {/* Welcome Back / Progress Restored Banner */}
          {resumeToast && (
            <div className="fixed top-14 sm:top-16 left-1/2 -translate-x-1/2 z-30 bg-gradient-to-r from-[#1f262e] to-[#15191e] border-2 border-[#4ecdc4] text-[#4ecdc4] px-4 py-2 rounded-full shadow-2xl font-['Baloo_2',sans-serif] font-bold text-xs sm:text-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-auto">
              <span>💾</span>
              <span className="text-white font-medium">{resumeToast}</span>
              <button
                onClick={() => setResumeToast(null)}
                className="ml-1 w-5 h-5 rounded-full hover:bg-white/10 text-white/70 flex items-center justify-center text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>
          )}

          {/* Reset Confirmation Modal */}
          <ResetConfirmModal
            isOpen={isResetModalOpen}
            onClose={() => setIsResetModalOpen(false)}
            onConfirm={handleConfirmReset}
            playerName={player.name}
            playerAge={player.age}
            score={player.score}
            completedCount={completedCount}
            totalSectors={Object.keys(questsData).length}
          />

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
                    {/* Animated High-Res NPC Avatar Portrait(s) */}
                    <div className="relative flex items-center -space-x-3.5 shrink-0">
                      {dialogNPCKey && npcLocations[dialogNPCKey]?.npcs.slice(0, 3).map((npc, idx) => (
                        <NPCAvatar
                          key={idx}
                          profile={npc}
                          size={54}
                          className="border-2 border-[#ffe66d] shadow-xl ring-2 ring-black/40 hover:scale-105 transition-transform"
                        />
                      ))}
                      {/* Mini Sector Badge Icon */}
                      <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#ff6b6b] to-[#ff8e8e] border-2 border-white flex items-center justify-center text-xs -ml-2.5 z-10 shadow-md">
                        {roomData.icon}
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-[#ffe66d] text-lg sm:text-xl font-['Baloo_2',sans-serif]">
                        {roomData.npcs.length > 2
                          ? `${roomData.npcs.slice(0, -1).join(", ")} e ${roomData.npcs[roomData.npcs.length - 1]}`
                          : roomData.npcs.join(" & ")}
                      </div>
                      <div className="text-xs sm:text-sm text-white/80 font-semibold flex items-center gap-2">
                        <span>{roomData.room}</span>
                        <span>•</span>
                        <span className="text-[#4ecdc4]">Equipe Educativa</span>
                      </div>
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
                    <div className="py-2 space-y-4">
                      {/* Spotlight Educators Gallery */}
                      <div className="bg-[#15191e] border-2 border-[#ffe66d]/40 rounded-2xl p-3.5 sm:p-4 shadow-inner">
                        <div className="text-xs font-black uppercase tracking-wider text-[#4ecdc4] mb-3 flex items-center gap-1.5">
                          <span>👥</span> Equipe de Educadores(as) do Setor:
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {dialogNPCKey && npcLocations[dialogNPCKey]?.npcs.map((npc, idx) => (
                            <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex items-center gap-3">
                              <NPCAvatar profile={npc} size={48} />
                              <div className="min-w-0">
                                <div className="font-['Baloo_2',sans-serif] font-bold text-sm text-[#ffe66d] truncate">
                                  {npc.name}
                                </div>
                                <div className="text-[11px] text-white/70 truncate">
                                  {npc.role || roomData.room}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Welcome Speech Bubble */}
                      <div className="bg-white/5 border border-white/15 rounded-2xl p-4 shadow-inner">
                        <p className="text-white/95 text-base sm:text-lg leading-relaxed italic">
                          "{roomData.intro}"
                        </p>
                      </div>
                    </div>
                  )}

                  {dialogStage === 'question' && currentQ && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[#ffe66d] font-bold text-sm sm:text-base">
                          Desafio Operacional {currentQIndex + 1}/5:
                        </span>
                        <span className="text-[11px] bg-white/10 text-white/90 px-2 py-0.5 rounded-full border border-white/20 font-bold flex items-center gap-1">
                          <span>{player.age <= 9 ? '🌱 Infantil' : player.age <= 12 ? '🌿 Intermediário' : '🌳 Juvenil'}</span>
                          <span className="text-[#ffe66d]">({player.age} anos)</span>
                        </span>
                      </div>

                      {/* Question with Teacher Bust */}
                      <div className="flex items-start gap-3 mb-4">
                        {dialogNPCKey && npcLocations[dialogNPCKey]?.npcs.length > 0 && (
                          <div className="hidden sm:flex flex-col items-center shrink-0">
                            <NPCAvatar
                              profile={npcLocations[dialogNPCKey].npcs[currentQIndex % npcLocations[dialogNPCKey].npcs.length]}
                              size={48}
                            />
                            <span className="text-[10px] text-[#ffe66d] font-bold mt-1 max-w-[65px] truncate text-center">
                              {npcLocations[dialogNPCKey].npcs[currentQIndex % npcLocations[dialogNPCKey].npcs.length].name}
                            </span>
                          </div>
                        )}
                        <div className="flex-1 bg-white/5 border border-white/15 rounded-2xl p-3.5 sm:p-4 text-white/95 font-medium text-base sm:text-lg leading-relaxed shadow-inner">
                          {currentQ.q}
                        </div>
                      </div>

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
                        <div className="space-y-2 sm:space-y-3">
                          <h3 className="text-[#4ecdc4] font-extrabold text-xl sm:text-2xl font-['Baloo_2',sans-serif] flex items-center gap-2">
                            <span>✨</span>
                            <span>Brilhante! É assim que se faz.</span>
                          </h3>
                          <div className="bg-[#1f262e] border-2 border-[#4ecdc4]/40 rounded-2xl p-3.5 sm:p-4 text-white/95 leading-relaxed text-sm sm:text-base font-medium shadow-md">
                            {feedbackExp}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3 sm:space-y-4">
                          <div className="flex items-center gap-2.5">
                            <span className="text-2xl sm:text-3xl">🤔</span>
                            <div>
                              <h3 className="text-[#ff8a8a] font-extrabold text-lg sm:text-xl font-['Baloo_2',sans-serif] leading-tight">
                                Quase lá! Não desanime.
                              </h3>
                              <p className="text-white/70 text-xs sm:text-sm font-medium">
                                Leia o raciocínio abaixo para refletir e tentar novamente:
                              </p>
                            </div>
                          </div>

                          {/* Reasoning Guide Box without giving away the direct answer */}
                          <div className="bg-[#1b222a] border-2 border-[#ffe66d]/40 rounded-2xl p-3.5 sm:p-4 shadow-inner">
                            <div className="flex items-center gap-2 text-[#ffe66d] font-bold text-xs sm:text-sm mb-1.5 font-['Baloo_2',sans-serif]">
                              <span>💡</span>
                              <span>Como raciocinar para resolver este desafio:</span>
                            </div>
                            <p className="text-white/95 leading-relaxed text-xs sm:text-sm font-medium">
                              {feedbackExp}
                            </p>
                          </div>

                          <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 flex items-center gap-2 text-white/80 text-xs font-medium">
                            <span>🎯</span>
                            <span>A alternativa correta continua oculta para você exercitar sua autonomia e conquistar este selo!</span>
                          </div>
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
                      <div className="inline-flex items-center gap-2 bg-[#4ecdc4]/20 border border-[#4ecdc4]/40 rounded-xl px-4 py-2 text-xs sm:text-sm text-[#4ecdc4] font-bold">
                        <span>🎲</span>
                        <span>O gerador preparou novos desafios e perguntas variadas para você jogar novamente!</span>
                      </div>
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
                      onClick={handlePlayAgainWithNewQuestions}
                      className="bg-gradient-to-b from-[#ffe66d] to-[#fca311] text-[#292f36] font-extrabold font-['Baloo_2',sans-serif] py-2.5 px-5 sm:py-3 sm:px-7 rounded-xl border-2 border-[#292f36] shadow-md hover:brightness-110 cursor-pointer flex items-center gap-2"
                    >
                      <span>🔄</span>
                      <span>Jogar Novamente com Novas Perguntas</span>
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
