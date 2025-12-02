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
