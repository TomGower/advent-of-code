import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day06.input', 'utf8').split(
  '\n'
);

const rows = input.length;
const cols = input[0].length;

function getStartPosition(input, target) {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (input[i][j] === target) return [i, j];
    }
  }
  throw new Error(`Guard with marker ${target} was not found in input`);
}

function getNextCell(direction, row, col) {
  if (direction === 'up') return [row - 1, col];
  if (direction === 'right') return [row, col + 1];
  if (direction === 'left') return [row, col - 1];
  if (direction === 'down') return [row + 1, col];
  throw new Error(
    `Unknown next cell, with direction ${direction} and row ${row} and cell ${cell}`
  );
}

function isOutOfBounds(row, col) {
  if (row < 0 || row >= rows || col < 0 || col >= cols) return true;
  return false;
}

function getNextDirection(dir, row, col) {
  if (dir === 'up') {
    return ['right', row + 1, col + 1];
  }
  if (dir === 'right') {
    return ['down', row + 1, col - 1];
  }
  if (dir === 'down') {
    return ['left', row - 1, col - 1];
  }
  if (dir === 'left') {
    return ['up', row - 1, col + 1];
  }
  throw new Error(`Unknown direction ${dir}`);
}

function moveGuard(input, grid, direction, row, col) {
  grid[row][col] = 'X';
  let [nr, nc] = getNextCell(direction, row, col);
  if (isOutOfBounds(nr, nc)) return;
  if (input[nr][nc] === '#') {
    while (!isOutOfBounds(nr, nc) && input[nr][nc] === '#') {
      [direction, nr, nc] = getNextDirection(direction, nr, nc);
    }
  }
  moveGuard(input, grid, direction, nr, nc);
}

function partOne() {
  const grid = new Array(rows).fill().map((_) => new Array(cols).fill(false));

  const [row, col] = getStartPosition(input, '^');
  moveGuard(input, grid, 'up', row, col);

  return grid.reduce(
    (acc, row) =>
      acc + row.reduce((acc, cell) => acc + (cell === 'X' ? 1 : 0), 0),
    0
  );
}

console.log('The answer to Part One may be', partOne());

function hasCycle(editableMap, row, col) {
  const seen = new Set();
  let direction = 'up';

  while (true) {
    const key = `${row}~${col}~${direction}`;
    if (seen.has(key)) return true;
    seen.add(key);
    let [nr, nc] = getNextCell(direction, row, col);
    if (isOutOfBounds(nr, nc)) return false;
    if (editableMap[nr][nc] === '#') {
      while (!isOutOfBounds(nr, nc) && editableMap[nr][nc] === '#') {
        [direction, nr, nc] = getNextDirection(direction, nr, nc);
      }
    }
    [row, col] = [nr, nc];
  }

  return false;
}

function partTwo() {
  const [row, col] = getStartPosition(input, '^');
  const editableMap = input.map((v) => v.split(''));

  let obstacleCount = 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (editableMap[i][j] === '.') {
        editableMap[i][j] = '#';
        if (hasCycle(editableMap, row, col)) obstacleCount++;
        editableMap[i][j] = '.';
      }
    }
  }

  return obstacleCount;
}

console.log('The answer to Part Two may be', partTwo());
