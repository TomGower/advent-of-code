import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day24.input', 'utf8');
const weights = input.split('\n').map(Number).reverse();
const totalWeight = weights.reduce((acc, curr) => acc + curr, 0);
const maxSuffixWeight = new Array(weights.length).fill(weights.at(-1));
for (let i = weights.length - 2; i >= 0; i--) {
  maxSuffixWeight[i] = weights[i] + maxSuffixWeight[i + 1];
}

function generateCombinations(
  target: number,
  maxSize: number,
  combinations: number[][],
  idx: number = 0,
  nums: number[] = []
): void {
  if (nums.length > maxSize) return;
  if (target === 0) {
    combinations.push([...nums]);
    return;
  }
  for (let i = idx; i < weights.length; i++) {
    if (weights[i] > target) continue;
    if (maxSuffixWeight[i] < target) continue;
    nums.push(weights[i]);
    generateCombinations(
      target - weights[i],
      maxSize,
      combinations,
      i + 1,
      nums
    );
    nums.pop();
  }
}

function partOne() {
  const possibleCombinations: number[][] = [];
  const groupWeight = totalWeight / 3;
  // manually calculate minimum possible group size off groupWeight

  generateCombinations(groupWeight, 6, possibleCombinations);

  // this totally didn't have to work, but it did
  let minProduct = Infinity;
  for (const combo of possibleCombinations) {
    const product = combo.reduce((acc, curr) => acc * curr, 1);
    minProduct = Math.min(minProduct, product);
  }

  return minProduct;
}

console.time('one');
console.log('The answer to Part One may be', partOne());
console.timeEnd('one');

function partTwo() {
  const possibleCombinations: number[][] = [];
  const groupWeight = totalWeight / 4;
  // manually calculate minimum possible group size off groupWeight

  generateCombinations(groupWeight, 5, possibleCombinations);

  // again, this totally didn't have to work, but it did
  let minProduct = Infinity;
  for (const combo of possibleCombinations) {
    const product = combo.reduce((acc, curr) => acc * curr, 1);
    minProduct = Math.min(minProduct, product);
  }

  return minProduct;
}

console.time('two');
console.log('The answer to Part Two may be', partTwo());
console.timeEnd('two');
