import { getCanvas, getContext } from "./canvas.js";
import { camera } from "./camera.js";
import { horizon, vps } from "./perspective.js";
import { state } from "./state.js";
import { getOrthocenter } from "./geometry.js";

export function drawRays(vp) {
  const canvas = getCanvas();
  const ctx = getContext();
  const len = Math.max(canvas.width, canvas.height) * 2;

  ctx.strokeStyle = "#222222";

  for (let i = 0; i < state.rayCount; i++) {
    const a = (i / state.rayCount) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(vp.x, vp.y);
    ctx.lineTo(vp.x + Math.cos(a) * len, vp.y + Math.sin(a) * len);
    ctx.stroke();
  }
}

export function drawVerticalParallels() {
  const canvas = getCanvas();
  const ctx = getContext();

  ctx.strokeStyle = "#1b1b1b";
  for (let i = 0; i < state.rayCount; i++) {
    const x = (i / state.rayCount - 0.5) * canvas.width * 2;
    ctx.beginPath();
    ctx.moveTo(x, -canvas.height * 2);
    ctx.lineTo(x, canvas.height * 2);
    ctx.stroke();
  }
}

export function drawVP(vp) {
  const ctx = getContext();

  ctx.fillStyle = vp.color;
  ctx.beginPath();
  ctx.arc(vp.x, vp.y, vp.r, 0, Math.PI * 2);
  ctx.fill();

  if (vp === state.selectedVP) {
    ctx.strokeStyle = "#fff";
    ctx.beginPath();
    ctx.arc(vp.x, vp.y, vp.r + 4, 0, Math.PI * 2);
    ctx.stroke();
  }
}

export function drawHorizon() {
  const canvas = getCanvas();
  const ctx = getContext();

  ctx.strokeStyle = "#2b2b2b";
  ctx.lineWidth = horizon.thickness;
  ctx.beginPath();
  ctx.moveTo(-canvas.width * 2, horizon.y);
  ctx.lineTo(canvas.width * 2, horizon.y);
  ctx.stroke();
  ctx.lineWidth = 1;
}

export function drawEdgeIndicators() {
  const canvas = getCanvas();
  const ctx = getContext();

  vps.forEach((vp) => {
    if (!vp.visible) return;

    const sx = vp.x + camera.x;
    const sy = vp.y + camera.y;

    if (sx >= 0 && sx <= canvas.width && sy >= 0 && sy <= canvas.height) {
      vp.indicator = null;
      return;
    }

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const dx = sx - cx;
    const dy = sy - cy;

    const tx = dx > 0 ? (canvas.width - cx) / dx : -cx / dx;
    const ty = dy > 0 ? (canvas.height - cy) / dy : -cy / dy;
    const t = Math.min(Math.abs(tx), Math.abs(ty));

    const ex = cx + dx * t;
    const ey = cy + dy * t;

    ctx.fillStyle = vp.color;
    ctx.beginPath();
    ctx.arc(ex, ey, 8, 0, Math.PI * 2);
    ctx.fill();

    vp.indicator = { x: ex, y: ey };
  });
}

export function drawVPTriangle() {
  const ctx = getContext();
  const visible = vps.filter((vp) => vp.visible);
  if (visible.length !== 3) return;

  ctx.strokeStyle = "#3a3a3a";
  ctx.lineWidth = 1.5;

  ctx.beginPath();
  ctx.moveTo(visible[0].x, visible[0].y);
  ctx.lineTo(visible[1].x, visible[1].y);
  ctx.lineTo(visible[2].x, visible[2].y);
  ctx.closePath();
  ctx.stroke();
}

export function drawOrthocenter() {
  const ctx = getContext();
  const visible = vps.filter((vp) => vp.visible);
  if (visible.length !== 3) return;

  const [A, B, C] = visible;
  const H = getOrthocenter(A, B, C);
  if (!H) return;

  ctx.fillStyle = "#ff5555";
  ctx.beginPath();
  ctx.arc(H.x, H.y, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(H.x, H.y, 10, 0, Math.PI * 2);
  ctx.stroke();
}
