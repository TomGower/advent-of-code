import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day22.input', 'utf8');
const secretNumbers = input.split('\n').map(Number);

function findNextSecretNumber(init) {
  const mult = init * 64;
  init = init ^ mult;
  init = ((init % 16777216) + 16777216) % 16777216;
  const div = Math.floor(init / 32);
  init = init ^ div;
  init = ((init % 16777216) + 16777216) % 16777216;
  const mult2 = init * 2048;
  init = init ^ mult2;
  init = ((init % 16777216) + 16777216) % 16777216;
  return init;
}

function getSecretNumber(num, times) {
  for (let i = 0; i < times; i++) {
    num = findNextSecretNumber(num);
  }
  return num;
}

function partOne() {
  let res = 0;
  for (const num of secretNumbers) {
    res += getSecretNumber(num, 2000);
  }
  return res;
}

console.log('The answer to Part One may be', partOne());

function findPriceSequence(num, map) {
  const seen = new Set();
  const changes = [];
  for (let i = 0; i < 2000; i++) {
    const next = findNextSecretNumber(num);
    const delta = (next % 10) - (num % 10);
    changes.push(delta);
    num = next;
    if (changes.length > 3) {
      const key = changes.slice(i - 3).join('~');
      if (seen.has(key)) continue;
      seen.add(key);
      map.set(key, (map.get(key) ?? 0) + (next % 10));
    }
  }
}

function partTwo() {
  const map = new Map();
  for (const num of secretNumbers) {
    findPriceSequence(num, map);
  }
  let max = 0;
  for (const val of map.values()) {
    max = Math.max(max, val);
  }
  return max;
}

console.log('The answer to Part Two may be', partTwo());
