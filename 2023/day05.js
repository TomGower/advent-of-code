import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const values = readFileSync(__dirname + '/2023/inputs/day05.input', 'utf8').split('\n\n');

let target = values[0].split(':')[1].trim().split(' ').map(v => + v);

function createMaps(s) {
  return s.split('\n').slice(1).map(v => v.split(' ').map(val => +val));
}

const maps = values.slice(1).map(createMaps);

console.log('initial target', target);
console.log('map count is', maps.length);

for (const map of maps) {
  const nextTarget = [];
  for (const t of target) {
    let isAdded = false;
    for (const [dest, src, range] of map) {
      if (t >= src && t < src + range) {
        nextTarget.push(dest + t - src);
        isAdded = true;
      }
    }
    if (!isAdded) nextTarget.push(t);
  }
  target = nextTarget;
}

console.log('part 1', target.reduce((acc, curr) => Math.min(acc, curr), Infinity)); // NOT 73669231, IS 484023871
