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

// VPs
const vps = [
  { x: canvas.width * 0.3, y: canvas.height / 2, r: 8 },
  { x: canvas.width * 0.7, y: canvas.height / 2, r: 8 },
];

// Interactions
let draggingVP = null;
let enableVertical = false;

// Mouse Drag logic
canvas.addEventListener("mousedown", (e) => {
  const mx = e.clientX;
  const my = e.clientY;

  for (const vp of vps) {
    if (Math.hypot(mx - vp.x, my - vp.y) < vp.r + 6) {
      draggingVP = vp;
      break;
    }
  }
});

canvas.addEventListener("mousemove", (e) => {
  if (!draggingVP) return;
  draggingVP.x = e.clientX;
  draggingVP.y = e.clientY;
  draw();
});

canvas.addEventListener("mouseup", () => (draggingVP = null));
canvas.addEventListener("mouseleave", () => (draggingVP = null));

// Keybind to toggle vertical lines going to Infinity
window.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "v") {
    enableVertical = !enableVertical;
    draw();
  }
});

// Drawing Logic
const rayCount = 60;
const rayLength = Math.max(window.innerWidth, window.innerHeight) * 2;
const verticalSpacing = 80;

function drawRaysFromVP(vp) {
  ctx.strokeStyle = "#666";

  for (let i = 0; i < rayCount; i++) {
    const angle = (i / rayCount) * Math.PI * 2;
    const dx = Math.cos(angle);
    const dy = Math.sin(angle);

    ctx.beginPath();
    ctx.moveTo(vp.x, vp.y);
    ctx.lineTo(vp.x + dx * rayLength, vp.y + dy * rayLength);
    ctx.stroke();
  }
}

function drawVerticalLines() {
  ctx.strokeStyle = "#555";

  for (let x = 0; x <= canvas.width; x += verticalSpacing) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
}

function drawVP(vp, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(vp.x, vp.y, vp.r, 0, Math.PI * 2);
  ctx.fill();
}

// Draw
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Horizontal perspective
  drawRaysFromVP(vps[0]);
  drawRaysFromVP(vps[1]);

  // Vertical perspective infinite
  if (enableVertical) {
    drawVerticalLines();
  }

  // Points
  drawVP(vps[0], "#f44");
  drawVP(vps[1], "#4af");
}

draw();
