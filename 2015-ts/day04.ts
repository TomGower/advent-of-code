import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
import crypto from 'crypto';
const input = readFileSync(__dirname + '/inputs/day04.input', 'utf8');

function partOne() {
  let num = 1;
  while (true) {
    const hash = crypto
      .createHash('md5')
      .update(`${input}${num}`)
      .digest('hex');
    if (hash.startsWith('0'.repeat(5))) return num;
    num++;
  }
}

console.log('The answer to Part One may be', partOne());

function partTwo() {}

console.log('The answer to Part Two may be', partTwo());
