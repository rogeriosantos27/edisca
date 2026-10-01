import { NPCProfile } from '../types';

/**
 * Utility functions for color shading (highlights & shadow folds)
 */
function adjustColor(hex: string, amount: number): string {
  if (!hex || !hex.startsWith('#')) return hex;
  let clean = hex.replace('#', '');
  if (clean.length === 3) {
    clean = clean.split('').map(c => c + c).join('');
  }
  const num = parseInt(clean, 16);
  let r = (num >> 16) + amount;
  let g = ((num >> 8) & 0x00ff) + amount;
  let b = (num & 0x0000ff) + amount;
  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export function drawCharacter(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  profile: NPCProfile,
  isHero = false,
  animTime = Date.now(),
  facing: 'down' | 'up' | 'left' | 'right' = 'down',
  isMoving = false,
  scale = 1
) {
  const {
    gender = 'F',
    skin = '#7c4a24',
    shirt = '#3b82f6',
    pants = '#1e3a8a',
    hair = '#1c1917',
    hStyle = 1,
    glasses = false,
    badge
  } = profile;

  ctx.save();
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  if (scale !== 1) {
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.translate(-x, -y);
  }

  // Walk cycle & gentle idle breathing calculations
  const legOffset = isMoving ? Math.sin(animTime / 80) * 4.5 : 0;
  const armOffset = isMoving ? Math.sin(animTime / 80) * 3.5 : 0;
  const bodyBob = isMoving ? Math.abs(Math.sin(animTime / 80)) * 1.8 : Math.sin(animTime / 380) * 0.8;

  const drawY = y - bodyBob;

  // Color shading palette for realistic depth and rich lighting
  const skinShadow = adjustColor(skin, -28);
  const shirtShadow = adjustColor(shirt, -36);
  const shirtHighlight = adjustColor(shirt, 38);
  const pantsShadow = adjustColor(pants, -34);
  const pantsHighlight = adjustColor(pants, 26);
  const hairShadow = adjustColor(hair, -36);
  const hairHighlight = adjustColor(hair, 46);

  // 1. Soft Dual-Layer Ground Shadow with depth
  ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
  ctx.beginPath();
  ctx.ellipse(x + 12, y + 37, 13, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
  ctx.beginPath();
  ctx.ellipse(x + 12, y + 36.5, 9.5, 3.5, 0, 0, Math.PI * 2);
  ctx.fill();

  const outlineColor = '#18181b';
  ctx.lineWidth = 1.3;
  ctx.strokeStyle = outlineColor;

  // Handle Left facing by mirroring Right facing
  if (facing === 'left') {
    ctx.translate(x * 2 + 24, 0);
    ctx.scale(-1, 1);
  }

  // -------------------------------------------------------------
  // HERO CHARACTER (Bailarino EDISCA Uniform)
  // -------------------------------------------------------------
  if (isHero) {
    if (facing === 'right') {
      // Side Profile Legs
      ctx.fillStyle = '#18181b';
      ctx.fillRect(x + 8 + legOffset, drawY + 25, 4.5, 10);
      ctx.strokeRect(x + 8 + legOffset, drawY + 25, 4.5, 10);
      ctx.fillRect(x + 12 - legOffset, drawY + 25, 4.5, 10);
      ctx.strokeRect(x + 12 - legOffset, drawY + 25, 4.5, 10);

      // Shoes with sole
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(x + 8 + legOffset, drawY + 34, 6.5, 3.5);
      ctx.fillRect(x + 12 - legOffset, drawY + 34, 6.5, 3.5);
      ctx.fillStyle = '#ca8a04';
      ctx.fillRect(x + 8 + legOffset, drawY + 36.5, 6.5, 1.2);
      ctx.fillRect(x + 12 - legOffset, drawY + 36.5, 6.5, 1.2);

      // Torso
      ctx.fillStyle = '#27272a';
      ctx.fillRect(x + 7, drawY + 13, 10, 13);
      ctx.strokeRect(x + 7, drawY + 13, 10, 13);
      // Gold Dance Sash Accent
      ctx.fillStyle = '#facc15';
      ctx.fillRect(x + 10, drawY + 13, 2.5, 13);

      // Arm
      ctx.fillStyle = skin;
      ctx.fillRect(x + 10 - armOffset, drawY + 14, 4, 11);
      ctx.strokeRect(x + 10 - armOffset, drawY + 14, 4, 11);
    } else {
      // Front (down) / Back (up)
      // Legs
      ctx.fillStyle = '#18181b';
      ctx.fillRect(x + 5.5, drawY + 25 + legOffset, 4.5, 10);
      ctx.strokeRect(x + 5.5, drawY + 25 + legOffset, 4.5, 10);
      ctx.fillRect(x + 14, drawY + 25 - legOffset, 4.5, 10);
      ctx.strokeRect(x + 14, drawY + 25 - legOffset, 4.5, 10);

      // Dance Shoes (Ballet Flats with ribbon strap)
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(x + 4.5, drawY + 34, 6, 3.5);
      ctx.fillRect(x + 13.5, drawY + 34, 6, 3.5);
      ctx.fillStyle = '#ca8a04';
      ctx.fillRect(x + 4.5, drawY + 36.5, 6, 1.2);
      ctx.fillRect(x + 13.5, drawY + 36.5, 6, 1.2);
      // Shoe ribbon cross
      ctx.strokeStyle = '#ca8a04';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(x + 5, drawY + 34); ctx.lineTo(x + 9, drawY + 32);
      ctx.moveTo(x + 14, drawY + 34); ctx.lineTo(x + 18, drawY + 32);
      ctx.stroke();

      // Top / Leotard
      ctx.fillStyle = '#18181b';
      ctx.fillRect(x + 5, drawY + 13, 14, 13);
      ctx.strokeRect(x + 5, drawY + 13, 14, 13);

      // Vibrant EDISCA Gradient Sash
      ctx.fillStyle = '#facc15';
      ctx.fillRect(x + 10.5, drawY + 13, 3, 13);
      ctx.fillStyle = '#fb923c';
      ctx.fillRect(x + 11.5, drawY + 13, 1, 13);

      // Belt with subtle silver buckle
      ctx.fillStyle = '#3f3f46';
      ctx.fillRect(x + 5, drawY + 24, 14, 2);
      ctx.fillStyle = '#e4e4e7';
      ctx.fillRect(x + 10.5, drawY + 23.5, 3, 3);

      // Arms with hands
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = outlineColor;
      ctx.fillStyle = skin;
      ctx.fillRect(x + 1.5, drawY + 14 - armOffset, 3.5, 11);
      ctx.strokeRect(x + 1.5, drawY + 14 - armOffset, 3.5, 11);
      ctx.fillRect(x + 19, drawY + 14 + armOffset, 3.5, 11);
      ctx.strokeRect(x + 19, drawY + 14 + armOffset, 3.5, 11);

      // Hand fingertips
      ctx.beginPath(); ctx.arc(x + 3.2, drawY + 25 - armOffset, 1.5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(x + 20.7, drawY + 25 + armOffset, 1.5, 0, Math.PI * 2); ctx.fill();
    }
  } else {
    // -------------------------------------------------------------
    // HIGH-DETAIL NPC CLOTHING & ACCESSORIES
    // -------------------------------------------------------------
    if (gender === 'F') {
      // Female Outfit: Tailored Blouse, Pleated Skirt/Pants, Cuffs
      // 1. Pants / Skirt
      ctx.fillStyle = pants;
      ctx.fillRect(x + 5.5, drawY + 25 + legOffset, 4.5, 10);
      ctx.strokeRect(x + 5.5, drawY + 25 + legOffset, 4.5, 10);
      ctx.fillRect(x + 14, drawY + 25 - legOffset, 4.5, 10);
      ctx.strokeRect(x + 14, drawY + 25 - legOffset, 4.5, 10);

      // Inner trouser shadow
      ctx.fillStyle = pantsShadow;
      ctx.fillRect(x + 8.5, drawY + 25 + legOffset, 1.5, 10);
      ctx.fillRect(x + 14, drawY + 25 - legOffset, 1.5, 10);

      // Shoes (Elegant Flats with glossy toe cap)
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(x + 4.5, drawY + 34, 5.5, 3.5);
      ctx.fillRect(x + 14, drawY + 34, 5.5, 3.5);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(x + 5, drawY + 34.5, 2, 1);
      ctx.fillRect(x + 14.5, drawY + 34.5, 2, 1);

      // Shirt / Blouse with depth
      ctx.fillStyle = shirt;
      ctx.fillRect(x + 5, drawY + 13, 14, 13);
      ctx.strokeRect(x + 5, drawY + 13, 14, 13);

      // Blouse shadow & highlight
      ctx.fillStyle = shirtShadow;
      ctx.fillRect(x + 5, drawY + 23, 14, 3);
      ctx.fillStyle = shirtHighlight;
      ctx.fillRect(x + 6, drawY + 14, 12, 1.5);

      // Belt
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(x + 5, drawY + 24, 14, 2);
      ctx.fillStyle = '#facc15';
      ctx.fillRect(x + 11, drawY + 23.5, 2.5, 2.8);

      // Curved collar / neckline
      ctx.fillStyle = skin;
      ctx.beginPath();
      ctx.arc(x + 12, drawY + 13.5, 3.5, 0, Math.PI);
      ctx.fill();

      // Shirt sleeves
      ctx.fillStyle = shirt;
      ctx.fillRect(x + 1.5, drawY + 13, 3.5, 5);
      ctx.fillRect(x + 19, drawY + 13, 3.5, 5);
      ctx.fillStyle = shirtShadow;
      ctx.fillRect(x + 1.5, drawY + 17, 3.5, 1);
      ctx.fillRect(x + 19, drawY + 17, 3.5, 1);

      // Forearms & Hands
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = outlineColor;
      ctx.fillStyle = skin;
      ctx.fillRect(x + 2, drawY + 18 - armOffset, 3, 7);
      ctx.strokeRect(x + 2, drawY + 18 - armOffset, 3, 7);
      ctx.fillRect(x + 19, drawY + 18 + armOffset, 3, 7);
      ctx.strokeRect(x + 19, drawY + 18 + armOffset, 3, 7);

      // Fingertips
      ctx.beginPath(); ctx.arc(x + 3.5, drawY + 25 - armOffset, 1.4, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(x + 20.5, drawY + 25 + armOffset, 1.4, 0, Math.PI * 2); ctx.fill();
    } else {
      // Male Outfit: Tailored Shirt with collar buttons, Creased Trousers, Oxford Shoes
      ctx.fillStyle = pants;
      ctx.fillRect(x + 5, drawY + 25 + legOffset, 5, 10.5);
      ctx.strokeRect(x + 5, drawY + 25 + legOffset, 5, 10.5);
      ctx.fillRect(x + 14, drawY + 25 - legOffset, 5, 10.5);
      ctx.strokeRect(x + 14, drawY + 25 - legOffset, 5, 10.5);

      // Trouser crease line
      ctx.strokeStyle = pantsHighlight;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(x + 7.5, drawY + 26 + legOffset); ctx.lineTo(x + 7.5, drawY + 34 + legOffset);
      ctx.moveTo(x + 16.5, drawY + 26 - legOffset); ctx.lineTo(x + 16.5, drawY + 34 - legOffset);
      ctx.stroke();

      // Oxford Shoes with dark sole
      ctx.fillStyle = '#1c1917';
      ctx.fillRect(x + 4, drawY + 34, 6, 3.5);
      ctx.fillRect(x + 14, drawY + 34, 6, 3.5);
      ctx.fillStyle = '#44403c';
      ctx.fillRect(x + 4, drawY + 34, 3, 1.5);
      ctx.fillRect(x + 14, drawY + 34, 3, 1.5);

      // Shirt
      ctx.fillStyle = shirt;
      ctx.fillRect(x + 5, drawY + 13, 14, 13);
      ctx.strokeRect(x + 5, drawY + 13, 14, 13);

      // Shirt folds & collar
      ctx.fillStyle = shirtShadow;
      ctx.fillRect(x + 5, drawY + 23, 14, 3);
      ctx.fillStyle = shirtHighlight;
      ctx.fillRect(x + 6, drawY + 14, 12, 1.5);

      // V-Collar
      ctx.fillStyle = skin;
      ctx.beginPath();
      ctx.moveTo(x + 10, drawY + 13);
      ctx.lineTo(x + 12, drawY + 17);
      ctx.lineTo(x + 14, drawY + 13);
      ctx.fill();

      // Collar flaps
      ctx.fillStyle = shirtHighlight;
      ctx.beginPath();
      ctx.moveTo(x + 9, drawY + 13); ctx.lineTo(x + 11, drawY + 16); ctx.lineTo(x + 10, drawY + 13);
      ctx.moveTo(x + 15, drawY + 13); ctx.lineTo(x + 13, drawY + 16); ctx.lineTo(x + 14, drawY + 13);
      ctx.fill();

      // Belt
      ctx.fillStyle = '#292524';
      ctx.fillRect(x + 5, drawY + 24, 14, 2);
      ctx.fillStyle = '#d4af37';
      ctx.fillRect(x + 10.5, drawY + 23.5, 3, 2.8);

      // Sleeves
      ctx.fillStyle = shirt;
      ctx.fillRect(x + 1, drawY + 13, 4, 6);
      ctx.fillRect(x + 19, drawY + 13, 4, 6);
      ctx.fillStyle = shirtShadow;
      ctx.fillRect(x + 1, drawY + 18, 4, 1);
      ctx.fillRect(x + 19, drawY + 18, 4, 1);

      // Forearms & Hands
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = outlineColor;
      ctx.fillStyle = skin;
      ctx.fillRect(x + 1.5, drawY + 19 - armOffset, 3.5, 6.5);
      ctx.strokeRect(x + 1.5, drawY + 19 - armOffset, 3.5, 6.5);
      ctx.fillRect(x + 19, drawY + 19 + armOffset, 3.5, 6.5);
      ctx.strokeRect(x + 19, drawY + 19 + armOffset, 3.5, 6.5);

      // Fingertips
      ctx.beginPath(); ctx.arc(x + 3.2, drawY + 25.5 - armOffset, 1.5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(x + 20.7, drawY + 25.5 + armOffset, 1.5, 0, Math.PI * 2); ctx.fill();
    }

    // -------------------------------------------------------------
    // SECTOR-SPECIFIC DETAILED PROPS & BADGES
    // -------------------------------------------------------------
    if (badge === 'apron') {
      // Crisp Kitchen Apron with pocket, straps and utensils
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(x + 6, drawY + 14, 12, 13);
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1;
      ctx.strokeRect(x + 6, drawY + 14, 12, 13);

      // Neck strap
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(x + 8, drawY + 14); ctx.lineTo(x + 10, drawY + 12);
      ctx.moveTo(x + 16, drawY + 14); ctx.lineTo(x + 14, drawY + 12);
      ctx.stroke();

      // Apron Front Pocket
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(x + 8, drawY + 20, 8, 5);
      ctx.strokeStyle = '#94a3b8';
      ctx.strokeRect(x + 8, drawY + 20, 8, 5);

      // Wooden Spoon peeking out
      ctx.fillStyle = '#d97706';
      ctx.fillRect(x + 13, drawY + 17, 1.8, 4);
      ctx.beginPath(); ctx.arc(x + 13.9, drawY + 16.5, 1.8, 0, Math.PI * 2); ctx.fill();
    } else if (badge === 'stethoscope') {
      // Realistic Doctor Stethoscope with silver bell
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(x + 12, drawY + 14.5, 4.5, 0.1, Math.PI - 0.1);
      ctx.stroke();

      ctx.strokeStyle = '#0284c7';
      ctx.beginPath();
      ctx.moveTo(x + 12, drawY + 19); ctx.lineTo(x + 12, drawY + 21);
      ctx.stroke();

      // Chrome Bell
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath(); ctx.arc(x + 12, drawY + 22, 2.2, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 0.8;
      ctx.stroke();
    } else if (badge === 'id_card') {
      // EDISCA Coral/Teal Institutional Lanyard with Badge
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(x + 9, drawY + 13);
      ctx.lineTo(x + 12, drawY + 18);
      ctx.lineTo(x + 15, drawY + 13);
      ctx.stroke();

      // Card
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x + 10, drawY + 18, 4.5, 5.5);
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 0.8;
      ctx.strokeRect(x + 10, drawY + 18, 4.5, 5.5);

      // Card photo and EDISCA gold star
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(x + 11, drawY + 19, 2.5, 2);
      ctx.fillStyle = '#facc15';
      ctx.fillRect(x + 11, drawY + 21.8, 2.5, 1);
    } else if (badge === 'pen') {
      // Silver clip fountain pen in breast pocket
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(x + 7, drawY + 15.5, 2.2, 5);
      ctx.fillStyle = '#d97706';
      ctx.fillRect(x + 7, drawY + 14.5, 2.2, 1.2);
      ctx.fillStyle = '#64748b';
      ctx.fillRect(x + 8.5, drawY + 16, 0.8, 3.5);
    } else if (badge === 'paint_smock') {
      // Art Studio Colorful Splatters
      ctx.fillStyle = '#f43f5e'; ctx.beginPath(); ctx.arc(x + 8, drawY + 16.5, 1.8, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#06b6d4'; ctx.beginPath(); ctx.arc(x + 15, drawY + 19.5, 1.8, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#eab308'; ctx.beginPath(); ctx.arc(x + 11, drawY + 22.5, 1.8, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#a855f7'; ctx.beginPath(); ctx.arc(x + 7.5, drawY + 22, 1.2, 0, Math.PI * 2); ctx.fill();

      // Paintbrush peeking
      ctx.fillStyle = '#b45309';
      ctx.fillRect(x + 15, drawY + 14, 1.5, 5);
      ctx.fillStyle = '#06b6d4';
      ctx.beginPath(); ctx.arc(x + 15.7, drawY + 13.5, 1.5, 0, Math.PI * 2); ctx.fill();
    } else if (badge === 'drama_mask') {
      // Golden Comedy/Tragedy Drama Lapel Pin
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(x + 8, drawY + 16.5, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ca8a04';
      ctx.lineWidth = 0.7;
      ctx.stroke();

      // Eye dots and smile
      ctx.fillStyle = '#78350f';
      ctx.fillRect(x + 7, drawY + 15.5, 0.8, 0.8);
      ctx.fillRect(x + 8.5, drawY + 15.5, 0.8, 0.8);
      ctx.beginPath(); ctx.arc(x + 8, drawY + 17.2, 1, 0, Math.PI * 2); ctx.stroke();
    } else if (badge === 'dance_ribbon') {
      // Elegant Silken Dance Sash
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(x + 6, drawY + 14);
      ctx.lineTo(x + 17, drawY + 24);
      ctx.stroke();

      ctx.fillStyle = '#ffe4e6';
      ctx.beginPath(); ctx.arc(x + 16.5, drawY + 23.5, 1.6, 0, Math.PI * 2); ctx.fill();
    } else if (badge === 'headphones') {
      // Sleek Tech Studio Headphones around neck
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.arc(x + 12, drawY + 12, 6.5, Math.PI * 0.15, Math.PI * 0.85);
      ctx.stroke();

      // Padded Ear Cushions
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(x + 4.5, drawY + 12, 3, 4.5);
      ctx.fillRect(x + 16.5, drawY + 12, 3, 4.5);
    }
  }

  // -------------------------------------------------------------
  // 2. HEAD & FACE DETAILS
  // -------------------------------------------------------------
  ctx.fillStyle = skin;
  ctx.strokeStyle = outlineColor;
  ctx.lineWidth = 1.3;

  // Rounded Head Contour
  ctx.beginPath();
  ctx.roundRect(x + 6, drawY + 2, 12, 11, 3.5);
  ctx.fill();
  ctx.stroke();

  // Ears
  ctx.fillStyle = skin;
  ctx.beginPath(); ctx.arc(x + 5.5, drawY + 7.5, 1.8, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.arc(x + 18.5, drawY + 7.5, 1.8, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

  // Soft Rosy Cheeks
  ctx.fillStyle = 'rgba(251, 113, 133, 0.45)';
  ctx.beginPath(); ctx.arc(x + 8, drawY + 9.5, 1.8, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(x + 16, drawY + 9.5, 1.8, 0, Math.PI * 2); ctx.fill();

  // Face Expression (only when facing front or side)
  if (facing !== 'up') {
    const isBlinking = ((animTime + x * 37 + y * 19) % 3600) < 140;

    if (facing === 'right') {
      // Profile Face
      if (!isBlinking) {
        // Iris & Pupil
        ctx.fillStyle = '#1c1917';
        ctx.fillRect(x + 13.5, drawY + 5.5, 2.5, 3.5);
        // Eye Sparkle
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x + 13.5, drawY + 5.5, 1.2, 1.2);
        // Eyebrow
        ctx.strokeStyle = hairShadow;
        ctx.lineWidth = 0.9;
        ctx.beginPath(); ctx.moveTo(x + 13, drawY + 4.5); ctx.lineTo(x + 16, drawY + 4.5); ctx.stroke();
      } else {
        ctx.strokeStyle = '#18181b'; ctx.lineWidth = 1.3;
        ctx.beginPath(); ctx.moveTo(x + 13, drawY + 7); ctx.lineTo(x + 16, drawY + 7); ctx.stroke();
      }

      // Smile
      ctx.strokeStyle = gender === 'F' ? '#e11d48' : '#78350f';
      ctx.lineWidth = 1.1;
      ctx.beginPath(); ctx.arc(x + 14.5, drawY + 9.5, 1.8, 0.1, Math.PI * 0.7); ctx.stroke();

      if (glasses) {
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1.2;
        ctx.strokeRect(x + 12, drawY + 4.5, 4.5, 4.5);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.lineWidth = 0.8;
        ctx.beginPath(); ctx.moveTo(x + 12.5, drawY + 5.5); ctx.lineTo(x + 14.5, drawY + 7.5); ctx.stroke();
      }
    } else {
      // Front Face
      if (isBlinking) {
        ctx.strokeStyle = '#18181b';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(x + 7.5, drawY + 7); ctx.lineTo(x + 10.5, drawY + 7);
        ctx.moveTo(x + 13.5, drawY + 7); ctx.lineTo(x + 16.5, drawY + 7);
        ctx.stroke();
      } else {
        // Detailed Shiny Eyes with Iris & Dual Sparkle
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x + 7.5, drawY + 5.5, 3.2, 3.5);
        ctx.fillRect(x + 13.3, drawY + 5.5, 3.2, 3.5);

        // Iris
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(x + 8, drawY + 5.5, 2.5, 3.5);
        ctx.fillRect(x + 13.5, drawY + 5.5, 2.5, 3.5);

        // Main Sparkle
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x + 8, drawY + 5.5, 1.2, 1.2);
        ctx.fillRect(x + 13.5, drawY + 5.5, 1.2, 1.2);
        // Secondary Sparkle
        ctx.fillRect(x + 9.3, drawY + 7.3, 0.8, 0.8);
        ctx.fillRect(x + 14.8, drawY + 7.3, 0.8, 0.8);

        // Eyebrows
        ctx.strokeStyle = hairShadow;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x + 7.2, drawY + 4.5); ctx.lineTo(x + 10.8, drawY + 4.2);
        ctx.moveTo(x + 13.2, drawY + 4.2); ctx.lineTo(x + 16.8, drawY + 4.5);
        ctx.stroke();
      }

      // Friendly Warm Smile
      ctx.strokeStyle = gender === 'F' ? '#e11d48' : '#78350f';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(x + 12, drawY + 9.5, 2.4, 0.15, Math.PI - 0.15);
      ctx.stroke();

      // Glasses with Glare Lines
      if (glasses) {
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 1.3;
        ctx.strokeRect(x + 7, drawY + 4.8, 4.2, 4.2);
        ctx.strokeRect(x + 12.8, drawY + 4.8, 4.2, 4.2);
        // Bridge
        ctx.beginPath(); ctx.moveTo(x + 11.2, drawY + 6.8); ctx.lineTo(x + 12.8, drawY + 6.8); ctx.stroke();

        // White Glare diagonal lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.lineWidth = 0.9;
        ctx.beginPath();
        ctx.moveTo(x + 7.5, drawY + 5.8); ctx.lineTo(x + 9.5, drawY + 7.8);
        ctx.moveTo(x + 13.5, drawY + 5.8); ctx.lineTo(x + 15.5, drawY + 7.8);
        ctx.stroke();
      }
    }
  }

  // -------------------------------------------------------------
  // 3. HIGH-FIDELITY HAIR STYLING & TEXTURES
  // -------------------------------------------------------------
  ctx.fillStyle = hair;
  ctx.strokeStyle = outlineColor;
  ctx.lineWidth = 1.3;

  if (facing === 'up') {
    // Back of Hair
    ctx.beginPath();
    ctx.roundRect(x + 4, drawY - 2.5, 16, 15, [6, 6, 2, 2]);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = hairHighlight;
    ctx.fillRect(x + 6, drawY - 1.5, 12, 2);
  } else {
    // 9 Distinctive, Beautiful Hair Styles
    if (hStyle === 1) {
      // Modern short crop with textured crown and glossy shine crest
      ctx.beginPath();
      ctx.roundRect(x + 5, drawY - 2, 14, 5.5, [4, 4, 1, 1]);
      ctx.fill();
      ctx.stroke();
      // Sideburns
      ctx.fillRect(x + 4.5, drawY + 2.5, 2, 4.5);
      ctx.fillRect(x + 17.5, drawY + 2.5, 2, 4.5);
      // Highlights
      ctx.fillStyle = hairHighlight;
      ctx.fillRect(x + 7, drawY - 1, 7, 1.5);
    } else if (hStyle === 2) {
      // Long flowing wavy locks with shoulder curls
      ctx.beginPath();
      ctx.roundRect(x + 4, drawY - 2.5, 16, 6, [5, 5, 0, 0]);
      ctx.fill();
      ctx.stroke();
      // Flowing side locks
      ctx.fillRect(x + 3.5, drawY + 3, 3.5, 13);
      ctx.strokeRect(x + 3.5, drawY + 3, 3.5, 13);
      ctx.fillRect(x + 17, drawY + 3, 3.5, 13);
      ctx.strokeRect(x + 17, drawY + 3, 3.5, 13);
      // Volume shine curves
      ctx.fillStyle = hairHighlight;
      ctx.fillRect(x + 6, drawY - 1.5, 9, 2);
      ctx.fillRect(x + 4.2, drawY + 5, 1.8, 6);
      ctx.fillRect(x + 17.8, drawY + 5, 1.8, 6);
    } else if (hStyle === 3) {
      // Elegant Ballerina Top Bun with Pink Hairband and tendrils
      ctx.beginPath();
      ctx.roundRect(x + 5, drawY - 1, 14, 4.5, [4, 4, 1, 1]);
      ctx.fill();
      ctx.stroke();
      // Big Rounded Top Bun
      ctx.beginPath();
      ctx.arc(x + 12, drawY - 3.5, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // Hairband Ribbon
      ctx.fillStyle = '#ec4899';
      ctx.fillRect(x + 9.5, drawY - 0.5, 5, 2);
      ctx.fillStyle = hairHighlight;
      ctx.beginPath(); ctx.arc(x + 10.5, drawY - 4.5, 2, 0, Math.PI * 2); ctx.fill();
    } else if (hStyle === 4) {
      // Bouncy Afro Puffs / Rounded Volume with gold hairclip
      ctx.beginPath();
      ctx.arc(x + 12, drawY + 2, 8.5, Math.PI, 0);
      ctx.arc(x + 3.5, drawY + 4, 4.5, 0, Math.PI * 2);
      ctx.arc(x + 20.5, drawY + 4, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // Highlights & Hair Pin
      ctx.fillStyle = hairHighlight;
      ctx.beginPath(); ctx.arc(x + 9, drawY - 0.5, 3.2, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#facc15';
      ctx.fillRect(x + 16, drawY + 1, 2.5, 2.5);
    } else if (hStyle === 5) {
      // Sleek Braided Ponytail with woven texture
      ctx.beginPath();
      ctx.roundRect(x + 4, drawY - 2.5, 16, 5.5, [5, 5, 1, 1]);
      ctx.fill();
      ctx.stroke();
      // Long Braided Tail
      ctx.fillRect(x + 17, drawY + 2, 4, 15);
      ctx.strokeRect(x + 17, drawY + 2, 4, 15);
      // Braid chevron highlights
      ctx.strokeStyle = hairHighlight;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let by = drawY + 5; by < drawY + 16; by += 3) {
        ctx.moveTo(x + 17.5, by); ctx.lineTo(x + 19, by + 1.5); ctx.lineTo(x + 20.5, by);
      }
      ctx.stroke();
      // Scrunchie
      ctx.fillStyle = '#06b6d4';
      ctx.fillRect(x + 16.5, drawY + 2, 4.5, 2.5);
    } else if (hStyle === 6) {
      // Side-swept Layered Hair with flower accessory
      ctx.beginPath();
      ctx.roundRect(x + 4.5, drawY - 2, 15, 5, [4, 4, 0, 0]);
      ctx.fill();
      ctx.stroke();
      ctx.fillRect(x + 17.5, drawY + 1, 4.5, 11);
      ctx.strokeRect(x + 17.5, drawY + 1, 4.5, 11);
      // Flower Clip
      ctx.fillStyle = '#fb7185';
      ctx.beginPath(); ctx.arc(x + 17, drawY + 2.5, 2.5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#fef08a';
      ctx.beginPath(); ctx.arc(x + 17, drawY + 2.5, 1, 0, Math.PI * 2); ctx.fill();
    } else if (hStyle === 7) {
      // Clean Fade Undercut with textured hairline
      ctx.beginPath();
      ctx.arc(x + 12, drawY - 0.5, 6.5, Math.PI, 0);
      ctx.fill();
      ctx.stroke();
      ctx.fillRect(x + 5.5, drawY + 1, 13, 3);
      // Fade gradient sides
      ctx.fillStyle = hairHighlight;
      ctx.fillRect(x + 7.5, drawY - 1, 6.5, 1.5);
    } else if (hStyle === 8) {
      // Modern Layered Volume with separated tufts
      ctx.beginPath();
      ctx.roundRect(x + 4.5, drawY - 2.5, 15, 5.5, [5, 5, 0, 0]);
      ctx.fill();
      ctx.stroke();
      // Fringe Tufts
      ctx.beginPath();
      ctx.moveTo(x + 7, drawY + 3); ctx.lineTo(x + 8.5, drawY + 5.5); ctx.lineTo(x + 10, drawY + 3);
      ctx.moveTo(x + 11, drawY + 3); ctx.lineTo(x + 12.5, drawY + 6); ctx.lineTo(x + 14, drawY + 3);
      ctx.fill();
      ctx.fillStyle = hairHighlight;
      ctx.fillRect(x + 7, drawY - 1.2, 8, 1.8);
    } else if (hStyle === 9) {
      // Chic Classic Bob with curved side frame
      ctx.beginPath();
      ctx.roundRect(x + 4, drawY - 2.5, 16, 6, [5, 5, 0, 0]);
      ctx.fill();
      ctx.stroke();
      ctx.fillRect(x + 3.8, drawY + 3, 3.5, 6);
      ctx.strokeRect(x + 3.8, drawY + 3, 3.5, 6);
      ctx.fillRect(x + 16.7, drawY + 3, 3.5, 6);
      ctx.strokeRect(x + 16.7, drawY + 3, 3.5, 6);
      ctx.fillStyle = hairHighlight;
      ctx.fillRect(x + 6, drawY - 1.5, 8.5, 2);
    }
  }

  ctx.restore();
}
