import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day05.input', 'utf8').split(
  '\n'
);
const emptyRow = input.indexOf('');
const orderingRules = input
  .slice(0, emptyRow)
  .map((v) => v.split('|').map((n) => Number(n)));
const updates = input
  .slice(emptyRow + 1)
  .map((v) => v.split(',').map((n) => Number(n)));

function isValid(update, inMap) {
  const values = new Set(update);
  const seen = new Set();
  for (const v of update) {
    if (inMap.has(v) && !inMap.get(v).intersection(values).isSubsetOf(seen))
      return false;
    seen.add(v);
  }
  return true;
}

function partOne() {
  const inMap = new Map();
  const outMap = new Map();
  for (const [before, after] of orderingRules) {
    if (!outMap.has(before)) outMap.set(before, new Set());
    outMap.get(before).add(after);
    if (!inMap.has(after)) inMap.set(after, new Set());
    inMap.get(after).add(before);
  }

  let res = 0;

  for (const update of updates) {
    if (isValid(update, inMap)) {
      res += update[Math.floor(update.length / 2)];
    }
  }

  return res;
}

console.log('The answer to Part One may be', partOne());

function partTwo() {}

console.log('The answer to Part Two may be', partTwo());
