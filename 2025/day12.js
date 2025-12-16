import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const inputSquares = readFileSync(
  __dirname + '/inputs/day12squares.input',
  'utf8'
);
const rows = inputSquares.split('\n').map((v) => v.split(': '));
const grids = rows.map((v) => v[0].split('x').map(Number));
const packagesToPlace = rows.map((v) => v[1].split(' ').map(Number));

function partOne() {
  const n = grids.length;
  let canPlace = 0;
  for (let i = 0; i < n; i++) {
    const gridArea = grids[i].reduce((acc, curr) => acc * curr, 1);
    const packagesCount = packagesToPlace[i].reduce(
      (acc, curr) => acc + curr,
      1
    );
    if (gridArea >= packagesCount * 3 * 3 || gridArea >= packagesCount * 7)
      canPlace++;
  }
  return canPlace;
}

console.log('the answer to Part One may be', partOne());
