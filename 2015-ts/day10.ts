import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day10.input', 'utf8');

function lookAndSay(s: string): string {
  const next: string[] = [];
  let count = 1;
  let curr = s[0];
  for (let i = 1; i < s.length; i++) {
    if (s[i] === curr) {
      count++;
    } else {
      next.push('' + count, curr);
      count = 1;
      curr = s[i];
    }
  }
  next.push('' + count, curr);
  return next.join('');
}

function partOne() {
  let curr = input;
  for (let i = 0; i < 40; i++) {
    curr = lookAndSay(curr);
  }
  return curr.length;
}

console.log('The answer to Part One may be', partOne());

function partTwo() {
  let curr = input;
  for (let i = 0; i < 50; i++) {
    curr = lookAndSay(curr);
  }
  return curr.length;
}

console.log('The answer to Part Two may be', partTwo());
