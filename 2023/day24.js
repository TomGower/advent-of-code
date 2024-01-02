import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));

function createHailstone(s) {
  let [pos, dirs] = s.split(' @ ');
  pos = pos.split(', ').map((v) => +v);
  dirs = dirs.split(', ').map((v) => +v);
  return [pos, dirs];
}

function makeEquation([pos, dirs]) {
  const m = dirs[1] / dirs[0];
  const b = pos[1] - m * pos[0];
  console.log(m, b);
  return [-1, m, b, pos, dirs];
}

function isInPast(x, y, pos, dirs) {
  const yDiff = y - pos[1];
  if (yDiff > 0) return dirs[1] < 0;
  if (yDiff < 0) return dirs[1] > 0;
  const xDiff = x - pos[0];
  if (xDiff < 0) return dirs[0] < 0;
  if (xDiff > 0) return dirs[1] > 0;
  return false;
}

// THIS DOESN'T WORK
function hasValidIntercept(l1, l2, min, max) {
  const [a1, b1, c1, pos1, dirs1] = l1;
  const [a2, b2, c2, pos2, dirs2] = l2;
  if (b1 === b2) return pos1 === pos2 && dirs1 === dirs2;
  const [x, y] = [
    (b1 * c2 - b2 * c1) / (a1 * b2 - a2 * b1),
    (c1 * a2 - c2 * a1) / (a1 * b2 - a2 * b1),
  ];
  if (x < min || x > max || y < min || y > max) return false;
  if (isInPast(x, y, pos1, dirs1) || isInPast(x, y, pos2, dirs2)) return false;
  return true;
}

// THIS DOES WORK
function hasValidIntercept2(l1, l2, min, max) {
  const [a1, b1, c1, pos1, dirs1] = l1;
  const [a2, b2, c2, pos2, dirs2] = l2;
  const [x1, x2, y1, y2] = [
    pos1[0],
    pos1[0] + 1000000 * dirs1[0],
    pos1[1],
    pos1[1] + 1000000 * dirs1[1],
  ];
  const [x3, x4, y3, y4] = [
    pos2[0],
    pos2[0] + 1000000 * dirs2[0],
    pos2[1],
    pos2[1] + 1000000 * dirs2[1],
  ];
  const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  if (denominator === 0) {
    return false;
  }
  const x =
    ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) /
    denominator;
  const y =
    ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) /
    denominator;

  if (x < min || x > max || y < min || y > max) return false;
  if (isInPast(x, y, pos1, dirs1) || isInPast(x, y, pos2, dirs2)) return false;
  return true;
}

function partOne() {
  const input = readFileSync(__dirname + '/2023/inputs/day24.input', 'utf-8');
  const hailstones = input.split('\n').map(createHailstone);
  const hailstoneEquations = hailstones.map(makeEquation);
  const min = 200000000000000;
  const max = 400000000000000;
  let res = 0;
  for (let i = 0; i < hailstoneEquations.length - 1; i++) {
    const curr = hailstoneEquations[i];
    for (let j = i + 1; j < hailstoneEquations.length; j++) {
      const next = hailstoneEquations[j];
      if (hasValidIntercept2(curr, next, min, max)) res++;
    }
  }
  return res;
}

const p1 = partOne();

console.log('part one', p1);
// IS 13892
