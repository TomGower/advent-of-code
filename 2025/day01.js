import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const values = readFileSync(__dirname + '/inputs/day01.input', 'utf8').split(
  '\n'
);

function partOne() {
  const mod = 100;
  let curr = 50;
  let res = 0;
  for (const row of values) {
    const steps = parseInt(row.slice(1));
    if (row[0] === 'L') curr = (curr - steps + mod) % mod;
    else curr = (curr + steps) % mod;
    if (curr === 0) res++;
  }
  return res;
}

console.log('the answer to part one may be', partOne());
