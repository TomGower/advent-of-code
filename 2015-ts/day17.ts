import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day17.input', 'utf8');
const containerSizes = input.split('\n').map(Number);

function partOne() {
  const target = 150;
  const dp: number[] = new Array(target + 1).fill(0);
  dp[0] = 1;
  for (const container of containerSizes) {
    for (let i = target; i >= container; i--) {
      dp[i] += dp[i - container];
    }
  }
  return dp[target];
}

console.log('The answer to Part One may be', partOne());

function findMinContainers(target: number, containerSizes: number[]): number {
  const dp: number[] = new Array(target + 1).fill(Infinity);
  dp[0] = 0;
  for (const container of containerSizes) {
    for (let i = target; i >= container; i--) {
      dp[i] = Math.min(dp[i], dp[i - container] + 1);
    }
  }
  return dp[target];
}

function dfs(start: number, volume: number, containers: number): number {
  let res = 0;
  if (volume === 0 && containers === 0) return 1;
  if (containers === 0 || volume < 0) return 0;
  for (let j = start; j < containerSizes.length; j++) {
    res += dfs(j + 1, volume - containerSizes[j], containers - 1);
  }
  return res;
}

function partTwo() {
  const target = 150;
  const minContainers = findMinContainers(target, containerSizes);
  return dfs(0, target, minContainers);
}

console.log('The answer to Part Two may be', partTwo());
