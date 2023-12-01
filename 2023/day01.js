import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const values = readFileSync(__dirname + '/2023/inputs/day01.input', 'utf8').split('\n');

const numbers = new Set('0123456789');

function getNumbers(s) {
  let res = [];
  for (const c of s) {
    if (numbers.has(c)) {
      if (res.length === 0) {
        res.push(c, c);
      } else {
        res[1] = c;
      }
    }
  }
  return +(res.join(''));
}
const integers = values.map(getNumbers);

console.log('part one', integers.reduce((acc, curr) => acc + curr, 0));

const numStrings = new Set(['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']);
const matchStrings = new Map([
  ['zero', 0],
  ['one', 1],
  ['two', 2],
  ['three', 3],
  ['four', 4],
  ['five', 5],
  ['six', 6],
  ['seven', 7],
  ['eight', 8],
  ['nine', 9]
]);

function getNumberIncludingStrings(s) {
  const res = [];
  for (let i = 0; i < s.length; i++) {
    const curr = s[i];
    if (numbers.has(curr)) {
      if (res[0] === undefined) res[0] = curr;
      res[1] = curr;
    } else if (numStrings.has(s.slice(i, i + 3))) {
      if (res[0] === undefined) res[0] = matchStrings.get(s.slice(i, i + 3));
      res[1] = matchStrings.get(s.slice(i, i + 3));
    } else if (numStrings.has(s.slice(i, i + 4))) {
      if (res[0] === undefined) res[0] = matchStrings.get(s.slice(i, i + 4));
      res[1] = matchStrings.get(s.slice(i, i + 4));
    } else if (numStrings.has(s.slice(i, i + 5))) {
      if (res[0] === undefined) res[0] = matchStrings.get(s.slice(i, i + 5));
      res[1] = matchStrings.get(s.slice(i, i + 5));
    }
  }
  return +(res.join(''));
}

// console.log(getNumberIncludingStrings('nqninenmvnpsz874')); // 94

const numbersIncludingStrings = values.map(getNumberIncludingStrings);

console.log('part two', numbersIncludingStrings.reduce((acc, curr) => acc + curr, 0));
