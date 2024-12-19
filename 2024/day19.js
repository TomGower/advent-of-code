import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day19.input', 'utf8');
const [towels, patterns] = input.split('\n\n');
const towelPatterns = towels.split(', ');
const targets = patterns.split('\n');

function canMakeTowel(patterns, target) {
  const len = target.length;
  const memo = new Array(len + 1).fill(false);
  const patternSet = new Set(patterns);

  memo[0] = true;
  for (let i = 0; i < len; i++) {
    if (!memo[i]) continue;
    for (let j = i; j <= len; j++) {
      if (patternSet.has(target.slice(i, j))) memo[j] = true;
    }
  }

  return memo[len];
}

function partOne() {
  let count = 0;
  for (const target of targets) {
    if (canMakeTowel(towelPatterns, target)) count++;
  }
  return count;
}

console.log('The answer to Part One may be', partOne());

function partTwo() {}

console.log('The answer to Part Two may be', partTwo());
