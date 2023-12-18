import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));

const seen = new Set();

function traverse(r, c, direction, grid, marked) {
  if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length) return;
  const key = `${r}~${c}~${direction}`;
  if (seen.has(key)) return;
  seen.add(key);
  marked[r][c] = true;
  if (grid[r][c] === '.') {
    if (direction === 'up') traverse(r - 1, c, direction, grid, marked);
    if (direction === 'down') traverse(r + 1, c, direction, grid, marked);
    if (direction === 'left') traverse(r, c - 1, direction, grid, marked);
    if (direction === 'right') traverse(r, c + 1, direction, grid, marked);
  }
  if (grid[r][c] === '|') {
    if (direction === 'up') traverse(r - 1, c, direction, grid, marked);
    if (direction === 'down') traverse(r + 1, c, direction, grid, marked);
    else {
      traverse(r - 1, c, 'up', grid, marked);
      traverse(r + 1, c, 'down', grid, marked);
    }
  }
  if (grid[r][c] === '-') {
    if (direction === 'left') traverse(r, c - 1, direction, grid, marked);
    if (direction === 'right') traverse(r, c + 1, direction, grid, marked); else {
      traverse(r, c - 1, 'left', grid, marked);
      traverse(r, c + 1, 'right', grid, marked);
    }
  }
  if (grid[r][c] === '/') {
    if (direction === 'up') traverse(r, c + 1, 'right', grid, marked);
    if (direction === 'down') traverse(r, c - 1, 'left', grid, marked);
    if (direction === 'left') traverse(r + 1, c, 'down', grid, marked);
    if (direction === 'right') traverse(r - 1, c, 'up', grid, marked);
  }
  if (grid[r][c] === '\\') {
    if (direction === 'up') traverse(r, c - 1, 'left', grid, marked);
    if (direction === 'down') traverse(r, c + 1, 'right', grid, marked);
    if (direction === 'left') traverse(r - 1, c, 'up', grid, marked);
    if (direction === 'right') traverse(r + 1, c, 'down', grid, marked);
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
