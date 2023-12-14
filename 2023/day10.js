import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/2023/inputs/day10.input', 'utf8').split('\n');

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
const queue = [[r + 1, c], [r - 1, c]];
seen.add(getKey(r + 1, c), getKey(r - 1, c));

// for testing
// const queue = [[r, c + 1], [r + 1, c]];
// seen.add(getKey(r, c + 1)).add(getKey(r + 1, c));

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
    // console.log(queue, seen);
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
