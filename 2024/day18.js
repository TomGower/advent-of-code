import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day18.input', 'utf8');
const obstacles = input.split('\n').map((v) => v.split(',').map(Number));
const gridSize = 71;

const dirs = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function move(turnCount) {
  const grid = new Array(gridSize)
    .fill()
    .map((_) => new Array(gridSize).fill(true));

  for (let i = 0; i < turnCount; i++) {
    const [c, r] = obstacles[i];
    grid[r][c] = false;
  }

  const seen = new Set();
  let steps = 0;
  const queue = [[0, 0]];
  seen.add(`0~0`);
  while (queue.length) {
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      const [row, col] = queue.shift();
      if (row === 70 && col === 70) return steps;
      if (
        row < 0 ||
        row >= gridSize ||
        col < 0 ||
        col >= gridSize ||
        !grid[row][col]
      )
        continue;
      for (const [dr, dc] of dirs) {
        const [nr, nc] = [row + dr, col + dc];
        if (nr < 0 || nr >= gridSize || nc < 0 || nc >= gridSize) continue;
        const key = `${nr}~${nc}`;
        if (seen.has(key)) continue;
        seen.add(key);
        queue.push([nr, nc]);
      }
    }
    steps++;
  }
  return -1;
}

function partOne() {
  return move(1024);
}

console.log('The answer to Part One may be', partOne());
// 12:30, moderately sloppy

function partTwo() {
  let lo = 1;
  let hi = obstacles.length - 1;
  let res = Infinity;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    const stepCount = move(mid);
    if (stepCount === -1) {
      hi = mid - 1;
      res = mid;
    } else {
      lo = mid + 1;
    }
  }

  return obstacles[res - 1];
}

console.log('The answer to Part Two may be', partTwo());
// 18:30, stupid off by 1 errors
