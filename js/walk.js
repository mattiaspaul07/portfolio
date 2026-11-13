// Grid pathfinding on the 10 x 10 floor, in half-unit cells. Blockers are furniture footprints {x, y, w, d}.
const CELL = 0.5, CELLS = 20, MARGIN = 0.3;

function cellFree(blockers, i, j) {
  if (i < 0 || j < 0 || i >= CELLS || j >= CELLS) return false;
  const px = (i + 0.5) * CELL, py = (j + 0.5) * CELL;
  if (px < 0.45 || py < 0.45 || px > 9.6 || py > 9.6) return false;
  return !blockers.some(f => px > f.x - MARGIN && px < f.x + f.w + MARGIN && py > f.y - MARGIN && py < f.y + f.d + MARGIN);
}

function cellOf(v) { return Math.max(0, Math.min(CELLS - 1, Math.floor(v / CELL))); }

function nearestFreeCell(blockers, i, j) {
  if (cellFree(blockers, i, j)) return [i, j];
  for (let r = 1; r < CELLS; r++)
    for (let di = -r; di <= r; di++)
      for (let dj = -r; dj <= r; dj++)
        if (Math.max(Math.abs(di), Math.abs(dj)) === r && cellFree(blockers, i + di, j + dj)) return [i + di, j + dj];
  return [i, j];
}

// Breadth-first search; returns cell-centre points from start to goal (inclusive), or [] if unreachable.
function findPath(blockers, x0, y0, x1, y1) {
  const start = nearestFreeCell(blockers, cellOf(x0), cellOf(y0));
  const goal = nearestFreeCell(blockers, cellOf(x1), cellOf(y1));
  const key = (i, j) => i * CELLS + j;
  const prev = new Map([[key(...start), null]]);
  const queue = [start];
  while (queue.length) {
    const [i, j] = queue.shift();
    if (i === goal[0] && j === goal[1]) break;
    for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const ni = i + di, nj = j + dj;
      if (cellFree(blockers, ni, nj) && !prev.has(key(ni, nj))) { prev.set(key(ni, nj), [i, j]); queue.push([ni, nj]); }
    }
  }
  if (!prev.has(key(...goal))) return [];
  const path = [];
  for (let c = goal; c; c = prev.get(key(...c))) path.unshift({ x: (c[0] + 0.5) * CELL, y: (c[1] + 0.5) * CELL });
  return path;
}
