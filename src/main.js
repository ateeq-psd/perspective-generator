import { camera } from './camera.js';
import { horizon, vps } from './perspective.js';
import { initCanvas, getCanvas, getContext } from './canvas.js';
import { initInput } from './input.js';
import { initUI } from './ui.js';
import { startRenderLoop } from './renderer.js';
import { initExport } from './export.js';

// Initialize
initCanvas();
initInput();
initUI();
initExport();

// Start render loop
startRenderLoop();
