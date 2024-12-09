import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day07.input', 'utf8').split(
  '\n'
);
const targetAndNumbers = input
  .map((v) => v.split(': '))
  .map(([target, nums]) => [
    Number(target),
    nums.split(' ').map((v) => Number(v)),
  ]);

function isValidEquation(target, nums, idx, prev) {
  if (idx === nums.length) return target === prev;
  if (prev > target) return false;
  return (
    isValidEquation(target, nums, idx + 1, prev + nums[idx]) ||
    isValidEquation(target, nums, idx + 1, prev * nums[idx])
  );
}

function partOne() {
  let res = 0;
  for (const [target, nums] of targetAndNumbers) {
    if (isValidEquation(target, nums, 1, nums[0])) {
      res += target;
    }
  }
  return res;
}

console.log('The answer to Part One may be', partOne());

function partTwo() {}

console.log('The answer to Part Two may be', partTwo());
