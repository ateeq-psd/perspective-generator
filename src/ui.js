import { vps, setVPVisibility } from './perspective.js';
import { state, setRayCount, setSnapEnabled } from './state.js';

export function initUI() {
  const raySlider = document.getElementById("raySlider");
  const vpToggles = [
    document.getElementById("vp1Toggle"),
    document.getElementById("vp2Toggle"),
    document.getElementById("vp3Toggle"),
  ];
  const infoBtn = document.getElementById("info");
  const helpBox = document.getElementById("help");
  const snapToggle = document.getElementById("snapToggle");

  // Initialize ray count from slider
  setRayCount(+raySlider.value);

  // Ray slider
  raySlider.oninput = () => setRayCount(+raySlider.value);

  // VP toggles
  vpToggles.forEach((toggle, i) => {
    toggle.onchange = () => setVPVisibility(i, toggle.checked);
  });

  // Snap toggle
  snapToggle.onchange = () => setSnapEnabled(snapToggle.checked);

  // Info button
  infoBtn.onclick = () => {
    helpBox.style.display = helpBox.style.display === "block" ? "none" : "block";
  };
}
