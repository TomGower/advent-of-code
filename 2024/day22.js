import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day22.input', 'utf8');
const secretNumbers = input.split('\n').map(Number);

function mix(num, secret) {
  return num ^ secret;
}

function prune(num) {
  return num % 16777216;
}

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

function partTwo() {}

console.log('The answer to Part Two may be', partTwo());
