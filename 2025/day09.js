import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day09.input', 'utf8');
const rows = input.split('\n');
const positions = rows.map((v) => v.split(',').map(Number));

function partOne() {
  let max = 0;
  for (let i = 0; i < positions.length; i++) {
    const [x1, y1] = positions[i];
    for (let j = 0; j < positions.length; j++) {
      const [x2, y2] = positions[j];
      const area = Math.abs(x1 - x2 + 1) * Math.abs(y1 - y2 + 1);
      max = Math.max(max, area);
    }
  }
  return max;
}

console.log('the answer to Part One may be', partOne());
