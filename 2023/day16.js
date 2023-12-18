import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));

function traverse(r, c, direction, grid, marked, seen = new Set()) {
  if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length) return;
  const key = `${r}~${c}~${direction}`;
  if (seen.has(key)) return;
  seen.add(key);
  marked[r][c] = true;
  if (grid[r][c] === '.') {
    if (direction === 'up') traverse(r - 1, c, direction, grid, marked, seen);
    if (direction === 'down') traverse(r + 1, c, direction, grid, marked, seen);
    if (direction === 'left') traverse(r, c - 1, direction, grid, marked, seen);
    if (direction === 'right') traverse(r, c + 1, direction, grid, marked, seen);
  }
  if (grid[r][c] === '|') {
    if (direction === 'up') traverse(r - 1, c, direction, grid, marked, seen);
    if (direction === 'down') traverse(r + 1, c, direction, grid, marked, seen);
    else {
      traverse(r - 1, c, 'up', grid, marked, seen);
      traverse(r + 1, c, 'down', grid, marked, seen);
    }
  }
  if (grid[r][c] === '-') {
    if (direction === 'left') traverse(r, c - 1, direction, grid, marked, seen);
    if (direction === 'right') traverse(r, c + 1, direction, grid, marked, seen); else {
      traverse(r, c - 1, 'left', grid, marked, seen);
      traverse(r, c + 1, 'right', grid, marked, seen);
    }
  }
  if (grid[r][c] === '/') {
    if (direction === 'up') traverse(r, c + 1, 'right', grid, marked, seen);
    if (direction === 'down') traverse(r, c - 1, 'left', grid, marked, seen);
    if (direction === 'left') traverse(r + 1, c, 'down', grid, marked, seen);
    if (direction === 'right') traverse(r - 1, c, 'up', grid, marked, seen);
  }
  if (grid[r][c] === '\\') {
    if (direction === 'up') traverse(r, c - 1, 'left', grid, marked, seen);
    if (direction === 'down') traverse(r, c + 1, 'right', grid, marked, seen);
    if (direction === 'left') traverse(r - 1, c, 'up', grid, marked, seen);
    if (direction === 'right') traverse(r + 1, c, 'down', grid, marked, seen);
  }
}

function partOne() {
  const input = readFileSync(__dirname + '/2023/inputs/day16.input', 'utf8');
  const grid = input.split('\n');
  const marked = new Array(grid.length).fill().map(_ => new Array(grid[0].length).fill(false));
  traverse(0, 0, 'right', grid, marked);

  return marked.reduce((acc, curr) => acc + curr.filter(v => v).length, 0);
}

const p1 = partOne();

console.log('part one', p1); // 6514

function partTwo() {
  const input = readFileSync(__dirname + '/2023/inputs/day16.input', 'utf8');
  const grid = input.split('\n');

  let res = 0;

  for (let i = 0; i < grid.length; i++) {
    const marked = new Array(grid.length).fill().map(_ => new Array(grid[0].length).fill(false));
    traverse(i, 0, 'right', grid, marked);
    let curr = marked.reduce((acc, curr) => acc + curr.filter(v => v).length, 0);
    res = Math.max(res, curr);
  }
  for (let i = 0; i < grid.length; i++) {
    const marked = new Array(grid.length).fill().map(_ => new Array(grid[0].length).fill(false));
    traverse(i, grid[i].length - 1, 'left', grid, marked);
    let curr = marked.reduce((acc, curr) => acc + curr.filter(v => v).length, 0);
    res = Math.max(res, curr);
  }
  for (let i = 0; i < grid[0].length; i++) {
    const marked = new Array(grid.length).fill().map(_ => new Array(grid[0].length).fill(false));
    traverse(0, i, 'down', grid, marked);
    let curr = marked.reduce((acc, curr) => acc + curr.filter(v => v).length, 0);
    res = Math.max(res, curr);
  }
  for (let i = 0; i < grid[0].length; i++) {
    const marked = new Array(grid.length).fill().map(_ => new Array(grid[0].length).fill(false));
    traverse(grid.length - 1, i, 'down', grid, marked);
    let curr = marked.reduce((acc, curr) => acc + curr.filter(v => v).length, 0);
    res = Math.max(res, curr);
  }

  return res;
}

const p2 = partTwo();

console.log('part two', p2); // 8089
