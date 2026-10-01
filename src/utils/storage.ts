import { Player, QuestState, Question } from '../types';
import { TILE } from '../data/npcs';

export const STORAGE_KEY = 'edisca_game_save_v1';

export interface SavedGame {
  version: number;
  player: Player;
  questState: QuestState;
  roomQuestions: Record<string, Question[]>;
  gameStarted: boolean;
  savedAt: number;
}

export function loadGameSave(): SavedGame | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as SavedGame;
    if (!data || typeof data !== 'object') return null;
    if (!data.player || typeof data.player.name !== 'string') return null;
    if (typeof data.player.age !== 'number' || isNaN(data.player.age)) {
      data.player.age = 10;
    }
    if (!data.questState || typeof data.questState !== 'object') return null;
    return data;
  } catch (err) {
    console.warn('Erro ao carregar save game:', err);
    return null;
  }
}

export function saveGame(
  player: Player,
  questState: QuestState,
  roomQuestions: Record<string, Question[]>,
  gameStarted: boolean
): boolean {
  try {
    const data: SavedGame = {
      version: 1,
      player,
      questState,
      roomQuestions,
      gameStarted,
      savedAt: Date.now()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (err) {
    console.warn('Erro ao salvar progresso:', err);
    return false;
  }
}

export function clearGameSave(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn('Erro ao limpar save game:', err);
  }
}

export function getCompletedQuestsCount(questState: QuestState): number {
  return Object.values(questState).filter(q => q?.completed).length;
}

export function hasActiveProgress(save: SavedGame | null): boolean {
  if (!save) return false;
  const completed = getCompletedQuestsCount(save.questState);
  if (completed > 0) return true;
  if (save.player.score > 0) return true;
  if (save.gameStarted) return true;
  const initialX = 35 * TILE;
  const initialY = 15 * TILE;
  if (Math.hypot(save.player.x - initialX, save.player.y - initialY) > 50) return true;
  return false;
}
