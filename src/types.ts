export interface Question {
  q: string;
  opts: string[];
  ans: number;
  exp: string;
  hint?: string;
  difficulty?: 'facil' | 'medio' | 'avancado';
  minAge?: number;
  maxAge?: number;
}

export interface QuestRoom {
  room: string;
  npcs: string[];
  icon: string;
  intro: string;
  questions: Question[];
}

export interface NPCProfile {
  name?: string;
  role?: string;
  gender: 'M' | 'F';
  skin: string;
  shirt: string;
  pants: string;
  hair: string;
  hStyle: number; // 1-9
  glasses: boolean;
  badge?: 'id_card' | 'stethoscope' | 'apron' | 'paint_smock' | 'pen' | 'dance_ribbon' | 'drama_mask' | 'headphones';
  bottomType?: 'pants' | 'skirt';
}

export interface NPCLocation {
  x: number;
  y: number;
  npcs: NPCProfile[];
}

export interface QuestStateItem {
  currentQ: number;
  completed: boolean;
}

export type QuestState = Record<string, QuestStateItem>;

export interface Player {
  name: string;
  age: number;
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  score: number;
}
