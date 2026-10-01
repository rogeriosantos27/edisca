import React from 'react';

interface ResetConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  playerName: string;
  playerAge?: number;
  score: number;
  completedCount: number;
  totalSectors: number;
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  playerName,
  playerAge,
  score,
  completedCount,
  totalSectors
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#1f262e] border-4 border-[#ff6b6b] rounded-3xl p-5 sm:p-7 max-w-md w-full shadow-2xl text-white animate-in fade-in zoom-in-95 duration-200">
        <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-2xl flex items-center justify-center border-2 border-red-500 text-3xl">
          ⚠️
        </div>

        <h3 className="font-['Baloo_2',sans-serif] font-extrabold text-2xl sm:text-3xl text-[#ff8a8a] text-center mb-2">
          Reiniciar Progresso?
        </h3>

        <p className="text-sm sm:text-base text-white/90 text-center mb-5 leading-relaxed">
          Tem certeza de que deseja recomeçar a aventura da EDISCA do início?
        </p>

        {/* Current Progress Summary Box */}
        <div className="bg-[#15191e] border-2 border-white/10 rounded-2xl p-4 mb-6 space-y-2 text-sm font-semibold">
          <div className="flex justify-between items-center text-white/70">
            <span>Educando(a):</span>
            <span className="text-[#ffe66d] font-bold">
              {playerName} {playerAge ? `(${playerAge} anos)` : ''}
            </span>
          </div>
          <div className="flex justify-between items-center text-white/70">
            <span>Pontuação Atual:</span>
            <span className="text-[#ffe66d] font-bold">⭐ {score} pontos</span>
          </div>
          <div className="flex justify-between items-center text-white/70">
            <span>Selos Conquistados:</span>
            <span className="text-[#4ecdc4] font-bold">{completedCount} de {totalSectors}</span>
          </div>
          <p className="text-xs text-red-400 font-bold pt-2 border-t border-white/10 text-center">
            Esta ação apagará os selos atuais e gerará um conjunto com perguntas inéditas e variadas em todos os setores!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="flex-1 order-2 sm:order-1 bg-white/10 hover:bg-white/20 active:scale-95 text-white font-['Baloo_2',sans-serif] font-bold py-3 px-4 rounded-xl border-2 border-white/30 cursor-pointer transition-all text-center"
          >
            Manter Progresso
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 order-1 sm:order-2 bg-gradient-to-r from-red-600 to-rose-600 hover:brightness-110 active:scale-95 text-white font-['Baloo_2',sans-serif] font-extrabold py-3 px-4 rounded-xl border-2 border-red-400 shadow-lg cursor-pointer transition-all text-center"
          >
            Sim, Reiniciar
          </button>
        </div>
      </div>
    </div>
  );
};
