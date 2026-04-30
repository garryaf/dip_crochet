import * as THREE from "three";

/**
 * Generates a realistic-looking crochet/amigurumi texture using HTML Canvas.
 * The pattern simulates yarn chain stitches arranged in a brick/hex offset layout.
 */
export function createCrochetTexture(
  baseColor: string = "#ff8fb1",
  resolution: number = 256
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = resolution;
  canvas.height = resolution;
  const ctx = canvas.getContext("2d")!;

  // Parse base color to RGB for shading
  const dummy = document.createElement("div");
  dummy.style.color = baseColor;
  document.body.appendChild(dummy);
  const computed = window.getComputedStyle(dummy).color;
  document.body.removeChild(dummy);
  const rgb = computed.match(/\d+/g)?.map(Number) ?? [255, 143, 177];
  const [r, g, b] = rgb;

  // Fill with base color
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, resolution, resolution);

  // Crochet stitch parameters
  const stitchW = 14;
  const stitchH = 11;
  const rows = Math.ceil(resolution / stitchH) + 2;
  const cols = Math.ceil(resolution / stitchW) + 2;

  for (let row = 0; row < rows; row++) {
    const offsetX = (row % 2) * (stitchW / 2);
    const y = row * stitchH - 4;

    for (let col = 0; col < cols; col++) {
      const x = col * stitchW + offsetX - stitchW;

      // Draw outer loop (darker shade for depth)
      ctx.beginPath();
      ctx.ellipse(x + stitchW / 2, y + stitchH / 2, stitchW / 2 - 1, stitchH / 2 - 1, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${Math.max(0, r - 45)}, ${Math.max(0, g - 45)}, ${Math.max(0, b - 45)}, 0.7)`;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Draw inner "yarn bump" highlight
      ctx.beginPath();
      ctx.ellipse(x + stitchW / 2 - 1, y + stitchH / 2 - 1.5, stitchW / 2 - 3.5, stitchH / 2 - 3.5, -0.2, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${Math.min(255, r + 35)}, ${Math.min(255, g + 35)}, ${Math.min(255, b + 35)}, 0.5)`;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Top stitch crossing — the characteristic "V" of a yarn loop
      const cx = x + stitchW / 2;
      const cy = y + 2.5;
      ctx.beginPath();
      ctx.moveTo(cx - 3, cy + 1.5);
      ctx.lineTo(cx, cy - 1);
      ctx.lineTo(cx + 3, cy + 1.5);
      ctx.strokeStyle = `rgba(${Math.max(0, r - 30)}, ${Math.max(0, g - 30)}, ${Math.max(0, b - 30)}, 0.85)`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);

  return texture;
}

/**
 * Creates a normal-map canvas texture to simulate the bumpy surface of yarn.
 */
export function createCrochetNormalMap(resolution: number = 256): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = resolution;
  canvas.height = resolution;
  const ctx = canvas.getContext("2d")!;

  // Base neutral normal (pointing straight out = rgb(128, 128, 255))
  ctx.fillStyle = "rgb(128, 128, 255)";
  ctx.fillRect(0, 0, resolution, resolution);

  const stitchW = 14;
  const stitchH = 11;
  const rows = Math.ceil(resolution / stitchH) + 2;
  const cols = Math.ceil(resolution / stitchW) + 2;

  for (let row = 0; row < rows; row++) {
    const offsetX = (row % 2) * (stitchW / 2);
    const y = row * stitchH - 4;

    for (let col = 0; col < cols; col++) {
      const x = col * stitchW + offsetX - stitchW;

      // Use a radial gradient to simulate a raised bump
      const grd = ctx.createRadialGradient(
        x + stitchW / 2, y + stitchH / 2, 0,
        x + stitchW / 2, y + stitchH / 2, stitchW / 2 - 1
      );
      grd.addColorStop(0, "rgb(138, 138, 255)"); // slightly raised center
      grd.addColorStop(0.6, "rgb(128, 155, 255)"); // tilted towards +Y edge
      grd.addColorStop(1, "rgb(100, 100, 225)");  // depressed outer ring

      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.ellipse(x + stitchW / 2, y + stitchH / 2, stitchW / 2 - 1, stitchH / 2 - 1, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);

  return texture;
}
