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

function partOne() {
  const possibleCombinations: number[][] = [];
  const groupWeight = totalWeight / 3;

  function generateCombinations(
    target: number,
    idx: number = 0,
    nums: number[] = []
  ): void {
    if (nums.length > 6) return;
    if (target === 0) {
      possibleCombinations.push([...nums]);
      return;
    }
    for (let i = idx; i < weights.length; i++) {
      if (weights[i] > target) continue;
      if (maxSuffixWeight[i] < target) continue;
      nums.push(weights[i]);
      generateCombinations(target - weights[i], i + 1, nums);
      nums.pop();
    }
  }
  generateCombinations(groupWeight);

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

function partTwo() {}

console.time('two');
console.log('The answer to Part Two may be', partTwo());
console.timeEnd('two');
