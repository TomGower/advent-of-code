import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/2023/inputs/day09.input', 'utf8').split('\n');

const values = input.map(v => v.split(' ').map(v => +v));

function flattenDiffs(nums) {
  const history = [];
  let curr = nums;
  while (true) {
    if (curr.every(v => v === 0)) return history;
    history.push(curr);
    const next = [];
    for (let i = 1; i < curr.length; i++) {
      next.push(curr[i] - curr[i - 1]);
    }
    curr = next;
  }
}

function findLastNumber(history) {
  return history.reduce((acc, curr) => acc + curr[curr.length - 1], 0);
}

const p1 = values.map(flattenDiffs).map(findLastNumber).reduce((acc, curr) => acc + curr, 0);

console.log('part one', p1); // 1953784198

function findFirstNumber(history) {
  let acc = 0;
  for (let i = history.length - 1; i >= 0; i--) {
    acc = history[i][0] - acc;
  }
  return acc;
}

const p2 = values.map(flattenDiffs).map(findFirstNumber).reduce((acc, curr) => acc + curr, 0);

console.log('part two', p2);
