import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day20.input', 'utf8');
const mat = input.split('\n').map((v) => v.split(''));

function getPosition(grid, target) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === target) return [i, j];
    }
  }
  throw new Error(`target ${target} was not found in grid`);
}

const startPosition = getPosition(mat, 'S');
const endPosition = getPosition(mat, 'E');

const dirs = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function findShortestDistance(grid, start, end) {
  const queue = [start];
  const seen = new Set();
  seen.add(`${start[0]}~${start[1]}`);
  let steps = 0;
  while (queue.length) {
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      const [r, c] = queue.shift();
      if (r === end[0] && c === end[1]) return steps;
      for (const [dr, dc] of dirs) {
        const [nr, nc] = [r + dr, c + dc];
        const key = `${nr}~${nc}`;
        if (
          nr < 0 ||
          nr >= grid.length ||
          nc < 0 ||
          nc >= grid[0].length ||
          seen.has(key) ||
          grid[nr][nc] === '#'
        )
          continue;
        seen.add(key);
        queue.push([nr, nc]);
      }
    }
    steps++;
  }
  throw new Error(`path from ${start} to ${end} could not be found`);
}

function fillDistances(grid, end, memo) {
  const queue = [end];
  let steps = 0;
  while (queue.length) {
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      const [row, col] = queue.shift();
      if (memo[row][col] !== Infinity) continue;
      memo[row][col] = steps;
      for (const [dr, dc] of dirs) {
        const [nr, nc] = [row + dr, col + dc];
        if (nr < 0 || nr >= grid.length || nc < 0 || nc >= grid[0].length)
          continue;
        if (grid[nr][nc] === '#') continue;
        queue.push([nr, nc]);
      }
    }
    steps++;
  }
}

function findShortestPathsWithOneMove(grid, start, memo, maxSteps) {
  const [startRow, startCol] = start;
  const queue = [[startRow, startCol]];
  const wallQueue = [];
  const seen = new Set();
  seen.add(`${startRow}~${startCol}`);
  let steps = 0;
  while (queue.length) {
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      const [row, col] = queue.shift();
      for (const [dr, dc] of dirs) {
        const [nr, nc] = [row + dr, col + dc];
        const key = `${nr}~${nc}`;
        if (
          nr < 0 ||
          nr >= grid.length ||
          nc < 0 ||
          nc >= grid[0].length ||
          seen.has(key)
        )
          continue;
        seen.add(key);
        if (grid[nr][nc] === '#') {
          wallQueue.push([nr, nc, steps + 2]);
        } else {
          queue.push([nr, nc]);
        }
      }
    }
    steps++;
    if (steps > maxSteps) break;
  }
  const walls = new Set();
  for (const [row, col, stepCount] of wallQueue) {
    for (const [dr, dc] of dirs) {
      const [nr, nc] = [row + dr, col + dc];
      if (nr < 0 || nr >= grid.length || nc < 0 || nc >= grid[0].length)
        continue;
      if (memo[nr][nc] + stepCount <= maxSteps) {
        walls.add(`${row}~${col}~${nr}~${nc}`);
      }
    }
  }
  return walls.size;
}

function partOne() {
  const minDistance = findShortestDistance(mat, startPosition, endPosition);
  console.log('min distance is', minDistance);
  const memo = new Array(mat.length)
    .fill()
    .map((_) => new Array(mat[0].length).fill(Infinity));
  fillDistances(mat, endPosition, memo);

  return findShortestPathsWithOneMove(
    mat,
    startPosition,
    memo,
    minDistance - 100
  );
}

console.log('The answer to Part One may be', partOne());

function countPositionsUsingCheats(grid, startMemo, endMemo, maxSteps) {
  let count = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === '#') continue;
      for (let r = -20; r <= 20; r++) {
        for (let c = -20; c <= 20; c++) {
          const dist = Math.abs(r) + Math.abs(c);
          if (dist > 20) continue;
          const [nr, nc] = [i + r, j + c];
          if (nr < 0 || nr >= grid.length || nc < 0 || nc >= grid[0].length)
            continue;
          if (startMemo[i][j] + endMemo[nr][nc] + dist <= maxSteps) count++;
        }
      }
    }
  }
  return count;
}

function partTwo() {
  const minDistance = findShortestDistance(mat, startPosition, endPosition);

  const startMemo = new Array(mat.length)
    .fill()
    .map((_) => new Array(mat[0].length).fill(Infinity));
  fillDistances(mat, startPosition, startMemo);

  const endMemo = new Array(mat.length)
    .fill()
    .map((_) => new Array(mat[0].length).fill(Infinity));
  fillDistances(mat, endPosition, endMemo);

  return countPositionsUsingCheats(mat, startMemo, endMemo, minDistance - 100);
}

console.log('The answer to Part Two may be', partTwo());
