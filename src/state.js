export const state = {
  rayCount: 8,
  selectedVP: null,
  draggingVP: null,
  draggingHorizon: false,
  isSpaceDown: false,
  isMouseDown: false,
  isMiddleMousePressed: false,
  snapEnabled: true,
};

export function setRayCount(count) {
  state.rayCount = count;
}

export function setSnapEnabled(enabled) {
  state.snapEnabled = enabled;
}
