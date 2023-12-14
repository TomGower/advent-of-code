import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/2023/inputs/day11.input', 'utf8').split('\n');

const rows = input.length;
const cols = input[0].length;

function findExpandingRows(grid) {
  const res = [];
  for (let i = 0; i < rows; i++) {
    const count = grid[i].split('').reduce((acc, curr) => curr === '#' ? acc + 1 : acc, 0);
    if (count === 0) res.push(i);
  }
  return res;
}

function findExpandingCols(grid) {
  const res = [];
  for (let j = 0; j < cols; j++) {
    let count = 0;
    for (let i = 0; i < rows; i++) {
      if (grid[i][j] === '#') count++;
    }
    if (count === 0) res.push(j);
  }
  return res;
}

function createStarMap(grid, expandingRows, expandingCols) {
  const newRow = '.'.repeat(cols);
  for (let i = expandingRows.length - 1; i >= 0; i--) {
    grid.splice(expandingRows[i], 0, newRow);
  }
  for (let i = 0; i < grid.length; i++) {
    const r = grid[i].split('');
    for (let j = expandingCols.length - 1; j >= 0; j--) {
    const newCol = expandingCols[j];
      r.splice(newCol, 0, '.');
    }
    grid[i] = r.join('');
  }
  return grid;
}

function getStarLocations(grid) {
  const res = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === '#') res.push([i, j]);
    }
  }
  return res;
}

function getStarDistances(s1, s2) {
  const [r1, c1] = s1;
  const [r2, c2] = s2;
  return Math.abs(r1 - r2) + Math.abs(c1 - c2);
}

function partOne() {
  const expandingRows = findExpandingRows(input);
  const expandingCols = findExpandingCols(input);

  const starMap = createStarMap(input, expandingRows, expandingCols);
  const starLocations = getStarLocations(starMap);

  let res = 0;
  for (let i = 0; i < starLocations.length - 1; i++) {
    const s1 = starLocations[i];
    for (let j = i + 1; j < starLocations.length; j++) {
      const s2 = starLocations[j];
      res += getStarDistances(s1, s2);
    }
  }
  return res;
}

const p1 = partOne();

console.log('part one', p1); // NOT 7445298, too low
// IS 9522407
