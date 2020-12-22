import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const inputArray = readFileSync(__dirname + '/inputs/day05.input', 'utf8').split('\n');

// const inputArray = input.split('\n');

const getSeatId = str => {
  let val = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === 'B') {
      val += 8 * 2 ** (6 - i);
    } else if (str[i] === 'R') {
      val += 2 ** (9 - i);
    }
  }
  return val;
}

const partOne = () => {
  let maxValue = -Infinity;
  for (let i = 0; i < inputArray.length; i++) {
    const seatId = getSeatId(inputArray[i]);
    maxValue = Math.max(maxValue, seatId);
  }
  console.log('part one', maxValue); // 801
}

partOne();

const partTwo = () => {
  const seatIds = new Set();
  let min = Infinity;
  let max = -Infinity;
  for (let i = 0; i < inputArray.length; i++) {
    const seatId = getSeatId(inputArray[i]);
    seatIds.add(seatId);
    min = Math.min(min, seatId);
    max = Math.max(max, seatId);
  }
  for (let i = min; i < max; i++) {
    if (!seatIds.has(i)) console.log('part two', i); // 597
  }
}

partTwo();