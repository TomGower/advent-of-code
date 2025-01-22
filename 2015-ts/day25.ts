import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day25.input', 'utf8');
const numbers = /\d+/g;
const [targetRow, targetCol] = input.match(numbers)!.map(Number);

function partOne() {
  let row = 1,
    col = 1;
  let num = 20151125;
  let nextStartRow = 2;
  while (row !== targetRow || col !== targetCol) {
    num = (num * 252533) % 33554393;
    if (row === 1) {
      row = nextStartRow;
      col = 1;
      nextStartRow++;
    } else {
      row--;
      col++;
    }
  }
  return num;
}

console.time('one');
console.log('The answer to Part One may be', partOne());
console.timeEnd('one');

function partTwo() {}

console.time('two');
console.log('The answer to Part Two is whether you have all 49 stars', true);
console.timeEnd('two');
