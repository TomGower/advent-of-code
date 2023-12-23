import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));

const getKey = ([r, c]) => `${r}~${c}`;

function traverse(pos, target, grid, path, res, rows, cols) {
  const key = getKey(pos);
  console.log('position', key, path.size);
  if (target === key) {
    return path.size - 1;
  }
  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const [r, c] = pos;
  let ans = 0;
  for (const [dr, dc] of dirs) {
    let nr = r + dr;
    let nc = c + dc;
    let nextKey = getKey([nr, nc]);
    if (nr < 0 || nr >= rows || nr < 0 || nc >= cols) continue;
    if (path.has(nextKey) || grid[nr][nc] === '#') continue;
    let oldKey;
    if (grid[nr][nc] === '>') {
      if (dc !== 1) continue;
      nc++;
      path.add(nextKey);
      oldKey = nextKey;
      nextKey = getKey([nr, nc]);
      if (path.has(nextKey)) continue;
    } else if (grid[nr][nc] === 'v') {
      if (dr !== 1) continue;
      nr++;
      path.add(nextKey);
      oldKey = nextKey;
      nextKey = getKey([nr, nc]);
      if (path.has(nextKey)) continue;
    }
    path.add(nextKey);
    const thisPath = traverse([nr, nc], target, grid, path, res, rows, cols);
    ans = Math.max(ans, thisPath);
    path.delete(nextKey);
    if (oldKey) path.delete(oldKey);
  }
  return ans;
}

function partOne() {
  const input = readFileSync(__dirname + '/2023/inputs/day23.input', 'utf-8');
  const grid = input.split('\n');
  const rows = grid.length;
  const cols = grid[0].length;
  const start = [0, 1];
  const end = [rows - 1, cols - 2];
  const res = [0];
  const targetKey = getKey(end);
  const path = new Set();
  path.add(getKey(start));
  return traverse(start, targetKey, grid, path, res, rows, cols);
  // return res[0];
}

const p1 = partOne();

console.log('part one', p1);
// IS 2214
