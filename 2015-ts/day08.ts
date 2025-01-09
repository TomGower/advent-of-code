import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day08.input', 'utf8');
const lines = input.split('\n');

function partOne() {
  let codeLength = 0;
  let wordLength = 0;
  for (const line of lines) {
    codeLength += line.length;
    wordLength += eval(line).length;
  }
  return codeLength - wordLength;
}

console.log('The answer to Part One may be', partOne());

function calculateEncodedLength(s: string): number {
  let len = s.length + 2;
  for (const c of s) {
    if (c === '"') len++;
    if (c === '\\') len++;
  }
  return len;
}

function partTwo() {
  const rawInput = readFileSync(__dirname + '/inputs/day08.input', 'ascii');
  const rawLines = rawInput.split('\n');
  let codeLength = 0;
  let encodedLength = 0;
  for (let i = 0; i < lines.length; i++) {
    codeLength += lines[i].length;
    encodedLength += calculateEncodedLength(rawLines[i]);
  }

  return encodedLength - codeLength;
}

console.log('The answer to Part Two may be', partTwo());
