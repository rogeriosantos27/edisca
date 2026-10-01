import React, { useEffect, useRef } from 'react';
import { NPCProfile } from '../types';
import { drawCharacter } from '../utils/drawCharacter';

interface NPCAvatarProps {
  profile: NPCProfile;
  size?: number; // e.g. 52, 68, 80
  showName?: boolean;
  className?: string;
}

export const NPCAvatar: React.FC<NPCAvatarProps> = ({
  profile,
  size = 64,
  showName = false,
  className = ""
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();

      // Warm radial lighting background
      const grad = ctx.createRadialGradient(
        canvas.width / 2, canvas.height * 0.45, 4,
        canvas.width / 2, canvas.height * 0.5, canvas.width * 0.5
      );
      grad.addColorStop(0, 'rgba(255, 230, 109, 0.35)');
      grad.addColorStop(0.7, 'rgba(78, 205, 196, 0.2)');
      grad.addColorStop(1, 'rgba(21, 25, 30, 0.85)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Scaled character drawing centered in portrait frame
      // Standard character is 24w x 38h.
      // In avatar portrait mode, we want to zoom into the torso, face and head!
      const zoom = size / 26;
      const drawX = (canvas.width - 24 * zoom) / 2;
      const drawY = 3 * (size / 64);

      drawCharacter(
        ctx,
        drawX / zoom,
        drawY / zoom,
        profile,
        false,
        now,
        'down',
        false,
        zoom
      );

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [profile, size]);

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div
        className="relative rounded-full overflow-hidden border-2 sm:border-3 border-[#ffe66d] bg-[#1a2129] shadow-xl ring-2 ring-black/40 flex-shrink-0 group hover:scale-105 transition-transform"
        style={{ width: size, height: size }}
      >
        <canvas
          ref={canvasRef}
          width={size * 2}
          height={size * 2}
          style={{ width: size, height: size }}
          className="w-full h-full block"
        />
        {/* Glow overlay */}
        <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none" />
      </div>

      {showName && profile.name && (
        <span className="text-[11px] font-bold text-[#ffe66d] mt-1 text-center truncate max-w-[80px]">
          {profile.name}
        </span>
      )}
    </div>
  );
};
