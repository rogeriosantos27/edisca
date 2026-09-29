import React from 'react';
import { questsData } from '../data/quests';
import { QuestState } from '../types';

interface SectorsModalProps {
  isOpen: boolean;
  onClose: () => void;
  questState: QuestState;
  onSelectSector?: (sectorKey: string) => void;
}

export const SectorsModal: React.FC<SectorsModalProps> = ({
  isOpen,
  onClose,
  questState,
  onSelectSector
}) => {
  if (!isOpen) return null;

  const totalSectors = Object.keys(questsData).length;
  const completedCount = (Object.values(questState) as { completed?: boolean }[]).filter(s => s?.completed).length;
  const progressPercent = Math.round((completedCount / totalSectors) * 100);

  return (
    <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div className="bg-[#1f262e] border-4 border-[#ffe66d] rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#292f36] to-[#15191e] p-4 sm:p-5 border-b-3 border-[#ffe66d] flex items-center justify-between">
          <div>
            <h2 className="font-['Baloo_2',sans-serif] font-extrabold text-2xl sm:text-3xl text-[#ffe66d] flex items-center gap-2">
              <span>🏛️</span> Mapa de Setores EDISCA
            </h2>
            <p className="text-xs sm:text-sm text-white/80 font-medium">
              Conheça os 16 setores e acompanhe os seus selos conquistados!
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold flex items-center justify-center text-xl transition-all cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Progress Bar */}
        <div className="bg-[#15191e] px-4 py-3 border-b border-white/10 flex items-center gap-4">
          <div className="flex-1 bg-white/10 h-3.5 rounded-full overflow-hidden p-0.5 border border-white/20">
            <div
              className="bg-gradient-to-r from-[#ffe66d] to-[#4ecdc4] h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="font-['Baloo_2',sans-serif] font-extrabold text-sm sm:text-base text-[#ffe66d] whitespace-nowrap">
            {completedCount} / {totalSectors} Selos ({progressPercent}%)
          </span>
        </div>

        {/* Grid of Sectors */}
        <div className="p-4 sm:p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {Object.keys(questsData).map((key) => {
            const sector = questsData[key];
            const isDone = questState[key]?.completed;
            const currentQ = questState[key]?.currentQ || 0;

            return (
              <div
                key={key}
                onClick={() => {
                  if (onSelectSector) {
                    onSelectSector(key);
                    onClose();
                  }
                }}
                className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between relative group ${
                  isDone
                    ? 'bg-gradient-to-b from-[#1a382e] to-[#122820] border-[#4ecdc4] shadow-[0_0_12px_rgba(78,205,196,0.2)]'
                    : 'bg-[#28303a] border-white/15 hover:border-[#ffe66d]/60 hover:bg-[#323c48]'
                }`}
              >
                {/* Status Badge */}
                <div className="flex items-start justify-between mb-2">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl border border-white/20 shadow-inner">
                    {sector.icon}
                  </div>
                  <div className={`px-2 py-0.5 rounded-full text-xs font-bold font-['Baloo_2',sans-serif] ${
                    isDone
                      ? 'bg-[#4ecdc4] text-[#122820]'
                      : currentQ > 0
                        ? 'bg-[#ffe66d] text-[#292f36]'
                        : 'bg-white/10 text-white/60'
                  }`}>
                    {isDone ? '✓ Concluído' : currentQ > 0 ? `${currentQ}/5 Desafios` : 'Pendente'}
                  </div>
                </div>

                <div>
                  <h3 className="font-['Baloo_2',sans-serif] font-extrabold text-base sm:text-lg text-white group-hover:text-[#ffe66d] transition-colors leading-tight">
                    {sector.room}
                  </h3>
                  <p className="text-xs text-white/70 font-semibold mt-1 line-clamp-1">
                    👥 {sector.npcs.join(", ")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="bg-[#15191e] p-3.5 sm:p-4 text-center border-t border-white/10">
          <button
            onClick={onClose}
            className="bg-gradient-to-b from-[#ff8a8a] to-[#ff6b6b] hover:brightness-110 active:scale-95 text-white font-['Baloo_2',sans-serif] font-extrabold py-2 px-6 rounded-xl border-2 border-[#292f36] shadow-md transition-all cursor-pointer"
          >
            Fechar Mapa
          </button>
        </div>
      </div>
    </div>
  );
};
