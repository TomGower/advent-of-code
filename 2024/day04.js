import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day04.input', 'utf8').split(
  '\n'
);
const test = `....XXMAS.
.SAMXMS...
...S..A...
..A.A.MS.X
XMASAMX.MM
X.....XA.A
S.S.S.S.SS
.A.A.A.A.A
..M.M.M.MM
.X.X.XMASX`.split('\n');

const test2 = `.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........`.split('\n');

const grid = input;

function findWord(word, grid, row, col) {
  const rows = grid.length;
  const cols = grid[0].length;
  let res = 0;
  let foundWord = true;
  // search up left
  for (let i = 1; i < word.length; i++) {
    if (row - i < 0 || col - i < 0 || grid[row - i][col - i] !== word[i]) {
      foundWord = false;
      break;
    }
  }
  if (foundWord) res++;
  // search up
  foundWord = true;
  for (let i = 1; i < word.length; i++) {
    if (row - i < 0 || grid[row - i][col] !== word[i]) {
      foundWord = false;
      break;
    }
  }
  if (foundWord) res++;
  // search up right
  foundWord = true;
  for (let i = 1; i < word.length; i++) {
    if (row - i < 0 || col + i >= cols || grid[row - i][col + i] !== word[i]) {
      foundWord = false;
      break;
    }
  }
  if (foundWord) res++;
  // search left
  foundWord = true;
  for (let i = 1; i < word.length; i++) {
    if (col - i < 0 || grid[row][col - i] !== word[i]) {
      foundWord = false;
      break;
    }
  }
  if (foundWord) res++;
  // search right
  foundWord = true;
  for (let i = 1; i < word.length; i++) {
    if (col + i >= cols || grid[row][col + i] !== word[i]) {
      foundWord = false;
      break;
    }
  }
  if (foundWord) res++;
  // search down left
  foundWord = true;
  for (let i = 1; i < word.length; i++) {
    if (row + i >= rows || col - i < 0 || grid[row + i][col - i] !== word[i]) {
      foundWord = false;
      break;
    }
  }
  if (foundWord) res++;
  // search down
  foundWord = true;
  for (let i = 1; i < word.length; i++) {
    if (row + i >= rows || grid[row + i][col] !== word[i]) {
      foundWord = false;
      break;
    }
  }
  if (foundWord) res++;
  // search down right
  foundWord = true;
  for (let i = 1; i < word.length; i++) {
    if (
      row + i >= rows ||
      col + i >= cols ||
      grid[row + i][col + i] !== word[i]
    ) {
      foundWord = false;
      break;
    }
  }
  if (foundWord) res++;
  return res;
}

function partOne() {
  let count = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 'X') {
        count += findWord('XMAS', grid, i, j);
      }
    }
  }

  return count;
}

console.log('The answer to Part One may be', partOne());

function hasMAS(grid, row, col) {
  if (
    row === 0 ||
    row === grid.length - 1 ||
    col === 0 ||
    col === grid[0].length - 1
  )
    return false;
  if (
    (grid[row - 1][col - 1] === 'M' && grid[row + 1][col + 1] === 'S') ||
    (grid[row - 1][col - 1] === 'S' && grid[row + 1][col + 1] === 'M')
  ) {
    if (grid[row - 1][col + 1] === 'M' && grid[row + 1][col - 1] === 'S')
      return true;
    if (grid[row - 1][col + 1] === 'S' && grid[row + 1][col - 1] === 'M')
      return true;
  }
  return false;
}

function partTwo() {
  let count = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 'A') {
        if (hasMAS(grid, i, j)) count++;
      }
    }
  }
  return count;
}

console.log('The answer to Part Two may be', partTwo());
