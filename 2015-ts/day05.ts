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

function partTwo() {}

console.log('The answer to Part Two may be', partTwo());
