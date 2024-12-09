import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day08.input', 'utf8').split(
  '\n'
);
const rows = input.length;
const cols = input[0].length;

function findNodes(grid) {
  const map = new Map();
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] !== '.') {
        const key = grid[i][j];
        if (!map.has(key)) map.set(key, []);
        map.get(key).push([i, j]);
      }
    }
  }
  return map;
}

function markAntinodes(nodes, grid) {
  for (let i = 0; i < nodes.length - 1; i++) {
    const [r1, c1] = nodes[i];
    for (let j = i + 1; j < nodes.length; j++) {
      const [r2, c2] = nodes[j];
      const [tr1, tc1] = [r2 + r2 - r1, c2 + c2 - c1];
      const [tr2, tc2] = [r1 + r1 - r2, c1 + c1 - c2];
      if (tr1 >= 0 && tr1 < rows && tc1 >= 0 && tc1 < cols)
        grid[tr1][tc1] = '#';
      if (tr2 >= 0 && tr2 < rows && tc2 >= 0 && tc2 < cols)
        grid[tr2][tc2] = '#';
    }
  }
}

function partOne() {
  const grid = new Array(rows).fill().map((_) => new Array(cols).fill('.'));
  const nodeMap = findNodes(input);
  for (const nodes of nodeMap.values()) {
    markAntinodes(nodes, grid);
  }
  return grid.reduce(
    (total, row) =>
      total +
      row.reduce((subtotal, cell) => subtotal + (cell === '#' ? 1 : 0), 0),
    0
  );
}

console.log('The answer to Part One may be', partOne());

function partTwo() {}

console.log('The answer to Part Two may be', partTwo());
