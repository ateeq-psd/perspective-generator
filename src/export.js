import { getCanvas } from "./canvas.js";
import { camera } from "./camera.js";
import { horizon, vps } from "./perspective.js";
import { state } from "./state.js";

function svgEl(name) {
  return document.createElementNS("http://www.w3.org/2000/svg", name);
}

function svgVerticalParallels(svg) {
  const canvas = getCanvas();
  const len = Math.max(canvas.width, canvas.height) * 2;

  for (let i = 0; i < state.rayCount; i++) {
    const x = (i / state.rayCount - 0.5) * canvas.width * 2;

    const line = svgEl("line");
    line.setAttribute("x1", x);
    line.setAttribute("y1", -len);
    line.setAttribute("x2", x);
    line.setAttribute("y2", len);
    line.setAttribute("stroke", "#202020");
    line.setAttribute("stroke-width", 1);

    svg.appendChild(line);
  }
}

function exportSVG() {
  const canvas = getCanvas();
  const svg = svgEl("svg");

  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("width", canvas.width);
  svg.setAttribute("height", canvas.height);
  svg.setAttribute(
    "viewBox",
    `${-camera.x} ${-camera.y} ${canvas.width} ${canvas.height}`,
  );

  // Horizon
  const h = svgEl("line");
  h.setAttribute("x1", -10000);
  h.setAttribute("y1", horizon.y);
  h.setAttribute("x2", 10000);
  h.setAttribute("y2", horizon.y);
  h.setAttribute("stroke", "#383838");
  h.setAttribute("stroke-width", horizon.thickness);
  svg.appendChild(h);

  // Rays
  vps.forEach((vp, i) => {
    if (!vp.visible) return;

    // Vertical VP ON → draw rays
    if (i === 2) {
      const len = Math.max(canvas.width, canvas.height) * 2;
      for (let j = 0; j < state.rayCount; j++) {
        const a = (j / state.rayCount) * Math.PI * 2;

        const line = svgEl("line");
        line.setAttribute("x1", vp.x);
        line.setAttribute("y1", vp.y);
        line.setAttribute("x2", vp.x + Math.cos(a) * len);
        line.setAttribute("y2", vp.y + Math.sin(a) * len);
        line.setAttribute("stroke", "#242424");
        line.setAttribute("stroke-width", 1);

        svg.appendChild(line);
      }
      return;
    }

    // Left / Right VP
    const len = Math.max(canvas.width, canvas.height) * 2;
    for (let j = 0; j < state.rayCount; j++) {
      const a = (j / state.rayCount) * Math.PI * 2;

      const line = svgEl("line");
      line.setAttribute("x1", vp.x);
      line.setAttribute("y1", vp.y);
      line.setAttribute("x2", vp.x + Math.cos(a) * len);
      line.setAttribute("y2", vp.y + Math.sin(a) * len);
      line.setAttribute("stroke", "#2b2b2b");
      line.setAttribute("stroke-width", 1);

      svg.appendChild(line);
    }
  });

  // Vertical VP OFF → draw parallels
  if (!vps[2].visible) {
    svgVerticalParallels(svg);
  }

  // Download
  const serializer = new XMLSerializer();
  const svgStr = serializer.serializeToString(svg);
  const blob = new Blob([svgStr], { type: "image/svg+xml" });

  const link = document.createElement("a");
  link.download = "perspective.svg";
  link.href = URL.createObjectURL(blob);
  link.click();
}

export function initExport() {
  const exportBtn = document.getElementById("exportSVG");
  exportBtn.onclick = exportSVG;
}
