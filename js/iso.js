// Isometric drawing helpers. World units: x and y on the floor, z up. One unit is S pixels.
const NS = "http://www.w3.org/2000/svg";
const S = 20;

function iso(x, y, z) {
  return [(x - y) * 0.866 * S, (x + y) * 0.5 * S - z * S];
}
function pts(points) {
  return points.map(p => iso(...p).map(v => v.toFixed(1)).join(",")).join(" ");
}
function shade(hex, factor) {
  const n = parseInt(hex.slice(1), 16);
  return "#" + [n >> 16, (n >> 8) & 255, n & 255]
    .map(v => Math.max(0, Math.min(255, Math.round(v * factor))).toString(16).padStart(2, "0")).join("");
}
function el(tag, attrs, parent) {
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  parent.appendChild(e);
  return e;
}
function poly(g, points, fill, extra) {
  return el("polygon", Object.assign({ points: pts(points), fill }, extra || {}), g);
}
function line(g, points, stroke, width) {
  return el("polyline", { points: pts(points), stroke, "stroke-width": width || 2, fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" }, g);
}
// A box from (x,y,z) with width w (x), depth d (y), height h (z); draws the three faces the viewer sees.
function box(g, x, y, z, w, d, h, color) {
  poly(g, [[x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h]], shade(color, 0.86));
  poly(g, [[x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h]], shade(color, 0.72));
  poly(g, [[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]], shade(color, 1.07));
}
