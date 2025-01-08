import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day02.input', 'utf8');
const dimensions = input.split('\n').map((v) => v.split('x').map(Number));

function partOne() {
  let res = 0;

  for (const [l, w, h] of dimensions) {
    const lw = l * w;
    const wh = w * h;
    const lh = l * h;
    res += 2 * lw + 2 * wh + 2 * lh + Math.min(lw, wh, lh);
  }

  return res;
}

console.log('The answer to Part One may be', partOne());

function partTwo() {
  let res = 0;

  for (const [l, w, h] of dimensions) {
    res += l * w * h;
    const min = Math.min(l, w, h);
    const secondMin = min === l ? Math.min(w, h) : Math.min(l, Math.max(w, h));
    res += 2 * min + 2 * secondMin;
  }

  return res;
}

console.log('The answer to Part Two may be', partTwo());
