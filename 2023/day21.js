import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));

function getStartingPosition(grid) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 'S') return [i, j];
    }
  }
  throw new Error('could not find starting position');
}

function markPossibleSteps(grid) {
  const possibleSteps = new Array(grid.length)
    .fill()
    .map((_) => new Array(grid[0].length).fill(false));
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] !== '#') possibleSteps[i][j] = true;
    }
  }
  return possibleSteps;
}

const getKey = (r, c) => `${r}~${c}`;

function bfs(start, target, grid) {
  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const rows = grid.length;
  const cols = grid[0].length;
  let queue = [start];
  let count = 0;
  while (count < target) {
    const seen = new Set();
    count++;
    const nextQueue = [];
    for (let i = 0; i < queue.length; i++) {
      const [r, c] = queue[i];
      for (const [dr, dc] of dirs) {
        const nr = r + dr;
        const nc = c + dc;
        const key = getKey(nr, nc);
        if (
          nr < 0 ||
          nr >= rows ||
          nc < 0 ||
          nc >= cols ||
          grid[nr][nc] === '#' ||
          seen.has(key)
        )
          continue;
        seen.add(key);
        nextQueue.push([nr, nc]);
      }
    }
    queue = nextQueue;
  }
  return queue.length;
}

function partOne() {
  const input = readFileSync(__dirname + '/2023/inputs/day21.input', 'utf8');
  const grid = input.split('\n');
  // const possibleSteps = markPossibleSteps(grid);
  const startPos = getStartingPosition(grid);
  const cycles = 64;
  const res = bfs(startPos, cycles, grid);
  return res;
}

const p1 = partOne();

console.log('part one', p1); // 3605
