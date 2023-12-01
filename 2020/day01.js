import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const numArray = readFileSync(__dirname + '/inputs/day01.input', 'utf8').split('\n').map(v => +v);

function partOne() {
  let numHolder = new Set();
  for (const val of numArray) {
    const target = 2020 - val;
    if (numHolder.has(target)) {
      console.log('part one', val * target);
      return;
    }
    numHolder.add(val);
  }
}

partOne();

function partTwo() {
  for (let i = 0; i < numArray.length-2; i++) {
    for (let j = i + 1; j < numArray.length-1; j++) {
      for (let k = j + 1; k < numArray.length; k++) {
        if (numArray[i] + numArray[j] + numArray[k] === 2020) {
          console.log('part two', numArray[i] * numArray[j] * numArray[k]);
        }
      }
    }
  }
}

partTwo();
