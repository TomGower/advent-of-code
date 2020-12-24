import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const inputArray = readFileSync(__dirname + '/inputs/day24.input', 'utf8').split('\n');

const parseSteps = str => {
  let res = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === 'n' || str[i] === 's') {
      res.push(str.substring(i, i+2));
      i++;
    } else {
      res.push(str[i]);
    }
  }
  return res;
}

const moves = inputArray.map(parseSteps);
let xMin = Infinity;
let xMax = -Infinity;
let yMin = Infinity;
let yMax = -Infinity;

const updateMinMax = (a, b) => {
  xMin = Math.min(xMin, +a);
  xMax = Math.max(xMax, +a);
  yMin = Math.min(yMin, +b);
  yMax = Math.max(yMax, +b);
}
const makeKey = (a, b) => 'first' + a + '|second' + b;

let destinations = new Set();
for (const move of moves) {
  // console.log(move);
  let x = 0;
  let y = 0;
  for (const step of move) {
    if (step === 'e') x += 2;
    else if (step === 'w') x -= 2;
    else if (step === 'nw') {
      x -= 1;
      y -= 1;
    }
    else if (step === 'se') {
      x += 1;
      y += 1;
    }
    else if (step === 'ne') {
      x += 1;
      y -= 1;
    }
    else if (step === 'sw') {
      x -= 1;
      y += 1;
    }
    else {
      throw new Error('this should be impossible');
    }
  }
  const key = makeKey(x, y);
  updateMinMax(x, y);
  if (destinations.has(key)) {
    destinations.delete(key);
  }
  else (destinations.add(key));
}

console.log('part one', destinations.size);

const checkNeighbors = (x, y) => {
  let total = 0;
  total += destinations.has(makeKey(x + 2, y)) + destinations.has(makeKey(x - 2, y)) + destinations.has(makeKey(x - 1, y - 1)) +
    destinations.has(makeKey(x + 1, y + 1)) + destinations.has(makeKey(x + 1, y - 1)) + destinations.has(makeKey(x - 1, y + 1));
  return total;
}

let round = 0;
const rounds = 100;
while (round < rounds) {
  if (Math.abs(xMin % 2) === 1) xMin--;
  if (Math.abs(yMin % 2) === 1) yMin--;
  if (xMax % 2 === 1) xMax++;
  if (yMax % 2 === 1) yMax++;
  let nextDestinations = new Set();
  for (let i = xMin - 2; i <= xMax + 2; i += 2) {
    for (let j = yMin - 2; j <= yMax + 2; j += 2) {
      const neighbors = checkNeighbors(i, j);
      const key = makeKey(i, j);
      if (destinations.has(key)) {
        if (neighbors === 1 || neighbors === 2) {
          nextDestinations.add(key);
          updateMinMax(i, j);
        }
      } else {
        if (neighbors === 2) {
          nextDestinations.add(key);
          updateMinMax(i, j);
        }
      }
      const neighbors2 = checkNeighbors(i + 1, j + 1);
      const key2 = makeKey(i + 1, j + 1);
      if (destinations.has(key2)) {
        if (neighbors2 === 1 || neighbors2 === 2) {
          nextDestinations.add(key2);
          updateMinMax(i + 1, j + 1);
        }
      } else {
        if (neighbors2 === 2) {
          nextDestinations.add(key2);
          updateMinMax(i + 1, j + 1);
        }
      }
    }
  }
  destinations = nextDestinations;
  console.log(round, destinations.size);
  round++;
}

// console.log(destinations);
console.log('destinations', destinations.size); // not 692, too low
