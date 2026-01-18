let canvas;
let ctx;

export function initCanvas() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  
  resize();
  window.addEventListener("resize", resize);
}

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

export function getCanvas() {
  return canvas;
}

export function getContext() {
  return ctx;
}
