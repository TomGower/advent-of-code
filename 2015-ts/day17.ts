import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day17.input', 'utf8');
const containerSizes = input.split('\n').map(Number);
// const testContainers = [20, 10, 15, 5, 5];

function partOne() {
  const target = 150;
  // const target = 25;
  const dp: number[] = new Array(150 + 1).fill(0);
  dp[0] = 1;
  for (const container of containerSizes) {
    for (let i = target; i >= container; i--) {
      dp[i] += dp[i - container];
    }
  }
  return dp[target];
}

console.log('The answer to Part One may be', partOne());

function partTwo() {}

console.log('The answer to Part Two may be', partTwo());
