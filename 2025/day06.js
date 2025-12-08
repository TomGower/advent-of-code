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
