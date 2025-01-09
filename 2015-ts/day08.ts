import { access, readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day08.input', 'utf8');

function partOne() {
  let codeLength = 0;
  let wordLength = 0;
  const lines = input.split('\n');
  for (const line of lines) {
    codeLength += line.length;
    wordLength += eval(line).length;
  }
  return codeLength - wordLength;
}

console.log('The answer to Part One may be', partOne());

function partTwo() {}

console.log('The answer to Part Two may be', partTwo());
