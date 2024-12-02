import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const values = readFileSync(__dirname + '/inputs/day01.input', 'utf8').split(
  '\n'
);

const numbers = values.map((v) => v.split(' ').filter((v) => v));
const lists = numbers.map((v) => v.map((num) => +num));
const listOne = lists.map((v) => v[0]).sort((a, b) => a - b);
const listTwo = lists.map((v) => v[1]).sort((a, b) => a - b);

function partOne() {
  return listOne.reduce((acc, curr, i) => acc + Math.abs(curr - listTwo[i]), 0);
}

console.log('The answer to Part One may be', partOne());

function partTwo() {
  const mapOne = new Map();
  const mapTwo = new Map();
  // const listOne = [3, 4, 2, 1, 3, 3];
  // const listTwo = [4, 3, 5, 3, 9, 3];

  for (const v of listOne) {
    mapOne.set(v, (mapOne.get(v) ?? 0) + 1);
  }

  for (const v of listTwo) {
    mapTwo.set(v, (mapTwo.get(v) ?? 0) + 1);
  }

  let res = 0;
  for (const v of listOne) {
    res += v * (mapTwo.get(v) ?? 0);
  }

  return res;
}

console.log('The answer to Part Two may be', partTwo());
