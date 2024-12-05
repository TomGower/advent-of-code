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

function makeValid(update, outMap) {
  const values = new Set(update);

  const map = new Map();
  for (const v of values) {
    map.set(v, 0);
  }

  const updateOutMap = new Map();

  for (const v of values) {
    const outdegree = outMap.get(v) ?? new Set();
    const updateOuts = outdegree.intersection(values);
    updateOutMap.set(v, updateOuts);
    for (const v of updateOuts) {
      map.set(v, map.get(v) + 1);
    }
  }

  const res = [];

  let current;

  for (const [k, v] of map) {
    if (v === 0) {
      current = k;
      break;
    }
  }

  while (res.length < update.length) {
    res.push(current);
    const outs = updateOutMap.get(current) ?? new Set();
    let next;
    for (const v of outs) {
      map.set(v, map.get(v) - 1);
      if (map.get(v) === 0) next = v;
    }
    current = next;
  }

  return res;
}

function partTwo() {
  const inMap = new Map();
  const outMap = new Map();
  for (const [before, after] of orderingRules) {
    if (!outMap.has(before)) outMap.set(before, new Set());
    outMap.get(before).add(after);
    if (!inMap.has(after)) inMap.set(after, new Set());
    inMap.get(after).add(before);
  }

  const invalidUpdates = updates.filter((v) => !isValid(v, inMap));

  let res = 0;

  for (const update of invalidUpdates) {
    const validUpdate = makeValid(update, outMap);
    res += validUpdate[Math.floor(validUpdate.length / 2)];
  }

  return res;
}

console.log('The answer to Part Two may be', partTwo());
