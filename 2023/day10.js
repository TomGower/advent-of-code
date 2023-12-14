import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/2023/inputs/day10test.input', 'utf8').split('\n');

function findStartingPosition(grid) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 'S') return [i, j];
    }
  }
}

const seen = new Set();
const getKey = (r, c) => `${r}~${c}`

const startingPosition = findStartingPosition(input);
const [r, c] = startingPosition;
seen.add(getKey(r, c));
// const queue = [[r + 1, c], [r - 1, c]];
// seen.add(getKey(r + 1, c), getKey(r - 1, c));

// for testing
const queue = [[r, c + 1], [r + 1, c]];
seen.add(getKey(r, c + 1)).add(getKey(r + 1, c));

function getNextPosition(pos, seen) {
  const [r, c] = pos;
  if (input[r][c] === '|') {
    if (seen.has(getKey(r - 1, c))) return [r + 1, c];
    return [r - 1, c];
  }
  if (input[r][c] === '-') {
    if (seen.has(getKey(r, c - 1))) return [r, c + 1];
    return [r, c - 1];
  }
  if (input[r][c] === 'L') {
    if (seen.has(getKey(r - 1, c))) return [r, c + 1];
    return [r - 1, c];
  }
  if (input[r][c] === 'J') {
    if (seen.has(getKey(r - 1, c))) return [r, c - 1];
    return [r - 1, c];
  }
  if (input[r][c] === '7') {
    if (seen.has(getKey(r + 1, c))) return [r, c - 1];
    return [r + 1, c];
  }
  if (input[r][c] === 'F') {
    if (seen.has(getKey(r + 1, c))) return [r, c + 1];
    return [r + 1, c];
  }
}

function dfs(queue) {
  let level = 0;
  while (queue.length) {
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      const curr = queue.shift();
      const next = getNextPosition(curr, seen);
      const key = getKey(next[0], next[1]);
      if (seen.has(key)) break;
      seen.add(key);
      queue.push(next);
    }
    level++;
  }
  return level;
}

const p1 = dfs(queue);

console.log('part one', p1); // NOT 6904, too high, // IS 6903, stupid off-by-1 errors

function partTwo() {
  const pipeGrid = new Array(input.length).fill().map(_ => new Array(input[0].length).fill('.'));
  const rows = input.length;
  const cols = input[0].length;
  
  function markOutside(r, c) {
    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    if (r < 0 || r >= rows || c < 0 || c >= cols || pipeGrid[r][c] !== '.') return;
    pipeGrid[r][c] = 'O';
    for (const [dr, dc] of dirs) {
      markOutside(r + dr, c + dc);
    }
  }

  for (const v of seen) {
    const [r, c] = v.split('~').map(v => +v);
    pipeGrid[r][c] = 'X';
  }

  for (let i = 0; i < pipeGrid.length; i++) {
    let pipeCount = 0;
    for (let j = 0; j < pipeGrid[i].length; j++) {
      console.log('row', i, 'col', j, 'count', pipeCount);
      if (pipeGrid[i][j] === 'X') {
        pipeCount++;
        if ((input[i][j] === 'J' && input[i][j - 1] === 'F') || (input[i][j] == '7' && input[i][j - 1] === 'L')) pipeCount--;
        if (input[i][j] === 'S') pipeCount--;
      }
      if (pipeGrid[i][j] === '.') {
        if (i === 0 || j === 0 || i === pipeGrid.length - 1 || j === pipeGrid[i].length - 1 || pipeCount % 2 === 0) {
          markOutside(i, j);
        }
      }
    }
  }

  let res = 0;
  for (const r of pipeGrid) {
    for (const c of r) {
      if (c === '.') res++;
    }
  }
  return res;
}

const p2 = partTwo();

console.log('part two', p2); // NOT 499, too high, // NOT 0 // CORRECT answer is 265
