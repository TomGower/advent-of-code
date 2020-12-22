import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const numArray = readFileSync(__dirname + '/inputs/day01.input', 'utf8').split('\n');

function partOne() {
  let numHolder = new Set();
  for (let i = 0; i < numArray.length; i++) {
    const curr = +numArray[i];
    const target = 2020 - curr;
    if (numHolder.has(target)) {
      console.log('part one', curr * target);
      return;
    }
    numHolder.add(curr);
  }
}

partOne();

function partTwo() {
  for (let i = 0; i < numArray.length-2; i++) {
    for (let j = i + 1; j < numArray.length-1; j++) {
      for (let k = j + 1; k < numArray.length; k++) {
        if (+numArray[i] + +numArray[j] + +numArray[k] === 2020) {
          console.log('part two', numArray[i] * numArray[j] * numArray[k]);
        }
      }
    }
  }
}

partTwo();
