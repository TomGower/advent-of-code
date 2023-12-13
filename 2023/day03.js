import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const values = readFileSync(__dirname + '/2023/inputs/day03.input', 'utf8').split('\n');

const numbers = new Set('0123456789');
const symbolLocations = new Set();

for (let i = 0; i < values.length; i++) {
  for (let j = 0; j < values[i].length; j++) {
    if (!numbers.has(values[i][j]) && values[i][j] !== '.') {
      symbolLocations.add(`${i}~${j}`);
    }
  }
}

function isAdjacent(row, colStart, colEnd) {
  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = colStart - 1; j <= colEnd + 1; j++) {
      if (symbolLocations.has(`${i}~${j}`)) return true;
    }
  }
  return false;
}

let p1 = 0;

for (let i = 0; i < values.length; i++) {
  for (let j = 0; j < values[i].length; j++) {
    if (numbers.has(values[i][j])) {
      let k = 0;
      while (numbers.has(values[i][j + k]) && j + k < values[i].length) {
        k++;
      }
      const val = +values[i].slice(j, j + k);
      if (isAdjacent(i, j, j + k - 1)) p1 += val;
      j = j + k;
    }
  }
}

console.log('part 1', p1); // 526404

function getAdjacentNumbers(row, col) {
  const res = [];
  for (let i = -1; i <= 1; i++) {
    if (row + i < 0 || row + i >= values.length) continue;
    for (let j = -1; j <= 1; j++) {
      if (col + j < 0 || col + j >= values.length) continue;
      if (numbers.has(values[row + i][col + j])) {
        let s = 0;
        while (numbers.has(values[row + i][col + j + s]) && col + j + s >= 0) {
          s--;
        }
        let e = 0;
        while (numbers.has(values[row + i][col + j + e]) && col + j + e < values[row + 1].length) {
          e++;
        }
        const num = +values[row + i].slice(col + j + s + 1, col + j + e);
        res.push(num);
        j = j + e;
      }
    }
  }
  return res;
}

let p2 = 0;

for (let i = 0; i < values.length; i++) {
  for (let j = 0; j < values[i].length; j++) {
    if (values[i][j] === '*') {
      const nums = getAdjacentNumbers(i, j);
      console.log(nums);
      if (nums.length === 2) {
        p2 += (nums[0] * nums[1]);
      }
    }
  }
}

console.log('part 2', p2); // 84399773
