import { NPCLocation } from '../types';

export const TILE = 40;

export const npcLocations: Record<string, NPCLocation> = {
  portaria: {
    x: 35 * TILE,
    y: 11 * TILE,
    npcs: [
      { name: "Prof. Junior", gender: 'M', skin: "#8d5524", shirt: "#3b82f6", pants: "#1e3a8a", hair: "#1c1917", hStyle: 7, glasses: true, badge: 'id_card' },
      { name: "Prof. Cris", gender: 'M', skin: "#f1c27d", shirt: "#ec4899", pants: "#1e1b4b", hair: "#7c2d12", hStyle: 1, glasses: false, badge: 'id_card' }
    ]
  },
  secretaria: {
    x: 15 * TILE,
    y: 22 * TILE,
    npcs: [
      { name: "Profª Gesliane", gender: 'F', skin: "#ffdbac", shirt: "#f472b6", pants: "#1e293b", hair: "#7c2d12", hStyle: 2, glasses: true, badge: 'pen' }
    ]
  },
  diretoria: {
    x: 55 * TILE,
    y: 22 * TILE,
    npcs: [
      { name: "Profª Andrea", gender: 'F', skin: "#e0ac69", shirt: "#10b981", pants: "#064e3b", hair: "#1c1917", hStyle: 2, glasses: false, badge: 'id_card' },
      { name: "Profª Claudia", gender: 'F', skin: "#8d5524", shirt: "#ef4444", pants: "#1c1917", hair: "#4a3018", hStyle: 9, glasses: true, badge: 'id_card' },
      { name: "Dirª Dora", gender: 'F', skin: "#ffdbac", shirt: "#3b82f6", pants: "#1e3a8a", hair: "#f59e0b", hStyle: 3, glasses: false, badge: 'id_card' },
      { name: "Profª Amanda", gender: 'F', skin: "#f1c27d", shirt: "#ec4899", pants: "#3f1212", hair: "#b55239", hStyle: 5, glasses: false, badge: 'id_card' }
    ]
  },
  cozinha: {
    x: 15 * TILE,
    y: 34 * TILE,
    npcs: [
      { name: "Profª Aurea", gender: 'F', skin: "#c68642", shirt: "#fef08a", pants: "#1c1917", hair: "#4a3018", hStyle: 3, glasses: false, badge: 'apron' },
      { name: "Profª Daiane", gender: 'F', skin: "#ffdbac", shirt: "#fbbf24", pants: "#1e1b4b", hair: "#f59e0b", hStyle: 6, glasses: false, badge: 'apron' }
    ]
  },
  reforco: {
    x: 55 * TILE,
    y: 34 * TILE,
    npcs: [
      { name: "Prof. Rogério", gender: 'M', skin: "#f1c27d", shirt: "#6366f1", pants: "#1e1b4b", hair: "#6b7280", hStyle: 8, glasses: true, badge: 'pen' },
      { name: "Profª Clara", gender: 'F', skin: "#ffdbac", shirt: "#0ea5e9", pants: "#1e293b", hair: "#b45309", hStyle: 2, glasses: false, badge: 'pen' },
      { name: "Profª Raquel", gender: 'F', skin: "#8d5524", shirt: "#ec4899", pants: "#4c0519", hair: "#1c1917", hStyle: 5, glasses: true, badge: 'pen' }
    ]
  },
  financeiro: {
    x: 15 * TILE,
    y: 46 * TILE,
    npcs: [
      { name: "Profª Clecia", gender: 'F', skin: "#8d5524", shirt: "#facc15", pants: "#713f12", hair: "#1c1917", hStyle: 4, glasses: true, badge: 'id_card' },
      { name: "Profª Vanessa", gender: 'F', skin: "#ffdbac", shirt: "#a855f7", pants: "#4c1d95", hair: "#b55239", hStyle: 2, glasses: false, badge: 'id_card' },
      { name: "Profª Flaviane", gender: 'F', skin: "#e0ac69", shirt: "#2dd4bf", pants: "#134e4a", hair: "#1c1917", hStyle: 9, glasses: true, badge: 'id_card' },
      { name: "Profª Cândida", gender: 'F', skin: "#f1c27d", shirt: "#64748b", pants: "#334155", hair: "#94a3b8", hStyle: 3, glasses: true, badge: 'id_card' }
    ]
  },
  artes: {
    x: 55 * TILE,
    y: 46 * TILE,
    npcs: [
      { name: "Profª Gislene", gender: 'F', skin: "#ffdbac", shirt: "#a855f7", pants: "#4c1d95", hair: "#fcd34d", hStyle: 3, glasses: false, badge: 'paint_smock' }
    ]
  },
  danca: {
    x: 25 * TILE,
    y: 58 * TILE,
    npcs: [
      { name: "Prof. Anderson", gender: 'M', skin: "#e0ac69", shirt: "#ef4444", pants: "#1c1917", hair: "#1c1917", hStyle: 7, glasses: false, badge: 'dance_ribbon' },
      { name: "Prof. Jessy", gender: 'M', skin: "#ffdbac", shirt: "#27272a", pants: "#52525b", hair: "#a8a29e", hStyle: 1, glasses: true, badge: 'dance_ribbon' },
      { name: "Prof. Vitor", gender: 'M', skin: "#c68642", shirt: "#3b82f6", pants: "#1e3a8a", hair: "#4a3018", hStyle: 1, glasses: false, badge: 'dance_ribbon' },
      { name: "Prof. Daniel", gender: 'M', skin: "#f1c27d", shirt: "#10b981", pants: "#064e3b", hair: "#6b7280", hStyle: 1, glasses: true, badge: 'dance_ribbon' }
    ]
  },
  teatro: {
    x: 45 * TILE,
    y: 58 * TILE,
    npcs: [
      { name: "Profª Mayra", gender: 'F', skin: "#ffdbac", shirt: "#a855f7", pants: "#1e1b4b", hair: "#b55239", hStyle: 2, glasses: true, badge: 'drama_mask' },
      { name: "Profª Hariane", gender: 'F', skin: "#e0ac69", shirt: "#f472b6", pants: "#1c1917", hair: "#1c1917", hStyle: 9, glasses: false, badge: 'drama_mask' },
      { name: "Profª Adrielly", gender: 'F', skin: "#8d5524", shirt: "#2dd4bf", pants: "#134e4a", hair: "#4a3018", hStyle: 4, glasses: false, badge: 'drama_mask' },
      { name: "Profª Gabrielle", gender: 'F', skin: "#f1c27d", shirt: "#fef08a", pants: "#1e1b4b", hair: "#fcd34d", hStyle: 5, glasses: true, badge: 'drama_mask' },
      { name: "Profª Beatriz", gender: 'F', skin: "#c68642", shirt: "#ec4899", pants: "#831843", hair: "#312e81", hStyle: 4, glasses: false, badge: 'drama_mask' }
    ]
  },
  saude: {
    x: 10 * TILE,
    y: 58 * TILE,
    npcs: [
      { name: "Profª Lorena", gender: 'F', skin: "#c68642", shirt: "#2dd4bf", pants: "#134e4a", hair: "#4a3018", hStyle: 6, glasses: false, badge: 'stethoscope' },
      { name: "Profª Livia", gender: 'F', skin: "#ffdbac", shirt: "#ec4899", pants: "#4c0519", hair: "#fcd34d", hStyle: 5, glasses: true, badge: 'stethoscope' },
      { name: "Prof. Rubens", gender: 'M', skin: "#e0ac69", shirt: "#0284c7", pants: "#075985", hair: "#1c1917", hStyle: 1, glasses: true, badge: 'stethoscope' },
      { name: "Prof. Henrique", gender: 'M', skin: "#f1c27d", shirt: "#0d9488", pants: "#115e59", hair: "#b55239", hStyle: 1, glasses: false, badge: 'stethoscope' }
    ]
  },
  biblioteca: {
    x: 60 * TILE,
    y: 58 * TILE,
    npcs: [
      { name: "Profª Neile", gender: 'F', skin: "#8d5524", shirt: "#94a3b8", pants: "#0f172a", hair: "#1c1917", hStyle: 3, glasses: true, badge: 'pen' },
      { name: "Profª Thafilla", gender: 'F', skin: "#ffdbac", shirt: "#ec4899", pants: "#1e1b4b", hair: "#4a3018", hStyle: 5, glasses: false, badge: 'pen' }
    ]
  },
  jardim: {
    x: 35 * TILE,
    y: 60 * TILE,
    npcs: [
      { name: "Profª Fátima", gender: 'F', skin: "#f1c27d", shirt: "#84cc16", pants: "#3f6212", hair: "#4a3018", hStyle: 6, glasses: false, badge: 'id_card' },
      { name: "Prof. João", gender: 'M', skin: "#e0ac69", shirt: "#1e293b", pants: "#0f172a", hair: "#1c1917", hStyle: 1, glasses: false, badge: 'id_card' },
      { name: "Prof. Igor", gender: 'M', skin: "#ffdbac", shirt: "#3b82f6", pants: "#1e3a8a", hair: "#6b7280", hStyle: 1, glasses: true, badge: 'id_card' },
      { name: "Prof. Clemilson", gender: 'M', skin: "#8d5524", shirt: "#059669", pants: "#064e3b", hair: "#1c1917", hStyle: 8, glasses: false, badge: 'id_card' }
    ]
  },
  ti: {
    x: 25 * TILE,
    y: 20 * TILE,
    npcs: [
      { name: "Prof. Vinicius", gender: 'M', skin: "#ffdbac", shirt: "#0284c7", pants: "#1e3a8a", hair: "#1c1917", hStyle: 1, glasses: true, badge: 'headphones' }
    ]
  },
  brecho: {
    x: 44 * TILE,
    y: 20 * TILE,
    npcs: [
      { name: "Profª Marina", gender: 'F', skin: "#f1c27d", shirt: "#ec4899", pants: "#1c1917", hair: "#b55239", hStyle: 2, glasses: false, badge: 'id_card' },
      { name: "Prof. Pedro", gender: 'M', skin: "#ffdbac", shirt: "#3b82f6", pants: "#1e3a8a", hair: "#1c1917", hStyle: 1, glasses: true, badge: 'id_card' }
    ]
  },
  comunicacao: {
    x: 25 * TILE,
    y: 32 * TILE,
    npcs: [
      { name: "Profª Isabelle", gender: 'F', skin: "#e0ac69", shirt: "#2dd4bf", pants: "#134e4a", hair: "#fcd34d", hStyle: 5, glasses: true, badge: 'id_card' }
    ]
  },
  refeitorio: {
    x: 44 * TILE,
    y: 32 * TILE,
    npcs: [
      { name: "Profª Jaqueline", gender: 'F', skin: "#ffdbac", shirt: "#fef08a", pants: "#1e1b4b", hair: "#4a3018", hStyle: 6, glasses: false, badge: 'apron' }
    ]
  }
};
