import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const values = readFileSync(__dirname + '/inputs/day01.input', 'utf8');

function partOne() {
  let openers = 0;
  for (const c of values) {
    openers += c === '(' ? 1 : -1;
  }
  return openers;
}

console.log('The answer to Part One may be', partOne());

function partTwo() {
  let floor = 0;
  for (let i = 0; i < values.length; i++) {
    floor += values[i] === '(' ? 1 : -1;
    if (floor === -1) return i + 1;
  }
}

console.log('The answer to Part Two may be', partTwo());
