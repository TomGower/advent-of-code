import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day06.input', 'utf8');
const values = input
  .split('\n')
  .map((v) => v.split(' ').filter((v) => v !== ''));
const operations = values.pop();
const numbers = values.map((row) => row.map(Number));

function partOne() {
  let res = 0;
  for (let i = 0; i < operations.length; i++) {
    if (operations[i] === '+') {
      let curr = 0;
      for (let j = 0; j < numbers.length; j++) {
        curr += numbers[j][i];
      }
      res += curr;
    } else {
      let curr = 1;
      for (let j = 0; j < numbers.length; j++) {
        curr *= numbers[j][i];
      }
      res += curr;
    }
  }
  return res;
}

console.log('the answer to Part One may be', partOne());

function partTwo() {
  const rowInput = input.split('\n');
  const operations = rowInput.pop();
  const indices = [];
  for (let i = 0; i < operations.length; i++) {
    if (operations[i] !== ' ') indices.push(i);
  }
  indices.push(operations.length + 1);
  let res = 0;
  for (let i = 0; i < indices.length - 1; i++) {
    const rawNumbers = [];
    for (let j = 0; j < rowInput.length; j++) {
      rawNumbers.push(rowInput[j].slice(indices[i], indices[i + 1] - 1));
    }
    const numbers = [];
    for (let j = 0; j < rawNumbers[0].length; j++) {
      let num = '';
      for (let k = 0; k < 4; k++) {
        num += rawNumbers[k][j];
      }
      numbers.push(+num);
    }
    if (operations[indices[i]] === '+') {
      res += numbers.reduce((acc, curr) => acc + curr, 0);
    } else {
      res += numbers.reduce((acc, curr) => acc * curr, 1);
    }
  }
  return res;
}

console.log('the answer to Part Two may be', partTwo());
