import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));

function parseInput(row) {
  const [string, strArrangement] = row.split(' ');
  const arrangement = strArrangement.split(',').map(v => +v);
  return [string, arrangement];
}

function countArrangements(str, arr, si = 0, ai = 0, count = 0, memo = new Map) {
  if (si === str.length && (ai === arr.length || (count === arr[ai] && ai === arr.length - 1))) return 1;
  if (si === str.length) return 0;
  const key = `${str}~${si}~${ai}~${count}`;
  if (memo.has(key)) return memo.get(key);
  if (str[si] === '#') {
    if (ai === arr.length) return 0;
    if (count > arr[ai]) return 0;
    const res = countArrangements(str, arr, si + 1, ai, count + 1, memo);
    memo.set(key, res);
    return res;
  } else if (str[si] === '.') {
    if (count === 0) {
      const res = countArrangements(str, arr, si + 1, ai, count, memo);
      memo.set(key, res);
      return res;
    } else {
      if (count !== arr[ai]) return 0;
      const res = countArrangements(str, arr, si + 1, ai + 1, 0, memo);
      memo.set(key, res);
      return res;
    }
  } else {
    // wild card, could be # or ., do both cases

    // must be a .
    if (count === arr[ai]) {
      const res = countArrangements(str, arr, si + 1, ai + 1, 0, memo);
      memo.set(key, res);
      return res;
    }
    // must be a #
    if (count > 0 && count < arr[ai]) {
      const res = countArrangements(str, arr, si + 1, ai, count + 1, memo);
      memo.set(key, res);
      return res;
    }
    // out of #
    if (ai === arr.length) {
      const res = countArrangements(str, arr, si + 1, ai, 0, memo);
      memo.set(key, res);
      return res;
    }
    // could be either or, return total of both
    const res = countArrangements(str, arr, si + 1, ai, count + 1, memo) + countArrangements(str, arr, si + 1, ai, count, memo);
    memo.set(key, res);
    return res;
  }
}

console.log(countArrangements('?###????????', [3,2,1]))

function partOne() {
  const input = readFileSync(__dirname + '/2023/inputs/day12.input', 'utf8').split('\n');
  const parsedInput = input.map(parseInput);
  const counts = parsedInput.map(v => countArrangements(v[0], v[1]));

  return counts.reduce((acc, curr) => acc + curr, 0);
}

const p1 = partOne();

console.log('part one', p1); // 6935
