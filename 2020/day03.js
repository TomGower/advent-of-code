import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const inputArray = readFileSync(__dirname + '/inputs/day03.input', 'utf8').split('\n');

function partOne() {
  let count = 0;
  let index = 0;
  for (let i = 1; i < inputArray.length; i++) {
    index = (index + 3) % inputArray[i].length;
    if (inputArray[i][index] === '#') count++;
  }
  console.log('part one:', count);
}

partOne();

function partTwo() {
  function checkSlope(right, down) {
    let count = 0;
    let index = 0;
    for (let i = down; i < inputArray.length; i += down) {
      index = (index + right) % inputArray[i].length;
      if (inputArray[i][index] === '#') count++;
    }
    return count;
  }

  const product = checkSlope(1, 1) * checkSlope(3, 1) * checkSlope(5, 1) * checkSlope(7, 1) * checkSlope(1, 2);
  console.log('part two:', product);
}

partTwo();