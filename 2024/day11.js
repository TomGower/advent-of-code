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

function partTwo() {}

console.log('The answer to Part Two may be', partTwo());
