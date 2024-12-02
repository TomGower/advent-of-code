import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const values = readFileSync(__dirname + '/inputs/day01.input', 'utf8').split(
  '\n'
);

function partOne() {
  const numbers = values.map((v) => v.split(' ').filter((v) => v));
  const lists = numbers.map((v) => v.map((num) => +num));
  const listOne = lists.map((v) => v[0]).sort((a, b) => a - b);
  const listTwo = lists.map((v) => v[1]).sort((a, b) => a - b);

  return listOne.reduce((acc, curr, i) => acc + Math.abs(curr - listTwo[i]), 0);
}

console.log('The answer to Part One may be', partOne());
