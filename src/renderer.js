import { getCanvas, getContext } from './canvas.js';
import { camera } from './camera.js';
import { vps } from './perspective.js';
import { 
  drawHorizon, 
  drawRays, 
  drawVerticalParallels, 
  drawVP, 
  drawEdgeIndicators 
} from './drawing.js';

export function startRenderLoop() {
  requestAnimationFrame(loop);
}

function loop() {
  const canvas = getCanvas();
  const ctx = getContext();
  
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.translate(camera.x, camera.y);

  drawHorizon();
  vps.forEach((vp) => vp.visible && drawRays(vp));
  if (!vps[2].visible) drawVerticalParallels();
  vps.forEach((vp) => vp.visible && drawVP(vp));

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  drawEdgeIndicators();

  requestAnimationFrame(loop);
}
