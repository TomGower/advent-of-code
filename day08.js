import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const inputArray = readFileSync(__dirname + '/inputs/day08.input', 'utf8').split('\n');

const directions = inputArray.map(item => (item.split(' ')));

const run = (arr, partOne = undefined) => {
  let acc = 0;
  let index = 0;
  let visited = new Set();

  while (true) {
    if (index === 682) {
      break;
    }
    if (visited.has(index)) {
      if (partOne) console.log('part one', acc);
      return null;
    }
    visited.add(index);
    let curr = arr[index];
    if (curr[0] === 'nop') {
      index++;
    } else if (curr[0] === 'acc') {
      acc += +curr[1];
      index++;
    } else { // 'jmp'
      index += +curr[1];
    }
  }

  console.log('part two', acc);
}

const partOne = () => {
  run(directions, partOne);
}

partOne(); // 1859

const partTwo = () => {
  for (const direction of directions) {
    if (direction[0] === 'jmp') {
      direction[0] = 'nop';
      if (run(directions)) break;
      direction[0] = 'jmp';
    } else if (direction[0] === 'nop') {
      direction[0] = 'jmp';
      if (run(directions)) break;
      direction[0] = 'nop';
    }
  }
}

partTwo(); // 1235
