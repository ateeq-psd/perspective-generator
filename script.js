const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Canvas
function resize() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

window.addEventListener("resize", resize);
resize();

// VP
const vp = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  r: 8,
};

// Drag Logic
let dragging = false;

canvas.addEventListener("mousedown", (e) => {
  const dx = e.clientX - vp.x;
  const dy = e.clientY - vp.y;

  if (Math.hypot(dx, dy) < vp.r + 6) {
    dragging = true;
  }
});

canvas.addEventListener("mousemove", (e) => {
  if (!dragging) return;
  vp.x = e.clientX;
  vp.y = e.clientY;
  draw();
});

canvas.addEventListener("mouseup", () => (dragging = false));
canvas.addEventListener("mouseleave", () => (dragging = false));

// Drawing Logic
const spacing = 60;

function drawConvergingLines() {
  ctx.strokeStyle = "#666";

  // Top edge
  for (let x = 0; x <= canvas.width; x += spacing) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(vp.x, vp.y);
    ctx.stroke();
  }

  // Bottom edge
  for (let x = 0; x <= canvas.width; x += spacing) {
    ctx.beginPath();
    ctx.moveTo(x, canvas.height);
    ctx.lineTo(vp.x, vp.y);
    ctx.stroke();
  }

  // Left edge
  for (let y = 0; y <= canvas.height; y += spacing) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(vp.x, vp.y);
    ctx.stroke();
  }

  // Right edge
  for (let y = 0; y <= canvas.height; y += spacing) {
    ctx.beginPath();
    ctx.moveTo(canvas.width, y);
    ctx.lineTo(vp.x, vp.y);
    ctx.stroke();
  }
}

function drawVP() {
  ctx.fillStyle = "#f44";
  ctx.beginPath();
  ctx.arc(vp.x, vp.y, vp.r, 0, Math.PI * 2);
  ctx.fill();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawConvergingLines();
  drawVP();
}

draw();
