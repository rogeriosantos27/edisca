import { NPCProfile } from '../types';

export function drawCharacter(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  profile: NPCProfile,
  isHero = false,
  animTime = Date.now(),
  facing: 'down' | 'up' | 'left' | 'right' = 'down',
  isMoving = false
) {
  const {
    gender = 'F',
    skin = '#ffdbac',
    shirt = '#3b82f6',
    pants = '#1e3a8a',
    hair = '#1c1917',
    hStyle = 1,
    glasses = false,
    badge
  } = profile;

  ctx.save();

  // Walk cycle calculations
  const legOffset = isMoving ? Math.sin(animTime / 80) * 4 : 0;
  const armOffset = isMoving ? Math.sin(animTime / 80) * 3 : 0;
  const bodyBob = isMoving ? Math.abs(Math.sin(animTime / 80)) * 1.5 : 0;

  const drawY = y - bodyBob;

  // 1. Ground Shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
  ctx.beginPath();
  ctx.ellipse(x + 12, y + 37, 11, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.lineWidth = 1.5;
  ctx.strokeStyle = '#18181b';

  // Handle Left facing by mirroring Right facing
  if (facing === 'left') {
    ctx.translate(x * 2 + 24, 0);
    ctx.scale(-1, 1);
  }

  if (isHero) {
    // Hero character (Bailarino EDISCA Outfit)
    if (facing === 'right') {
      // Side profile
      ctx.fillStyle = '#18181b';
      // Legs
      ctx.fillRect(x + 8 + legOffset, drawY + 26, 4, 10); ctx.strokeRect(x + 8 + legOffset, drawY + 26, 4, 10);
      ctx.fillRect(x + 12 - legOffset, drawY + 26, 4, 10); ctx.strokeRect(x + 12 - legOffset, drawY + 26, 4, 10);
      // Shoes
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(x + 8 + legOffset, drawY + 34, 6, 4);
      ctx.fillRect(x + 12 - legOffset, drawY + 34, 6, 4);
      // Torso
      ctx.fillStyle = '#18181b';
      ctx.fillRect(x + 7, drawY + 14, 10, 13); ctx.strokeRect(x + 7, drawY + 14, 10, 13);
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(x + 11, drawY + 15, 2, 11);
      // Arm
      ctx.fillStyle = skin;
      ctx.fillRect(x + 10 - armOffset, drawY + 15, 4, 11); ctx.strokeRect(x + 10 - armOffset, drawY + 15, 4, 11);
    } else {
      // Front (down) or Back (up)
      ctx.fillStyle = '#18181b';
      // Legs
      ctx.fillRect(x + 6, drawY + 26 + legOffset, 4, 10 - legOffset);
      ctx.strokeRect(x + 6, drawY + 26 + legOffset, 4, 10 - legOffset);
      ctx.fillRect(x + 14, drawY + 26 - legOffset, 4, 10 + legOffset);
      ctx.strokeRect(x + 14, drawY + 26 - legOffset, 4, 10 + legOffset);
      // Shoes
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(x + 5, drawY + 34, 6, 4);
      ctx.fillRect(x + 13, drawY + 34, 6, 4);
      // Shirt / Top
      ctx.fillStyle = '#18181b';
      ctx.fillRect(x + 5, drawY + 14, 14, 13);
      ctx.strokeRect(x + 5, drawY + 14, 14, 13);
      // Accent lines on hero outfit
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(x + 11, drawY + 15, 2, 11);
      // Arms
      ctx.fillStyle = skin;
      ctx.fillRect(x + 1, drawY + 15 - armOffset, 4, 11); ctx.strokeRect(x + 1, drawY + 15 - armOffset, 4, 11);
      ctx.fillRect(x + 19, drawY + 15 + armOffset, 4, 11); ctx.strokeRect(x + 19, drawY + 15 + armOffset, 4, 11);
    }
  } else {
    // NPC Clothing
    if (gender === 'F') {
      // Female Outfit
      ctx.fillStyle = pants;
      ctx.fillRect(x + 6, drawY + 26 + legOffset, 4, 10); ctx.strokeRect(x + 6, drawY + 26 + legOffset, 4, 10);
      ctx.fillRect(x + 14, drawY + 26 - legOffset, 4, 10); ctx.strokeRect(x + 14, drawY + 26 - legOffset, 4, 10);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(x + 5, drawY + 34, 5, 4); ctx.fillRect(x + 14, drawY + 34, 5, 4);
      ctx.fillStyle = shirt;
      ctx.fillRect(x + 5, drawY + 14, 14, 13); ctx.strokeRect(x + 5, drawY + 14, 14, 13);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(x + 5, drawY + 25, 14, 2);
      ctx.fillStyle = skin;
      ctx.beginPath(); ctx.arc(x + 12, drawY + 14, 3, 0, Math.PI); ctx.fill();
      ctx.fillStyle = shirt;
      ctx.fillRect(x + 2, drawY + 14, 3, 5); ctx.fillRect(x + 19, drawY + 14, 3, 5);
      ctx.fillStyle = skin;
      ctx.fillRect(x + 2, drawY + 19 - armOffset, 3, 7); ctx.strokeRect(x + 2, drawY + 19 - armOffset, 3, 7);
      ctx.fillRect(x + 19, drawY + 19 + armOffset, 3, 7); ctx.strokeRect(x + 19, drawY + 19 + armOffset, 3, 7);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
      ctx.fillRect(x + 6, drawY + 15, 4, 2);
    } else {
      // Male Outfit
      ctx.fillStyle = pants;
      ctx.fillRect(x + 5, drawY + 25 + legOffset, 5, 11); ctx.strokeRect(x + 5, drawY + 25 + legOffset, 5, 11);
      ctx.fillRect(x + 14, drawY + 25 - legOffset, 5, 11); ctx.strokeRect(x + 14, drawY + 25 - legOffset, 5, 11);
      ctx.fillStyle = '#1c1917';
      ctx.fillRect(x + 4, drawY + 34, 6, 4); ctx.fillRect(x + 14, drawY + 34, 6, 4);
      ctx.fillStyle = shirt;
      ctx.fillRect(x + 5, drawY + 13, 14, 13); ctx.strokeRect(x + 5, drawY + 13, 14, 13);
      ctx.fillStyle = skin;
      ctx.beginPath(); ctx.moveTo(x + 10, drawY + 13); ctx.lineTo(x + 12, drawY + 17); ctx.lineTo(x + 14, drawY + 13); ctx.fill();
      ctx.fillStyle = shirt;
      ctx.fillRect(x + 1, drawY + 13, 4, 6); ctx.fillRect(x + 19, drawY + 13, 4, 6);
      ctx.fillStyle = skin;
      ctx.fillRect(x + 1, drawY + 19 - armOffset, 4, 7); ctx.strokeRect(x + 1, drawY + 19 - armOffset, 4, 7);
      ctx.fillRect(x + 19, drawY + 19 + armOffset, 4, 7); ctx.strokeRect(x + 19, drawY + 19 + armOffset, 4, 7);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.fillRect(x + 6, drawY + 14, 12, 2);
    }

    // Badges & Accessories
    if (badge === 'apron') {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x + 6, drawY + 15, 12, 12);
      ctx.strokeStyle = '#cbd5e1';
      ctx.strokeRect(x + 6, drawY + 15, 12, 12);
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(x + 8, drawY + 21, 8, 5);
    } else if (badge === 'stethoscope') {
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(x + 12, drawY + 15, 5, 0, Math.PI); ctx.stroke();
      ctx.fillStyle = '#94a3b8';
      ctx.beginPath(); ctx.arc(x + 12, drawY + 21, 2, 0, Math.PI * 2); ctx.fill();
    } else if (badge === 'id_card') {
      ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x + 10, drawY + 13); ctx.lineTo(x + 12, drawY + 18); ctx.lineTo(x + 14, drawY + 13); ctx.stroke();
      ctx.fillStyle = '#ffffff'; ctx.fillRect(x + 10, drawY + 18, 4, 5); ctx.strokeRect(x + 10, drawY + 18, 4, 5);
      ctx.fillStyle = '#3b82f6'; ctx.fillRect(x + 11, drawY + 19, 2, 2);
    } else if (badge === 'pen') {
      ctx.fillStyle = '#94a3b8'; ctx.fillRect(x + 7, drawY + 16, 2, 5);
    } else if (badge === 'paint_smock') {
      ctx.fillStyle = '#f43f5e'; ctx.beginPath(); ctx.arc(x + 8, drawY + 17, 1.5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#3b82f6'; ctx.beginPath(); ctx.arc(x + 15, drawY + 20, 1.5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#eab308'; ctx.beginPath(); ctx.arc(x + 11, drawY + 23, 1.5, 0, Math.PI * 2); ctx.fill();
    } else if (badge === 'drama_mask') {
      ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.arc(x + 8, drawY + 17, 2, 0, Math.PI * 2); ctx.fill();
    } else if (badge === 'headphones') {
      ctx.strokeStyle = '#0284c7'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(x + 12, drawY + 12, 7, Math.PI * 0.2, Math.PI * 0.8); ctx.stroke();
    }
  }

  // 2. Head & Neck
  ctx.fillStyle = skin;
  ctx.fillRect(x + 6, drawY + 2, 12, 11);
  ctx.strokeStyle = '#18181b';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(x + 6, drawY + 2, 12, 11);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.fillRect(x + 7, drawY + 3, 3, 3);

  // Face Expression (only when facing down / front or side)
  if (facing !== 'up') {
    const isBlinking = ((animTime + x * 37 + y * 19) % 3500) < 140;

    if (facing === 'right') {
      // Profile face
      if (!isBlinking) {
        ctx.fillStyle = '#1c1917';
        ctx.fillRect(x + 13, drawY + 6, 2, 3);
        ctx.fillStyle = '#ffffff'; ctx.fillRect(x + 13, drawY + 6, 1, 1);
      }
      ctx.strokeStyle = gender === 'F' ? '#be123c' : '#78350f'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(x + 14, drawY + 9, 1.8, 0, Math.PI * 0.6); ctx.stroke();
      if (glasses) {
        ctx.strokeStyle = '#334155'; ctx.lineWidth = 1;
        ctx.strokeRect(x + 12, drawY + 5, 4, 4);
      }
    } else {
      // Front face
      if (isBlinking) {
        ctx.strokeStyle = '#18181b'; ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x + 8, drawY + 7); ctx.lineTo(x + 10, drawY + 7);
        ctx.moveTo(x + 14, drawY + 7); ctx.lineTo(x + 16, drawY + 7);
        ctx.stroke();
      } else {
        ctx.fillStyle = '#1c1917';
        ctx.fillRect(x + 8, drawY + 6, 2, 3);
        ctx.fillRect(x + 14, drawY + 6, 2, 3);

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x + 8, drawY + 6, 1, 1);
        ctx.fillRect(x + 14, drawY + 6, 1, 1);

        ctx.fillStyle = hair;
        if (gender === 'F') {
          ctx.fillRect(x + 7, drawY + 5, 3, 1);
          ctx.fillRect(x + 14, drawY + 5, 3, 1);
          ctx.fillStyle = 'rgba(244, 114, 182, 0.35)';
          ctx.beginPath(); ctx.arc(x + 7, drawY + 9, 1.8, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc(x + 17, drawY + 9, 1.8, 0, Math.PI * 2); ctx.fill();
        } else {
          ctx.fillRect(x + 7, drawY + 4, 3, 1);
          ctx.fillRect(x + 14, drawY + 4, 3, 1);
        }
      }

      ctx.strokeStyle = gender === 'F' ? '#be123c' : '#78350f'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(x + 12, drawY + 9, 2.2, 0.1, Math.PI - 0.1); ctx.stroke();

      if (glasses) {
        ctx.strokeStyle = '#334155'; ctx.lineWidth = 1;
        ctx.strokeRect(x + 7, drawY + 5, 4, 4);
        ctx.strokeRect(x + 13, drawY + 5, 4, 4);
        ctx.beginPath(); ctx.moveTo(x + 11, drawY + 7); ctx.lineTo(x + 13, drawY + 7); ctx.stroke();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.beginPath();
        ctx.moveTo(x + 8, drawY + 6); ctx.lineTo(x + 10, drawY + 8);
        ctx.moveTo(x + 14, drawY + 6); ctx.lineTo(x + 16, drawY + 8);
        ctx.stroke();
      }
    }
  }

  // 4. Hair Rendering
  ctx.fillStyle = hair;
  ctx.strokeStyle = '#18181b';
  ctx.lineWidth = 1.2;

  if (facing === 'up') {
    // Render back of hair fully
    ctx.fillRect(x + 4, drawY - 2, 16, 14);
    ctx.strokeRect(x + 4, drawY - 2, 16, 14);
  } else {
    if (hStyle === 1) {
      ctx.fillRect(x + 5, drawY - 1, 14, 4);
      ctx.fillRect(x + 5, drawY + 3, 2, 4); ctx.fillRect(x + 17, drawY + 3, 2, 4);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'; ctx.fillRect(x + 7, drawY, 6, 1);
    } else if (hStyle === 2) {
      ctx.fillRect(x + 4, drawY - 2, 16, 5);
      ctx.fillRect(x + 4, drawY + 3, 3, 11); ctx.fillRect(x + 17, drawY + 3, 3, 11);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'; ctx.fillRect(x + 6, drawY - 1, 8, 2);
    } else if (hStyle === 3) {
      ctx.fillRect(x + 5, drawY, 14, 4);
      ctx.fillRect(x + 5, drawY + 4, 2, 3); ctx.fillRect(x + 17, drawY + 4, 2, 3);
      ctx.beginPath(); ctx.arc(x + 12, drawY - 2, 4.5, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#ec4899'; ctx.fillRect(x + 10, drawY + 1, 4, 1.5);
    } else if (hStyle === 4) {
      ctx.beginPath();
      ctx.arc(x + 12, drawY + 2, 8.5, Math.PI, 0);
      ctx.arc(x + 4, drawY + 5, 3.5, 0, Math.PI * 2);
      ctx.arc(x + 20, drawY + 5, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)'; ctx.beginPath(); ctx.arc(x + 10, drawY, 3, 0, Math.PI * 2); ctx.fill();
    } else if (hStyle === 5) {
      ctx.fillRect(x + 4, drawY - 2, 16, 5);
      ctx.fillRect(x + 4, drawY + 3, 3, 14); ctx.fillRect(x + 17, drawY + 3, 3, 14);
      ctx.fillStyle = hair; ctx.fillRect(x + 6, drawY + 2, 12, 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'; ctx.fillRect(x + 6, drawY - 1, 8, 1);
    } else if (hStyle === 6) {
      ctx.fillRect(x + 5, drawY - 1, 14, 4);
      ctx.fillRect(x + 5, drawY + 3, 2, 4); ctx.fillRect(x + 17, drawY + 3, 2, 4);
      ctx.fillRect(x + 18, drawY + 1, 5, 9);
      ctx.fillStyle = '#3b82f6'; ctx.fillRect(x + 17, drawY, 2, 3);
    } else if (hStyle === 7) {
      ctx.beginPath(); ctx.arc(x + 12, drawY, 6, Math.PI, 0); ctx.fill();
      ctx.fillRect(x + 5, drawY + 1, 14, 3);
    } else if (hStyle === 8) {
      ctx.fillRect(x + 5, drawY - 1, 14, 4);
      ctx.fillRect(x + 5, drawY + 3, 2, 4); ctx.fillRect(x + 17, drawY + 3, 2, 4);
      ctx.fillStyle = hair; ctx.fillRect(x + 10, drawY + 10, 4, 1.5);
    } else if (hStyle === 9) {
      ctx.fillRect(x + 4, drawY - 2, 16, 5);
      ctx.fillRect(x + 4, drawY + 3, 3, 4); ctx.fillRect(x + 17, drawY + 3, 2, 3);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'; ctx.fillRect(x + 7, drawY - 1, 6, 1);
    }
  }

  ctx.restore();
}
