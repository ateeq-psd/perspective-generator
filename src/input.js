import { getCanvas } from './canvas.js';
import { camera, panCamera } from './camera.js';
import { horizon, vps } from './perspective.js';
import { state } from './state.js';

export function initInput() {
  const canvas = getCanvas();
  
  canvas.addEventListener("mousedown", handleMouseDown);
  canvas.addEventListener("mousemove", handleMouseMove);
  canvas.addEventListener("click", handleClick);
  
  window.addEventListener("mouseup", handleMouseUp);
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);
}

function handleMouseDown(e) {
  state.isMouseDown = true;
  
  if (e.button === 1) {
    state.isMiddleMousePressed = true;
  }

  const wx = e.clientX - camera.x;
  const wy = e.clientY - camera.y;

  // VP hit test first
  for (const vp of vps) {
    if (!vp.visible) continue;
    if (Math.hypot(wx - vp.x, wy - vp.y) < vp.r + 6) {
      state.draggingVP = vp;
      state.selectedVP = vp;
      return;
    }
  }

  // Horizon hit test
  if (!state.isSpaceDown && Math.abs(wy - horizon.y) < 6) {
    state.draggingHorizon = true;
    state.selectedVP = null;

    const SNAP_DIST = 12;
    vps[0].lockH = Math.abs(vps[0].y - horizon.y) < SNAP_DIST;
    vps[1].lockH = Math.abs(vps[1].y - horizon.y) < SNAP_DIST;
    return;
  }
}

function handleMouseMove(e) {
  if (state.draggingVP) {
    state.draggingVP.x = e.clientX - camera.x;
    state.draggingVP.y = e.clientY - camera.y;

    // Snap to horizon (only left/right VPs)
    if (
      state.snapEnabled &&
      !e.altKey &&
      state.draggingVP !== vps[2] // not vertical VP
    ) {
      if (Math.abs(state.draggingVP.y - horizon.y) < 12) {
        state.draggingVP.y = horizon.y;
      }
    }
    return;
  }

  if (state.draggingHorizon) {
    horizon.y = e.clientY - camera.y;

    if (vps[0].lockH) vps[0].y = horizon.y;
    if (vps[1].lockH) vps[1].y = horizon.y;
    return;
  }

  // Pan: space + mouse or MMB
  if ((state.isSpaceDown && state.isMouseDown) || state.isMiddleMousePressed) {
    panCamera(e.movementX, e.movementY);
  }
}

function handleMouseUp() {
  state.draggingVP = null;
  state.draggingHorizon = false;
  state.isMouseDown = false;
  state.isMiddleMousePressed = false;

  vps[0].lockH = false;
  vps[1].lockH = false;
}

function handleKeyDown(e) {
  if (e.code === "Space") state.isSpaceDown = true;

  if (!state.selectedVP) return;

  const step = e.shiftKey ? 40 : 8;
  if (e.key === "w") state.selectedVP.y -= step;
  if (e.key === "s") state.selectedVP.y += step;
  if (e.key === "a") state.selectedVP.x -= step;
  if (e.key === "d") state.selectedVP.x += step;

  if (e.key === "v") {
    const vpToggles = document.querySelectorAll('input[id^="vp"][id$="Toggle"]');
    vps[2].visible = !vps[2].visible;
    vpToggles[2].checked = vps[2].visible;
  }
}

function handleKeyUp(e) {
  if (e.code === "Space") state.isSpaceDown = false;
}

function handleClick(e) {
  const mx = e.clientX;
  const my = e.clientY;

  vps.forEach((vp) => {
    if (!vp.indicator) return;
    if (Math.hypot(mx - vp.indicator.x, my - vp.indicator.y) < 10) {
      state.selectedVP = vp;
    }
  });
}
