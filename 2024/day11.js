import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day11.input', 'utf8');
const digits = input.split(' ');
const test = '125 17'.split(' ');

function processStone(stone, moves) {
  if (moves === 0) return 1;
  if (stone === '0') return processStone('1', moves - 1);
  if (stone.length % 2 === 0) {
    const left = stone.slice(0, stone.length / 2);
    let right = stone.slice(stone.length / 2);
    while (right.startsWith('0')) right = right.slice(1);
    if (!right) right = '0';
    return [left, right].reduce(
      (acc, curr) => acc + processStone(curr, moves - 1),
      0
    );
  }
  return processStone('' + Number(stone) * 2024, moves - 1);
}

function partOne() {
  return digits.reduce((acc, curr) => acc + processStone(curr, 25), 0);
}

console.log('The answer to Part One may be', partOne());

// function getTotal(arr, moves) {
//   return arr.reduce(
//     (acc, curr) => acc + processStonesBetter(curr, moves - 1),
//     0
//   );
// }

// WRONG APPROACH
// function processStonesBetter(stone, moves) {
//   if (moves === 0) return 1;
//   if (memo.has(stone)) {
//     const input = memo.get(stone);
//     return getTotal(input, moves);
//   }
//   if (stone === '0') {
//     memo.set('0', ['1']);
//     return getTotal(memo.get(stone), moves - 1);
//   }
//   if (stone.length % 2 === 0) {
//     const left = stone.slice(0, stone.length / 2);
//     let right = stone.slice(stone.length / 2);
//     while (right.startsWith('0')) right = right.slice(1);
//     if (!right) right = '0';
//     memo.set([left, right]);
//     return getTotal([left, right], moves - 1);
//   }
//   const val = ['' + Number(stone) * 2024];
//   memo.set(stone, [val]);
//   return getTotal([val], moves - 1);
// }

function simulateTurn(nums, moves) {
  let map = new Map();

  for (const num of nums) {
    map.set(num, (map.get(num) ?? 0) + 1);
  }

  for (let i = 0; i < moves; i++) {
    const nextMap = new Map();
    for (const [num, count] of map) {
      const nextNums = [];
      if (num === 0) {
        nextNums.push(1);
      } else {
        const digitCount = Math.floor(Math.log10(num)) + 1;
        if (digitCount % 2 === 0) {
          const midpoint = 10 ** (digitCount / 2);
          const left = Math.floor(num / midpoint);
          const right = num % midpoint;
          nextNums.push(left, right);
        } else {
          nextNums.push(num * 2024);
        }
      }
      for (const newNum of nextNums) {
        nextMap.set(newNum, (nextMap.get(newNum) ?? 0) + count);
      }
    }
    map = nextMap;
  }

  let res = 0;
  for (const val of map.values()) {
    res += val;
  }
  return res;
}

function partTwo() {
  // return digits.reduce((acc, curr) => acc + processStone(curr, 75), 0);
  const nums = digits.map(Number);
  return simulateTurn(nums, 75);
}

console.log('The answer to Part Two may be', partTwo());
