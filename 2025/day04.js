import { access, readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const values = readFileSync(__dirname + '/inputs/day04.input', 'utf8').split(
  '\n'
);

function createAdjacencyMap(mat) {
  const rows = mat.length;
  const cols = mat[0].length;
  const res = new Array(rows).fill().map((_) => new Array(cols).fill(0));
  const dirs = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (mat[i][j] === '.') res[i][j] = Infinity;
      else {
        for (const [dx, dy] of dirs) {
          const [nr, nc] = [i + dx, j + dy];
          if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
          res[nr][nc]++;
        }
      }
    }
  }
  return res;
}

function partOne() {
  const valuesGrid = createAdjacencyMap(values);
  return valuesGrid.reduce(
    (acc, row) =>
      acc + row.reduce((rowSum, cell) => rowSum + (cell < 4 ? 1 : 0), 0),
    0
  );
}

console.log('the answer to Part One may be', partOne());
