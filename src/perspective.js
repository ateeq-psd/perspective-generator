// Horizon Line
export const horizon = {
  y: 0,
  thickness: 2,
};

// Vanishing Points
export const vps = [
  { x: -600, y: 0, r: 6, color: "#f44", visible: true, lockH: false }, // left
  { x: 600, y: 0, r: 6, color: "#4af", visible: true, lockH: false }, // right
  { x: 0, y: -400, r: 6, color: "#6f6", visible: true }, // vertical
];

export function setVPVisibility(index, visible) {
  vps[index].visible = visible;
}
