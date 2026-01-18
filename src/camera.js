export const camera = { 
  x: 950, 
  y: 470 
};

export function panCamera(dx, dy) {
  camera.x += dx;
  camera.y += dy;
}
