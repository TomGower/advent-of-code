import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const values = readFileSync(__dirname + '/2023/inputs/day06.input', 'utf8').split('\n');

let [times, distances] = values.map(v => v.split(':')[1].split(' ').filter(v => v).map(v => +v));
const timeAndDistance = times.map((v, i) => [v, distances[i]]);

let p1 = 1;

for (const [t, d] of timeAndDistance) {
  let count = 0;
  for (let i = 1; i < t; i++) {
    const velocity = i;
    const dist = velocity * (t - i);
    if (dist > d) {
      count++;
    }
  }
  p1 *= count;
}

console.log('part 1', p1); // 503424
