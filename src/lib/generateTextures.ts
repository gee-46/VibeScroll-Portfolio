import * as THREE from 'three';

export interface CardTextureOptions {
  name: string;
  role: string;
  photoUrl?: string;
  idLabel?: string;
  dept?: string;
}

const CARD_WIDTH = 1024;
const CARD_HEIGHT = 1536;

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/**
 * Renders the Front Face of the ID Card
 */
export function generateCardTexture(
  { name = 'GAUTAM N CHIPKAR', role = 'AI & Data Science Engineer', photoUrl = '/gautam.png', idLabel = 'GNC-2026-AI' }: CardTextureOptions,
  onUpdate?: () => void
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;
  const ctx = canvas.getContext('2d')!;

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 16;
  texture.generateMipmaps = true;

  draw();

  if (photoUrl) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      draw(img);
      texture.needsUpdate = true;
      onUpdate?.();
    };
    img.onerror = () => {
      draw();
      texture.needsUpdate = true;
    };
    img.src = photoUrl;
  }

  function draw(photoImg?: HTMLImageElement) {
    const w = CARD_WIDTH;
    const h = CARD_HEIGHT;
    ctx.clearRect(0, 0, w, h);

    // Card Base Gradient
    roundRect(ctx, 0, 0, w, h, 56);
    const bgGrad = ctx.createLinearGradient(0, 0, w, h);
    bgGrad.addColorStop(0, '#0d0d14');
    bgGrad.addColorStop(0.4, '#12101c');
    bgGrad.addColorStop(0.7, '#171128');
    bgGrad.addColorStop(1, '#09090e');
    ctx.fillStyle = bgGrad;
    ctx.fill();

    // Subtle holographic grid texture
    ctx.strokeStyle = 'rgba(167, 139, 250, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 40; x < w; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 40; y < h; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Radial Purple / Cyan Glow in upper center
    const glowGrad = ctx.createRadialGradient(w / 2, 450, 50, w / 2, 450, 480);
    glowGrad.addColorStop(0, 'rgba(124, 58, 237, 0.22)');
    glowGrad.addColorStop(0.6, 'rgba(56, 189, 248, 0.08)');
    glowGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = glowGrad;
    ctx.fillRect(0, 0, w, h);

    // Outer Gradient Border
    roundRect(ctx, 12, 12, w - 24, h - 24, 48);
    const borderGrad = ctx.createLinearGradient(0, 0, w, h);
    borderGrad.addColorStop(0, 'rgba(167, 139, 250, 0.7)');
    borderGrad.addColorStop(0.3, 'rgba(56, 189, 248, 0.5)');
    borderGrad.addColorStop(0.7, 'rgba(236, 72, 153, 0.4)');
    borderGrad.addColorStop(1, 'rgba(124, 58, 237, 0.6)');
    ctx.strokeStyle = borderGrad;
    ctx.lineWidth = 4;
    ctx.stroke();

    // Inner subtle border
    roundRect(ctx, 24, 24, w - 48, h - 48, 40);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Top Header Banner
    ctx.save();
    roundRect(ctx, 0, 0, w, 110, 56);
    ctx.clip();
    const topGrad = ctx.createLinearGradient(0, 0, w, 0);
    topGrad.addColorStop(0, '#7c3aed');
    topGrad.addColorStop(0.5, '#38bdf8');
    topGrad.addColorStop(1, '#a855f7');
    ctx.fillStyle = topGrad;
    ctx.fillRect(0, 0, w, 14);
    ctx.restore();

    // Header Micro-Text
    ctx.fillStyle = '#a78bfa';
    ctx.font = "700 24px 'Courier New', monospace";
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('IDENTITY VERIFIED • AI DIVISION', 52, 54);

    // Microchip in top right
    const chipX = w - 160;
    const chipY = 44;
    roundRect(ctx, chipX, chipY, 94, 66, 10);
    const chipGrad = ctx.createLinearGradient(chipX, chipY, chipX + 94, chipY + 66);
    chipGrad.addColorStop(0, '#eab308');
    chipGrad.addColorStop(0.5, '#facc15');
    chipGrad.addColorStop(1, '#ca8a04');
    ctx.fillStyle = chipGrad;
    ctx.fill();
    ctx.strokeStyle = '#713f12';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#713f12';
    ctx.fillRect(chipX + 16, chipY + 14, 18, 38);
    ctx.fillRect(chipX + 42, chipY + 14, 18, 38);
    ctx.fillRect(chipX + 68, chipY + 14, 12, 38);

    // Photo Section
    const photoW = 580;
    const photoH = 680;
    const photoX = (w - photoW) / 2;
    const photoY = 150;

    roundRect(ctx, photoX - 8, photoY - 8, photoW + 16, photoH + 16, 36);
    ctx.fillStyle = 'rgba(124, 58, 237, 0.15)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(167, 139, 250, 0.4)';
    ctx.lineWidth = 2;
    ctx.stroke();

    roundRect(ctx, photoX, photoY, photoW, photoH, 30);
    ctx.save();
    ctx.clip();

    if (photoImg && photoImg.width > 0) {
      const scale = Math.max(photoW / photoImg.width, photoH / photoImg.height);
      const iw = photoImg.width * scale;
      const ih = photoImg.height * scale;
      const ix = photoX + (photoW - iw) / 2;
      const iy = photoY + (photoH - ih) / 2;
      ctx.drawImage(photoImg, ix, iy, iw, ih);

      const photoOverlay = ctx.createLinearGradient(0, photoY + photoH - 120, 0, photoY + photoH);
      photoOverlay.addColorStop(0, 'transparent');
      photoOverlay.addColorStop(1, 'rgba(13, 13, 20, 0.85)');
      ctx.fillStyle = photoOverlay;
      ctx.fillRect(photoX, photoY, photoW, photoH);
    } else {
      const avatarGrad = ctx.createLinearGradient(photoX, photoY, photoX + photoW, photoY + photoH);
      avatarGrad.addColorStop(0, '#1e1b4b');
      avatarGrad.addColorStop(0.5, '#312e81');
      avatarGrad.addColorStop(1, '#0f172a');
      ctx.fillStyle = avatarGrad;
      ctx.fillRect(photoX, photoY, photoW, photoH);

      ctx.fillStyle = '#ffffff';
      ctx.font = "800 180px 'Helvetica Neue', Arial, sans-serif";
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('GC', photoX + photoW / 2, photoY + photoH / 2);
    }
    ctx.restore();

    // Corner brackets
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 4;
    const bLen = 30;
    ctx.beginPath();
    ctx.moveTo(photoX + 12, photoY + 12 + bLen);
    ctx.lineTo(photoX + 12, photoY + 12);
    ctx.lineTo(photoX + 12 + bLen, photoY + 12);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(photoX + photoW - 12 - bLen, photoY + photoH - 12);
    ctx.lineTo(photoX + photoW - 12, photoY + photoH - 12);
    ctx.lineTo(photoX + photoW - 12, photoY + photoH - 12 - bLen);
    ctx.stroke();

    // Live status pill
    const statW = 190;
    const statH = 42;
    const statX = photoX + photoW - statW - 16;
    const statY = photoY + photoH - statH - 16;
    roundRect(ctx, statX, statY, statW, statH, 21);
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.fill();
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(statX + 22, statY + 21, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#10b981';
    ctx.fill();

    ctx.fillStyle = '#34d399';
    ctx.font = "700 18px 'Courier New', monospace";
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('STATUS: ACTIVE', statX + 38, statY + 22);

    // Name & Title
    ctx.fillStyle = '#ffffff';
    ctx.font = "800 58px 'Helvetica Neue', Arial, sans-serif";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(name.toUpperCase(), w / 2, photoY + photoH + 72);

    const roleText = role.toUpperCase();
    ctx.font = "700 24px 'Courier New', monospace";
    const roleMetrics = ctx.measureText(roleText);
    const rPillW = Math.min(w - 120, roleMetrics.width + 60);
    const rPillH = 50;
    const rPillX = w / 2 - rPillW / 2;
    const rPillY = photoY + photoH + 116;

    roundRect(ctx, rPillX, rPillY, rPillW, rPillH, 25);
    const rGrad = ctx.createLinearGradient(rPillX, 0, rPillX + rPillW, 0);
    rGrad.addColorStop(0, 'rgba(124, 58, 237, 0.35)');
    rGrad.addColorStop(1, 'rgba(56, 189, 248, 0.35)');
    ctx.fillStyle = rGrad;
    ctx.fill();
    ctx.strokeStyle = '#a78bfa';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#67e8f9';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(roleText, w / 2, rPillY + 26);

    // Details Grid
    const gridY = rPillY + 80;
    const boxW = (w - 140) / 2;
    const boxH = 80;

    const b1X = 60;
    roundRect(ctx, b1X, gridY, boxW, boxH, 16);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = "600 16px 'Courier New', monospace";
    ctx.textAlign = 'left';
    ctx.fillText('SPECIALIZATION', b1X + 18, gridY + 24);
    ctx.fillStyle = '#f1f5f9';
    ctx.font = "700 21px 'Helvetica Neue', Arial, sans-serif";
    ctx.fillText('GenAI • ML • Vision', b1X + 18, gridY + 54);

    const b2X = b1X + boxW + 20;
    roundRect(ctx, b2X, gridY, boxW, boxH, 16);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = "600 16px 'Courier New', monospace";
    ctx.fillText('CLEARANCE ID', b2X + 18, gridY + 24);
    ctx.fillStyle = '#38bdf8';
    ctx.font = "700 22px 'Courier New', monospace";
    ctx.fillText(idLabel, b2X + 18, gridY + 54);

    // Barcode & Footer
    const footY = gridY + 110;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(56, footY);
    ctx.lineTo(w - 56, footY);
    ctx.stroke();

    const barX = 60;
    const barY = footY + 25;
    const barW = 560;
    const barH = 75;

    ctx.fillStyle = '#ffffff';
    let currX = barX;
    const barPatterns = [3, 1, 4, 2, 5, 2, 2, 4, 1, 3, 2, 6, 2, 1, 4, 3, 2, 5, 1, 4, 2, 3, 5, 1, 2, 4, 3, 1, 6, 2, 3, 4, 1, 5, 2, 3];
    for (let i = 0; i < barPatterns.length && currX < barX + barW; i++) {
      const bw = barPatterns[i] * 3.5;
      if (i % 2 === 0) {
        ctx.fillRect(currX, barY, bw, barH);
      }
      currX += bw + 3;
    }

    ctx.fillStyle = '#64748b';
    ctx.font = "600 16px 'Courier New', monospace";
    ctx.textAlign = 'left';
    ctx.fillText('SEC-AUTH // 8492-04928-GNC // AI-DS-2026', barX, barY + barH + 24);

    const qrX = w - 240;
    const qrY = footY + 15;
    const qrSize = 115;
    roundRect(ctx, qrX - 8, qrY - 8, qrSize + 16, qrSize + 16, 12);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    ctx.fillStyle = '#000000';
    const gridN = 9;
    const cellSize = qrSize / gridN;
    for (let r = 0; r < gridN; r++) {
      for (let c = 0; c < gridN; c++) {
        const isCorner =
          (r < 3 && c < 3) ||
          (r < 3 && c >= gridN - 3) ||
          (r >= gridN - 3 && c < 3);
        const isRandom = ((r * 7 + c * 13 + 3) % 5 === 0);
        if (isCorner || isRandom) {
          ctx.fillRect(qrX + c * cellSize, qrY + r * cellSize, cellSize, cellSize);
        }
      }
    }
  }

  return texture;
}

