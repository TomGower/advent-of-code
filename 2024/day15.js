import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day15.input', 'utf8');
const [bigGrid, allMoves] = input.split('\n\n');
const grid = bigGrid.split('\n').map((r) => r.split(''));
const moves = allMoves.split('\n');

const rows = grid.length;
const cols = grid[0].length;

function findStartPosition(grid, target) {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === target) return [r, c];
    }
  }
  throw new Error(`target ${target} could not be found in grid`);
}

const [startX, startY] = findStartPosition(grid, '@');

function canMove(r, c, direction, grid) {
  const [dr, dc] = direction;
  (r = r + dr), (c = c + dc);
  while (true) {
    if (grid[r][c] === '.') return true;
    if (grid[r][c] === '#') return false;
    (r += dr), (c += dc);
  }
}

function move(r, c, [dr, dc], grid) {
  if (!canMove(r, c, [dr, dc], grid)) return [r, c];
  if (grid[r + dr][c + dc] === '.') return [r + dr, c + dc];
  const [nextR, nextC] = [r + dr, c + dc];
  while (true) {
    if (grid[r + dr][c + dc] === 'O') {
      r += dr;
      c += dc;
    } else {
      grid[nextR][nextC] = '.';
      grid[r + dr][c + dc] = 'O';
      break;
    }
  }
  return [nextR, nextC];
}

function partOne() {
  let [x, y] = [startX, startY];
  grid[startX][startY] = '.';

  for (const row of moves) {
    for (const cell of row) {
      if (cell === '^') [x, y] = move(x, y, [-1, 0], grid);
      if (cell === '>') [x, y] = move(x, y, [0, 1], grid);
      if (cell === 'v') [x, y] = move(x, y, [1, 0], grid);
      if (cell === '<') [x, y] = move(x, y, [0, -1], grid);
    }
  }

  let res = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 'O') res += 100 * i + j;
    }
  }

  return res;
}

console.log('The answer to Part One may be', partOne());
// correct at 27:30

function partTwo() {}

console.log('The answer to Part Two may be', partTwo());
