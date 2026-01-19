function lineFromPoints(p1, p2) {
  return {
    a: p2.y - p1.y,
    b: p1.x - p2.x,
    c: -(p2.y - p1.y) * p1.x - (p1.x - p2.x) * p1.y,
  };
}

function perpendicularThrough(line, p) {
  return {
    a: -line.b,
    b: line.a,
    c: -(-line.b * p.x + line.a * p.y),
  };
}

function intersect(l1, l2) {
  const d = l1.a * l2.b - l2.a * l1.b;
  if (Math.abs(d) < 1e-6) return null;

  return {
    x: (l1.b * l2.c - l2.b * l1.c) / d,
    y: (l2.a * l1.c - l1.a * l2.c) / d,
  };
}

export function getOrthocenter(A, B, C) {
  const BC = lineFromPoints(B, C);
  const AC = lineFromPoints(A, C);

  const altitudeA = perpendicularThrough(BC, A);
  const altitudeB = perpendicularThrough(AC, B);

  return intersect(altitudeA, altitudeB);
}
