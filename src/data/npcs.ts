import { NPCLocation } from '../types';

export const TILE = 40;

export const npcLocations: Record<string, NPCLocation> = {
  portaria: {
    x: 35 * TILE,
    y: 11 * TILE,
    npcs: [
      { name: "Prof. Junior", role: "Segurança & Recepção", gender: 'M', skin: "#8d5524", shirt: "#2563eb", pants: "#1e3a8a", hair: "#1c1917", hStyle: 7, glasses: true, badge: 'id_card' },
      { name: "Prof. Cris", role: "Acolhimento & Portaria", gender: 'M', skin: "#f1c27d", shirt: "#e11d48", pants: "#1e1b4b", hair: "#7c2d12", hStyle: 1, glasses: false, badge: 'id_card' }
    ]
  },
  secretaria: {
    x: 15 * TILE,
    y: 22 * TILE,
    npcs: [
      { name: "Profª Gesliane", role: "Secretaria Escolar & Matrículas", gender: 'F', skin: "#ffdbac", shirt: "#db2777", pants: "#1e293b", hair: "#7c2d12", hStyle: 2, glasses: true, badge: 'pen' }
    ]
  },
  diretoria: {
    x: 55 * TILE,
    y: 22 * TILE,
    npcs: [
      { name: "Profª Andrea", role: "Coordenação Pedagógica", gender: 'F', skin: "#e0ac69", shirt: "#059669", pants: "#064e3b", hair: "#1c1917", hStyle: 2, glasses: false, badge: 'id_card' },
      { name: "Profª Claudia", role: "Diretoria Geral", gender: 'F', skin: "#8d5524", shirt: "#dc2626", pants: "#1c1917", hair: "#4a3018", hStyle: 9, glasses: true, badge: 'id_card' },
      { name: "Dirª Dora", role: "Diretoria Executiva", gender: 'F', skin: "#ffdbac", shirt: "#2563eb", pants: "#1e3a8a", hair: "#d97706", hStyle: 3, glasses: false, badge: 'id_card' },
      { name: "Profª Amanda", role: "Gestão Institucional", gender: 'F', skin: "#f1c27d", shirt: "#db2777", pants: "#3f1212", hair: "#b55239", hStyle: 5, glasses: false, badge: 'id_card' }
    ]
  },
  cozinha: {
    x: 15 * TILE,
    y: 34 * TILE,
    npcs: [
      { name: "Profª Aurea", role: "Nutrição & Alimentação Saudável", gender: 'F', skin: "#c68642", shirt: "#facc15", pants: "#1c1917", hair: "#4a3018", hStyle: 3, glasses: false, badge: 'apron' },
      { name: "Prof. Galeno", role: "Chef da Cozinha Comunitária", gender: 'M', skin: "#e0ac69", shirt: "#eab308", pants: "#1e1b4b", hair: "#1c1917", hStyle: 1, glasses: false, badge: 'apron' }
    ]
  },
  reforco: {
    x: 55 * TILE,
    y: 34 * TILE,
    npcs: [
      { name: "Prof. Rogério", role: "Apoio Pedagógico & Letramento", gender: 'M', skin: "#f1c27d", shirt: "#4f46e5", pants: "#1e1b4b", hair: "#6b7280", hStyle: 8, glasses: true, badge: 'pen' },
      { name: "Profª Clara", role: "Língua Portuguesa & Leitura", gender: 'F', skin: "#ffdbac", shirt: "#0284c7", pants: "#1e293b", hair: "#b45309", hStyle: 2, glasses: false, badge: 'pen' },
      { name: "Profª Raquel", role: "Matemática & Raciocínio Lógico", gender: 'F', skin: "#8d5524", shirt: "#db2777", pants: "#4c0519", hair: "#1c1917", hStyle: 5, glasses: true, badge: 'pen' }
    ]
  },
  financeiro: {
    x: 15 * TILE,
    y: 46 * TILE,
    npcs: [
      { name: "Profª Clecia", role: "Planejamento Orçamentário", gender: 'F', skin: "#8d5524", shirt: "#eab308", pants: "#713f12", hair: "#1c1917", hStyle: 4, glasses: true, badge: 'id_card' },
      { name: "Profª Vanessa", role: "Gestão Financeira de Projetos", gender: 'F', skin: "#ffdbac", shirt: "#9333ea", pants: "#4c1d95", hair: "#b55239", hStyle: 2, glasses: false, badge: 'id_card' },
      { name: "Profª Flaviane", role: "Contabilidade & Auditoria", gender: 'F', skin: "#e0ac69", shirt: "#0d9488", pants: "#134e4a", hair: "#1c1917", hStyle: 9, glasses: true, badge: 'id_card' },
      { name: "Profª Cândida", role: "Recursos Humanos & Equipe", gender: 'F', skin: "#f1c27d", shirt: "#475569", pants: "#334155", hair: "#94a3b8", hStyle: 3, glasses: true, badge: 'id_card' }
    ]
  },
  artes: {
    x: 55 * TILE,
    y: 46 * TILE,
    npcs: [
      { name: "Profª Gislene", role: "Artes Visuais & Ateliê Criativo", gender: 'F', skin: "#ffdbac", shirt: "#9333ea", pants: "#4c1d95", hair: "#f59e0b", hStyle: 3, glasses: false, badge: 'paint_smock' }
    ]
  },
  danca: {
    x: 25 * TILE,
    y: 58 * TILE,
    npcs: [
      { name: "Prof. Anderson", role: "Dança Contemporânea", gender: 'M', skin: "#e0ac69", shirt: "#dc2626", pants: "#1c1917", hair: "#1c1917", hStyle: 7, glasses: false, badge: 'dance_ribbon' },
      { name: "Prof. Jessy", role: "Balé Clássico & Técnica", gender: 'M', skin: "#ffdbac", shirt: "#27272a", pants: "#52525b", hair: "#a8a29e", hStyle: 1, glasses: true, badge: 'dance_ribbon' },
      { name: "Prof. Vitor", role: "Coreografia & Ensaios", gender: 'M', skin: "#c68642", shirt: "#2563eb", pants: "#1e3a8a", hair: "#4a3018", hStyle: 1, glasses: false, badge: 'dance_ribbon' },
      { name: "Prof. Daniel", role: "Condicionamento & Ritmo", gender: 'M', skin: "#f1c27d", shirt: "#059669", pants: "#064e3b", hair: "#6b7280", hStyle: 1, glasses: true, badge: 'dance_ribbon' }
    ]
  },
  teatro: {
    x: 45 * TILE,
    y: 58 * TILE,
    npcs: [
      { name: "Profª Mayra", role: "Expressão Cênica & Palco", gender: 'F', skin: "#ffdbac", shirt: "#9333ea", pants: "#1e1b4b", hair: "#b55239", hStyle: 2, glasses: true, badge: 'drama_mask' },
      { name: "Profª Hariane", role: "Dramaturgia & Voz", gender: 'F', skin: "#e0ac69", shirt: "#db2777", pants: "#1c1917", hair: "#1c1917", hStyle: 9, glasses: false, badge: 'drama_mask' },
      { name: "Profª Adrielly", role: "Cenografia & Espaço", gender: 'F', skin: "#8d5524", shirt: "#0d9488", pants: "#134e4a", hair: "#4a3018", hStyle: 4, glasses: false, badge: 'drama_mask' },
      { name: "Profª Gabrielle", role: "Jogos Teatrais & Improviso", gender: 'F', skin: "#f1c27d", shirt: "#facc15", pants: "#1e1b4b", hair: "#eab308", hStyle: 5, glasses: true, badge: 'drama_mask' },
      { name: "Profª Beatriz", role: "Figurino & Caracterização", gender: 'F', skin: "#c68642", shirt: "#db2777", pants: "#831843", hair: "#312e81", hStyle: 4, glasses: false, badge: 'drama_mask' }
    ]
  },
  saude: {
    x: 10 * TILE,
    y: 58 * TILE,
    npcs: [
      { name: "Profª Lorena", role: "Enfermagem & Prevenção", gender: 'F', skin: "#c68642", shirt: "#0d9488", pants: "#134e4a", hair: "#4a3018", hStyle: 6, glasses: false, badge: 'stethoscope' },
      { name: "Profª Livia", role: "Fisioterapia & Saúde Postural", gender: 'F', skin: "#ffdbac", shirt: "#db2777", pants: "#4c0519", hair: "#eab308", hStyle: 5, glasses: true, badge: 'stethoscope' },
      { name: "Prof. Rubens", role: "Psicologia & Cuidado Emocional", gender: 'M', skin: "#e0ac69", shirt: "#0284c7", pants: "#075985", hair: "#1c1917", hStyle: 1, glasses: true, badge: 'stethoscope' },
      { name: "Prof. Gabriel", role: "Assistência Social & Famílias", gender: 'M', skin: "#f1c27d", shirt: "#0f766e", pants: "#115e59", hair: "#b55239", hStyle: 1, glasses: false, badge: 'stethoscope' }
    ]
  },
  biblioteca: {
    x: 60 * TILE,
    y: 58 * TILE,
    npcs: [
      { name: "Profª Neile", role: "Mediação de Leitura & Cultura", gender: 'F', skin: "#8d5524", shirt: "#64748b", pants: "#0f172a", hair: "#1c1917", hStyle: 3, glasses: true, badge: 'pen' },
      { name: "Profª Thafilla", role: "Pesquisa & Acervo Literário", gender: 'F', skin: "#ffdbac", shirt: "#db2777", pants: "#1e1b4b", hair: "#4a3018", hStyle: 5, glasses: false, badge: 'pen' }
    ]
  },
  jardim: {
    x: 35 * TILE,
    y: 60 * TILE,
    npcs: [
      { name: "Profª Fátima", role: "Educação Ambiental & Horta", gender: 'F', skin: "#f1c27d", shirt: "#65a30d", pants: "#3f6212", hair: "#4a3018", hStyle: 6, glasses: false, badge: 'id_card' },
      { name: "Prof. João", role: "Sustentabilidade & Paisagismo", gender: 'M', skin: "#e0ac69", shirt: "#334155", pants: "#0f172a", hair: "#1c1917", hStyle: 1, glasses: false, badge: 'id_card' },
      { name: "Prof. Igor", role: "Compostagem & Cuidado das Mudas", gender: 'M', skin: "#ffdbac", shirt: "#2563eb", pants: "#1e3a8a", hair: "#6b7280", hStyle: 1, glasses: true, badge: 'id_card' },
      { name: "Prof. Clemilson", role: "Cultivo da Flora Nativa Cearense", gender: 'M', skin: "#8d5524", shirt: "#059669", pants: "#064e3b", hair: "#1c1917", hStyle: 8, glasses: false, badge: 'id_card' }
    ]
  },
  ti: {
    x: 25 * TILE,
    y: 20 * TILE,
    npcs: [
      { name: "Prof. Vinicius", role: "Inclusão Digital & Informática", gender: 'M', skin: "#ffdbac", shirt: "#0284c7", pants: "#1e3a8a", hair: "#1c1917", hStyle: 1, glasses: true, badge: 'headphones' }
    ]
  },
  brecho: {
    x: 44 * TILE,
    y: 20 * TILE,
    npcs: [
      { name: "Profª Marina", role: "Brechó Solidário & Moda Circular", gender: 'F', skin: "#f1c27d", shirt: "#db2777", pants: "#1c1917", hair: "#b55239", hStyle: 2, glasses: false, badge: 'id_card' },
      { name: "Prof. Pedro", role: "Curadoria de Peças Sustentáveis", gender: 'M', skin: "#ffdbac", shirt: "#2563eb", pants: "#1e3a8a", hair: "#1c1917", hStyle: 1, glasses: true, badge: 'id_card' }
    ]
  },
  comunicacao: {
    x: 25 * TILE,
    y: 32 * TILE,
    npcs: [
      { name: "Profª Isabelle", role: "Fotojornalismo & Mídias da EDISCA", gender: 'F', skin: "#e0ac69", shirt: "#0d9488", pants: "#134e4a", hair: "#eab308", hStyle: 5, glasses: true, badge: 'id_card' }
    ]
  },
  refeitorio: {
    x: 44 * TILE,
    y: 32 * TILE,
    npcs: [
      { name: "Profª Jaqueline", role: "Alimentação Saudável & Acolhida", gender: 'F', skin: "#ffdbac", shirt: "#facc15", pants: "#1e1b4b", hair: "#4a3018", hStyle: 6, glasses: false, badge: 'apron' }
    ]
  }
};
