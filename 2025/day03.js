import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const values = readFileSync(__dirname + '/inputs/day03.input', 'utf8').split(
  '\n'
);

function partOne() {
  let sum = 0;
  for (const battery of values) {
    let best = '';
    let next = '';
    let max = '00';
    for (const cell of battery) {
      if (best) {
        max = Math.max(max, best + cell);
      }
      if (cell > best) {
        best = cell;
      } else if (cell === best) {
        next = Math.max(next, cell);
      }
    }
    sum += +max;
  }
  return sum;
}

console.log('the answer to Part One may be', partOne());

function getMaxValue(battery) {
  const res = [];
  let lastIdx = -1;
  while (res.length < 12) {
    let max = 0;
    let maxIdx = battery.length;
    for (let i = battery.length - (12 - res.length); i > lastIdx; i--) {
      if (battery[i] > max) max = battery[i];
      if (battery[i] === max) maxIdx = i;
    }
    res.push(max);
    lastIdx = maxIdx;
  }
  return +res.join('');
}

function partTwo() {
  let sum = 0;
  for (const battery of values) {
    sum += getMaxValue(battery);
  }
  return sum;
}

console.log('the answer to Part Two may be', partTwo());
