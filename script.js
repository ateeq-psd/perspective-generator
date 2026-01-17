const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const raySlider = document.getElementById("raySlider");
const vpToggles = [
  document.getElementById("vp1Toggle"),
  document.getElementById("vp2Toggle"),
  document.getElementById("vp3Toggle"),
];

const infoBtn = document.getElementById("info");
const helpBox = document.getElementById("help");

let rayCount = +raySlider.value;
let selectedVP = null;
let draggingVP = null;
let draggingHorizon = false;
let isSpaceDown = false;
let isMouseDown = false;

// Camera
const camera = { x: 0, y: 0 };

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

// Horizon Line
const horizon = {
  y: 0,
  thickness: 2,
};

// VPs
const vps = [
  { x: -600, y: 0, r: 8, color: "#f44", visible: true },
  { x: 600, y: 0, r: 8, color: "#4af", visible: true },
  { x: 0, y: -400, r: 8, color: "#6f6", visible: true },
];

// Input
canvas.addEventListener("mousedown", (e) => {
  isMouseDown = true;

  const wx = e.clientX - camera.x;
  const wy = e.clientY - camera.y;

  // Horizon hit test
  if (Math.abs(wy - horizon.y) < 6 && !isSpaceDown) {
    draggingHorizon = true;
    selectedVP = null;
    return;
  }

  // VP drag
  if (!isSpaceDown) {
    for (const vp of vps) {
      if (!vp.visible) continue;
      if (Math.hypot(wx - vp.x, wy - vp.y) < vp.r + 6) {
        draggingVP = vp;
        selectedVP = vp;
        return;
      }
    }
  }
});

canvas.addEventListener("mousemove", (e) => {
  if (draggingVP) {
    draggingVP.x = e.clientX - camera.x;
    draggingVP.y = e.clientY - camera.y;
    return;
  }

  if (draggingHorizon) {
    horizon.y = e.clientY - camera.y;
    return;
  }

  if (isSpaceDown && isMouseDown) {
    camera.x += e.movementX;
    camera.y += e.movementY;
  }
});

window.addEventListener("mouseup", () => {
  draggingVP = null;
  draggingHorizon = false;
  isMouseDown = false;
});

window.addEventListener("keydown", (e) => {
  if (e.code === "Space") isSpaceDown = true;

  if (!selectedVP) return;

  const step = e.shiftKey ? 40 : 8;
  if (e.key === "w") selectedVP.y -= step;
  if (e.key === "s") selectedVP.y += step;
  if (e.key === "a") selectedVP.x -= step;
  if (e.key === "d") selectedVP.x += step;

  if (e.key === "v") {
    vps[2].visible = !vps[2].visible;
    vpToggles[2].checked = vps[2].visible;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.code === "Space") isSpaceDown = false;
});

// UI
raySlider.oninput = () => (rayCount = +raySlider.value);
vpToggles.forEach((t, i) => (t.onchange = () => (vps[i].visible = t.checked)));

infoBtn.onclick = () => {
  helpBox.style.display = helpBox.style.display === "block" ? "none" : "block";
};

// Drawing
function drawRays(vp) {
  const len = Math.max(canvas.width, canvas.height) * 2;
  ctx.strokeStyle = "#555";

  for (let i = 0; i < rayCount; i++) {
    const a = (i / rayCount) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(vp.x, vp.y);
    ctx.lineTo(vp.x + Math.cos(a) * len, vp.y + Math.sin(a) * len);
    ctx.stroke();
  }
}

function drawVerticalParallels() {
  ctx.strokeStyle = "#555";
  for (let i = 0; i < rayCount; i++) {
    const x = (i / rayCount - 0.5) * canvas.width * 2;
    ctx.beginPath();
    ctx.moveTo(x, -canvas.height * 2);
    ctx.lineTo(x, canvas.height * 2);
    ctx.stroke();
  }
}

function drawVP(vp) {
  ctx.fillStyle = vp.color;
  ctx.beginPath();
  ctx.arc(vp.x, vp.y, vp.r, 0, Math.PI * 2);
  ctx.fill();

  if (vp === selectedVP) {
    ctx.strokeStyle = "#fff";
    ctx.beginPath();
    ctx.arc(vp.x, vp.y, vp.r + 4, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function drawHorizon() {
  ctx.strokeStyle = "#aaa";
  ctx.lineWidth = horizon.thickness;
  ctx.beginPath();
  ctx.moveTo(-canvas.width * 2, horizon.y);
  ctx.lineTo(canvas.width * 2, horizon.y);
  ctx.stroke();
  ctx.lineWidth = 1;
}

// Indicators
function drawEdgeIndicators() {
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

canvas.addEventListener("click", (e) => {
  const mx = e.clientX;
  const my = e.clientY;

  vps.forEach((vp) => {
    if (!vp.indicator) return;
    if (Math.hypot(mx - vp.indicator.x, my - vp.indicator.y) < 10) {
      selectedVP = vp;
    }
  });
});

// Render
function loop() {
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
loop();
