import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day25.input', 'utf8');
const patterns = input.split('\n\n');

function makeLocksAndKeys(patterns) {
  const res = { keys: [], locks: [] };
  for (let p of patterns) {
    p = p.split('\n');
    if (p[0].split('').every((v) => v === '#')) {
      const heights = new Array(p[0].length).fill(0);
      for (let row = 1; row <= 5; row++) {
        for (let col = 0; col < 5; col++) {
          if (p[row][col] === '#') heights[col]++;
        }
      }
      res.locks.push(heights);
    } else {
      const heights = new Array(p[0].length).fill(0);
      for (let row = 5; row >= 1; row--) {
        for (let col = 0; col < 5; col++) {
          if (p[row][col] === '#') heights[col]++;
        }
      }
      res.keys.push(heights);
    }
  }

  return res;
}

function canMatch(key, lock) {
  for (let i = 0; i < key.length; i++) {
    if (key[i] + lock[i] > 5) return false;
  }
  return true;
}

function partOne() {
  const { keys, locks } = makeLocksAndKeys(patterns);

  let res = 0;

  for (const key of keys) {
    for (const lock of locks) {
      if (canMatch(key, lock)) res++;
    }
  }

  return res;
}

console.log('The answer to Part One may be', partOne());

function partTwo() {
  return 'Do you have 49 stars yet?';
}

console.log('The answer to Part Two may be', partTwo());
