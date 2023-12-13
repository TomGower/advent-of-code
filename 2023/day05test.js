import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const values = readFileSync(__dirname + '/2023/inputs/day05test.input', 'utf8').split('\n\n');

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

console.log('part 1', target.reduce((acc, curr) => Math.min(acc, curr), Infinity), 'should be 35');

let targetRanges = values[0].split(':')[1].trim().split(' ').map(v => + v);

console.log('initial target ranges', targetRanges)

for (const map of maps) {
  const nextTargetRanges = [];
  console.log('targetRange', targetRanges);
  for (let i = 0; i < targetRanges.length; i += 2) {
    let min = targetRanges[i];
    let max = min + targetRanges[i + 1] - 1;
    let isAdded = false;
    for (const [dest, src, range] of map) {
      const firstSrc = src;
      const lastSrc = src + range - 1;
      console.log('firstSrc, lastSrc', firstSrc, lastSrc, min, max);
      if (min > lastSrc) continue;
      if (max < firstSrc) continue;
      // case 1: min/max fit in range
      if (min >= firstSrc && max <= lastSrc) {
        nextTargetRanges.push(dest + min - src, targetRanges[i + 1]);
        console.log('case 1', nextTargetRanges)
        isAdded = true;
      // case 2: max in range, min below range
      } else if (max <= lastSrc && min < firstSrc) {
        nextTargetRanges.push(dest, max - src + 1);
        max = firstSrc - 1;
      // case 3: min in range, max above range
      } else if (min >= firstSrc && max > lastSrc) {
        nextTargetRanges.push(dest + min - src, range - 1 - (min - src));
        min = lastSrc + 1;
      // case 4: range of dest fits within range of srcs
      } else if (min < firstSrc && max > lastSrc) {
        nextTargetRanges.push(dest, range);
        targetRanges.push(src + range, max - (src + range) + 1);
        max = firstSrc - 1;
      } else {
        console.log('unhandled case')
      }
    }
    if (!isAdded) nextTargetRanges.push(min, max - min + 1);
  }
  targetRanges = nextTargetRanges;
}

let p2Min = Infinity;

for (let i = 0; i < targetRanges.length; i += 2) {
  p2Min = Math.min(p2Min, targetRanges[i]);
}

console.log('part 2', p2Min, 'should be 46');
