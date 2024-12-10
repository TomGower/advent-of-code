import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day10.input', 'utf8').split(
  '\n'
);
const grid = input.map((v) => v.split('').map(Number));
const rows = grid.length;
const cols = grid[0].length;

function countTrailheads(row, col, next, destinations) {
  if (
    row < 0 ||
    row >= rows ||
    col < 0 ||
    col >= cols ||
    grid[row][col] !== next
  )
    return 0;
  if (next === 9) {
    destinations.add(`${row}~${col}`);
    return;
  }
  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  for (const [dr, dc] of dirs) {
    countTrailheads(row + dr, col + dc, next + 1, destinations);
  }
}

function partOne() {
  let res = 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 0) {
        const destinations = new Set();
        countTrailheads(i, j, 0, destinations);
        res += destinations.size;
      }
    }
  }

  return res;
}

console.log('The answer to Part One may be', partOne());
// not 1764, too high

function partTwo() {}

console.log('The answer to Part Two may be', partTwo());
