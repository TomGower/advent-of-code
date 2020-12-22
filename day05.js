import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const seats = readFileSync(__dirname + '/inputs/day05.input', 'utf8').split('\n');

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
  for (const seat of seats) {
    const seatId = getSeatId(seat);
    maxValue = Math.max(maxValue, seatId);
  }
  console.log('part one', maxValue); // 801
}

partOne();

const partTwo = () => {
  const seatIds = new Set();
  let min = Infinity;
  let max = -Infinity;
  for (const seat of seats) {
    const seatId = getSeatId(seat);
    seatIds.add(seatId);
    min = Math.min(min, seatId);
    max = Math.max(max, seatId);
  }
  for (let i = min; i < max; i++) {
    if (!seatIds.has(i)) console.log('part two', i); // 597
  }
}

partTwo();