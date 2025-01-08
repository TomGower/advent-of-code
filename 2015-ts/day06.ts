import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day06.input', 'utf8');
const rawDirections = input.split('\n');
const directions = rawDirections.map(parseDirections);

function parseDirections(line: string) {
  const orders = line.split(' ');
  if (orders.length === 4) {
    return {
      type: 'toggle',
      start: orders[1].split(',').map(Number),
      end: orders[3].split(',').map(Number),
    };
  }
  return {
    type: orders[1],
    start: orders[2].split(',').map(Number),
    end: orders[4].split(',').map(Number),
  };
}

function partOne() {
  const grid: boolean[][] = new Array(1000)
    .fill(0)
    .map((_) => new Array(1000).fill(false));

  for (const {
    type,
    start: [startRow, startCol],
    end: [endRow, endCol],
  } of directions) {
    for (let i = startRow; i <= endRow; i++) {
      for (let j = startCol; j <= endCol; j++) {
        if (type === 'toggle') grid[i][j] = !grid[i][j];
        if (type === 'on') grid[i][j] = true;
        if (type === 'off') grid[i][j] = false;
      }
    }
  }

  return grid.reduce(
    (acc, row) => acc + row.reduce((acc2, col) => acc2 + (col ? 1 : 0), 0),
    0
  );
}

console.log('The answer to Part One may be', partOne());

function partTwo() {}

console.log('The answer to Part Two may be', partTwo());
