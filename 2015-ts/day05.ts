import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day05.input', 'utf8');
const strings = input.split('\n');

function isNice(s: string): boolean {
  const vowels = new Set('aeiou');
  const badStrings = new Set(['ab', 'cd', 'pq', 'xy']);

  let vowelCount = vowels.has(s[s.length - 1]) ? 1 : 0;
  let hasDouble = false;
  for (let i = 0; i < s.length - 1; i++) {
    if (badStrings.has(s.substring(i, i + 2))) return false;
    if (vowels.has(s[i])) vowelCount++;
    if (s[i] === s[i + 1]) hasDouble = true;
  }

  return hasDouble && vowelCount >= 3;
}

function partOne() {
  return strings.filter(isNice).length;
}

console.log('The answer to Part One may be', partOne());

function isBetterNice(s: string): boolean {
  let hasTwoAway = false;
  for (let i = 0; i < s.length - 2; i++) {
    if (s[i] === s[i + 2]) {
      hasTwoAway = true;
      break;
    }
  }
  if (!hasTwoAway) return false;
  for (let i = 0; i < s.length - 3; i++) {
    const pair = s.slice(i, i + 2);
    for (let j = i + 2; j < s.length; j++) {
      const nextPair = s.slice(j, j + 2);
      if (pair === nextPair) return true;
    }
  }
  return false;
}

function partTwo() {
  return strings.filter(isBetterNice).length;
}

console.log('The answer to Part Two may be', partTwo());
