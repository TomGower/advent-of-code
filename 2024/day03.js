import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day03.input', 'utf8').split(
  '\n'
);

function partOne() {
  let res = 0;

  for (const row of input) {
    const exp = /mul\(\d{1,3},\d{1,3}\)/g;
    const matches = row.match(exp);
    for (const match of matches) {
      const numExp = /(\d{1,3}),(\d{1,3})/;
      const numMatch = match.match(numExp);
      res += +numMatch[1] * +numMatch[2];
    }
  }

  return res;
}

console.log('The answer to Part One may be', partOne());

function partTwo() {}

console.log('The answer to Part Two may be', partTwo());
