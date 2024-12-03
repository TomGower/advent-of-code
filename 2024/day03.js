import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day03.input', 'utf8').split(
  '\n'
);

const test =
  "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

function partOne() {
  return input.map(parse).reduce((acc, curr) => acc + curr, 0);
}

console.log('The answer to Part One may be', partOne());

function getValue(matches) {
  if (!matches) return 0;
  let res = 0;
  for (const match of matches) {
    const numExp = /(\d{1,3}),(\d{1,3})/;
    const numMatch = match.match(numExp);
    res += +numMatch[1] * +numMatch[2];
  }
  return res;
}

function parse(s) {
  const exp = /mul\(\d{1,3},\d{1,3}\)/g;
  if (typeof s !== 'string')
    throw new Error(`${s} is not a string, s is a ${typeof s}`);
  const matches = s.match(exp);
  return getValue(matches);
}

function partTwo() {
  let res = 0;

  // const modifiedInput = readFileSync(
  //   __dirname + '/inputs/day03a.input',
  //   'utf8'
  // ).split('\n');
  // return modifiedInput.map(parse).reduce((acc, curr) => acc + curr, 0);

  const joinedInput = input.join('');
  // const joinedInput = test;

  const rows = joinedInput.split("don't()");
  res += parse(rows[0]);
  const modifiedRows = rows.slice(1);

  for (const row of modifiedRows) {
    const activeRows = row.split('do()').slice(1).join('');
    res += parse(activeRows);
  }

  return res;
}

console.log('The answer to Part Two may be', partTwo());