/**
 * Renders the Back Face of the ID Card with luxury cursive "GC" logo
 */
export function generateCardBackTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;
  const ctx = canvas.getContext('2d')!;

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 16;
  texture.generateMipmaps = true;

  const w = CARD_WIDTH;
  const h = CARD_HEIGHT;
  ctx.clearRect(0, 0, w, h);

  // 1. Base Gradient
  roundRect(ctx, 0, 0, w, h, 56);
  const bgGrad = ctx.createLinearGradient(0, 0, w, h);
  bgGrad.addColorStop(0, '#0c0a14');
  bgGrad.addColorStop(0.3, '#141024');
  bgGrad.addColorStop(0.7, '#19122c');
  bgGrad.addColorStop(1, '#08070e');
  ctx.fillStyle = bgGrad;
  ctx.fill();

  // Subtle Matrix Dots
  ctx.fillStyle = 'rgba(167, 139, 250, 0.08)';
  for (let x = 40; x < w; x += 36) {
    for (let y = 40; y < h; y += 36) {
      ctx.beginPath();
      ctx.arc(x, y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Glowing center aura behind cursive monogram
  const auraGrad = ctx.createRadialGradient(w / 2, h / 2 - 40, 40, w / 2, h / 2 - 40, 420);
  auraGrad.addColorStop(0, 'rgba(124, 58, 237, 0.35)');
  auraGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.12)');
  auraGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = auraGrad;
  ctx.fillRect(0, 0, w, h);

  // Outer Glowing Border
  roundRect(ctx, 12, 12, w - 24, h - 24, 48);
  const borderGrad = ctx.createLinearGradient(0, 0, w, h);
  borderGrad.addColorStop(0, 'rgba(124, 58, 237, 0.6)');
  borderGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.4)');
  borderGrad.addColorStop(1, 'rgba(167, 139, 250, 0.7)');
  ctx.strokeStyle = borderGrad;
  ctx.lineWidth = 4;
  ctx.stroke();

  // Top Magnetic Security Stripe
  const stripeY = 80;
  const stripeH = 140;
  const stripeGrad = ctx.createLinearGradient(0, stripeY, 0, stripeY + stripeH);
  stripeGrad.addColorStop(0, '#18171f');
  stripeGrad.addColorStop(0.3, '#2a2638');
  stripeGrad.addColorStop(0.7, '#15131d');
  stripeGrad.addColorStop(1, '#110f17');
  ctx.fillStyle = stripeGrad;
  ctx.fillRect(16, stripeY, w - 32, stripeH);

  // Holographic shimmer lines on magnetic stripe
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(16, stripeY + 35);
  ctx.lineTo(w - 16, stripeY + 35);
  ctx.moveTo(16, stripeY + stripeH - 35);
  ctx.lineTo(w - 16, stripeY + stripeH - 35);
  ctx.stroke();

  // Security Monospace text in stripe
  ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
  ctx.font = "600 20px 'Courier New', monospace";
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('AUTHENTICATED ACCESS CARD • SECURE HARDWARE TOKEN', 50, stripeY + stripeH / 2);

  // 2. CENTER PIECE: LUXURY CURSIVE "GC" MONOGRAM
  const monoY = h / 2 - 30;

  // Outer Monogram Ring
  ctx.beginPath();
  ctx.arc(w / 2, monoY, 210, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(167, 139, 250, 0.3)';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Inner Monogram Ring with Dash
  ctx.beginPath();
  ctx.arc(w / 2, monoY, 195, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.5)';
  ctx.setLineDash([8, 6]);
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.setLineDash([]);

  // Cursive "GC" Typography
  ctx.save();
  ctx.shadowColor = 'rgba(167, 139, 250, 0.8)';
  ctx.shadowBlur = 35;
  ctx.fillStyle = '#ffffff';
  ctx.font = "italic 700 230px 'Brush Script MT', 'Dancing Script', 'Great Vibes', 'Segoe Script', 'Snell Roundhand', cursive";
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('GC', w / 2 + 5, monoY + 15);
  ctx.restore();

  // Monogram Subtitle Label
  ctx.fillStyle = '#a78bfa';
  ctx.font = "700 26px 'Courier New', monospace";
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('GAUTAM N CHIPKAR', w / 2, monoY + 270);

  ctx.fillStyle = '#94a3b8';
  ctx.font = "500 20px 'Helvetica Neue', Arial, sans-serif";
  ctx.fillText('AI & Data Science Engineering', w / 2, monoY + 310);

  // 3. BOTTOM TECHNICAL FOOTER & METRICS
  const footY = h - 260;

  // Chip Holographic Security Seal
  roundRect(ctx, 60, footY, w - 120, 150, 20);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Hologram Foil Box
  const foilX = 85;
  const foilY = footY + 25;
  roundRect(ctx, foilX, foilY, 100, 100, 12);
  const foilGrad = ctx.createLinearGradient(foilX, foilY, foilX + 100, foilY + 100);
  foilGrad.addColorStop(0, '#7c3aed');
  foilGrad.addColorStop(0.3, '#38bdf8');
  foilGrad.addColorStop(0.7, '#ec4899');
  foilGrad.addColorStop(1, '#a855f7');
  ctx.fillStyle = foilGrad;
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = "800 32px 'Courier New', monospace";
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('GNC', foilX + 50, foilY + 50);

  // Technical Signature block
  ctx.textAlign = 'left';
  ctx.fillStyle = '#e2e8f0';
  ctx.font = "700 22px 'Courier New', monospace";
  ctx.fillText('SECURITY SIGNATURE // 0x7F9A..2026', 220, footY + 55);

  ctx.fillStyle = '#64748b';
  ctx.font = "500 18px 'Courier New', monospace";
  ctx.fillText('DOUBLE TAP CARD TO FLIP • 3D PHYSICS ACTIVE', 220, footY + 95);

  return texture;
}

export function generateStrapTexture(
  label = 'GAUTAM N CHIPKAR • AI & DATA SCIENCE • '
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  const ribbon = ctx.createLinearGradient(0, 0, 0, canvas.height);
  ribbon.addColorStop(0, '#1c192b');
  ribbon.addColorStop(0.5, '#0b0914');
  ribbon.addColorStop(1, '#1c192b');
  ctx.fillStyle = ribbon;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = 'rgba(167, 139, 250, 0.08)';
  ctx.lineWidth = 2;
  for (let i = -canvas.height; i < canvas.width; i += 8) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + canvas.height, canvas.height);
    ctx.stroke();
  }

  ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
  ctx.setLineDash([10, 6]);
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, 12);
  ctx.lineTo(canvas.width, 12);
  ctx.moveTo(0, canvas.height - 12);
  ctx.lineTo(canvas.width, canvas.height - 12);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = '#ffffff';
  ctx.font = "800 44px 'Courier New', monospace";
  ctx.textBaseline = 'middle';
  const singleWidth = ctx.measureText(label).width;
  const repeats = Math.ceil((canvas.width * 2) / singleWidth) + 2;
  let x = 0;
  for (let i = 0; i < repeats; i++) {
    ctx.fillText(label, x, canvas.height / 2);
    x += singleWidth;
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 1);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 16;
  return texture;
}
