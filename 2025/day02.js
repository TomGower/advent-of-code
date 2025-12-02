import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const values = readFileSync(__dirname + '/inputs/day02.input', 'utf8');

function partOne() {
  const ranges = values.split(',').map((v) => v.split('-'));
  let sum = 0;
  for (const [a, b] of ranges) {
    const numA = parseInt(a),
      numB = parseInt(b);
    for (let i = numA; i <= numB; i++) {
      const strI = '' + i;
      const len = strI.length / 2;
      if (strI.slice(0, len) === strI.slice(len)) sum += i;
    }
  }
  return sum;
}

console.log('the answer to Part One may be', partOne());

function hasRepeats(s) {
  const len = s.length;
  if (len <= 1) return false;
  for (let i = Math.floor(len / 2); i >= 1; i--) {
    if (len % i !== 0) continue;
    const prefix = s.slice(0, i);
    for (let j = i; j < len; j += i) {
      if (s.slice(j, j + i) !== prefix) break;
      if (j + i === len) return true;
    }
  }
  return false;
}

function partTwo() {
  const ranges = values.split(',').map((v) => v.split('-'));
  let sum = 0;
  for (const [a, b] of ranges) {
    const numA = parseInt(a),
      numB = parseInt(b);
    for (let i = numA; i <= numB; i++) {
      let isRepeated = false;
      const strI = '' + i;
      if (hasRepeats(strI)) sum += i;
      if (isRepeated) sum += i;
    }
  }
  return sum;
}

console.log('the answer to Part One may be', partTwo());
