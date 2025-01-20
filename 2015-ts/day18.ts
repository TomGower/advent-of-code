import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day18.input', 'utf8');
const size = 100;
const STEPS = 100;
const ON = '#';
const OFF = '.';

function countNeighbors(row: number, col: number, grid: string[][]): number {
  const upLeft = row > 0 && col > 0 && grid[row - 1][col - 1] === ON ? 1 : 0;
  const up = row > 0 && grid[row - 1][col] === ON ? 1 : 0;
  const upRight =
    row > 0 && col < size - 1 && grid[row - 1][col + 1] === ON ? 1 : 0;
  const left = col > 0 && grid[row][col - 1] === ON ? 1 : 0;
  const right = col < size - 1 && grid[row][col + 1] === ON ? 1 : 0;
  const downLeft =
    row < size - 1 && col > 0 && grid[row + 1][col - 1] === ON ? 1 : 0;
  const down = row < size - 1 && grid[row + 1][col] === ON ? 1 : 0;
  const downRight =
    row < size - 1 && col < size - 1 && grid[row + 1][col + 1] === ON ? 1 : 0;
  return upLeft + up + upRight + left + right + downLeft + down + downRight;
}

function getNextStatus(
  row: number,
  col: number,
  grid: string[][],
  status: string,
  isBroken: boolean = false
): string {
  if (isBroken) {
    if (
      (row === 0 && col === 0) ||
      (row === 0 && col === size - 1) ||
      (row === size - 1 && col === 0) ||
      (row === size - 1 && col === size - 1)
    )
      return ON;
  }
  const neighborCount = countNeighbors(row, col, grid);
  if (status === ON) {
    if (neighborCount === 2 || neighborCount === 3) return ON;
    return OFF;
  } else {
    if (neighborCount === 3) return ON;
    return OFF;
  }
}

function createNextGrid(
  grid: string[][],
  isBroken: boolean = false
): string[][] {
  const nextGrid: string[][] = new Array(size)
    .fill(0)
    .map((_) => new Array(size).fill(''));
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      nextGrid[row][col] = getNextStatus(
        row,
        col,
        grid,
        grid[row][col],
        isBroken
      );
    }
  }
  return nextGrid;
}

function countOnSquares(grid: string[][]): number {
  return grid.reduce(
    (acc, row) =>
      acc + row.reduce((rowSum, curr) => rowSum + (curr === '#' ? 1 : 0), 0),
    0
  );
}

function partOne() {
  let grid = input.split('\n').map((r) => r.split(''));
  for (let step = 0; step < STEPS; step++) {
    grid = createNextGrid(grid);
  }
  return countOnSquares(grid);
}

console.log('The answer to Part One may be', partOne());

function partTwo() {
  let grid = input.split('\n').map((r) => r.split(''));
  for (let step = 0; step < STEPS; step++) {
    grid = createNextGrid(grid, true);
  }
  return countOnSquares(grid);
}

console.log('The answer to Part Two may be', partTwo());
