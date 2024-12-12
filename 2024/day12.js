import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day12.input', 'utf8');
const grid = input.split('\n');
const rows = grid.length;
const cols = grid[0].length;

function isOutOfBounds(row, col) {
  if (row < 0 || row >= rows || col < 0 || col >= cols) return true;
  return false;
}

function getRegion(i, j, grid, visited) {
  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const seen = new Set();
  const marker = grid[i][j];
  function move(row, col) {
    visited[row][col] = true;
    const key = `${row}~${col}`;
    seen.add(key);
    let perimeter = 0;
    for (const [dr, dc] of dirs) {
      if (
        isOutOfBounds(row + dr, col + dc) ||
        grid[row + dr][col + dc] !== marker
      ) {
        perimeter++;
      } else if (!visited[row + dr][col + dc]) {
        perimeter += move(row + dr, col + dc);
      }
    }
    return perimeter;
  }
  const edges = move(i, j);
  return [seen.size, edges];
}

function partOne() {
  const visited = new Array(rows)
    .fill(0)
    .map((_) => new Array(cols).fill(false));
  let res = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (visited[i][j]) continue;
      const [area, perimeter] = getRegion(i, j, grid, visited);
      res += area * perimeter;
    }
  }
  return res;
}

console.log('The answer to Part One may be', partOne());

function partTwo() {}

console.log('The answer to Part Two may be', partTwo());
