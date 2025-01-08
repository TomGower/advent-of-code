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

function partTwo() {}

console.log('The answer to Part Two may be', partTwo());
