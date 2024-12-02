import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const values = readFileSync(__dirname + '/inputs/day02.input', 'utf8').split(
  '\n'
);

function isDecreasing(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] >= arr[i - 1]) return false;
  }
  return true;
}

function isIncreasing(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] <= arr[i - 1]) return false;
  }
  return true;
}

function gap1to3(arr) {
  for (let i = 1; i < arr.length; i++) {
    const diff = Math.abs(arr[i] - arr[i - 1]);
    if (diff < 1 || diff > 3) return false;
  }
  return true;
}

function partOne() {
  const reports = values.map((v) => v.split(' ').map((n) => +n));
  return reports.filter(
    (v) => (isIncreasing(v) || isDecreasing(v)) && gap1to3(v)
  ).length;
}

console.log('The answer to Part One may be', partOne());

function partTwo() {}

console.log('The answer to Part Two may be', partTwo());
