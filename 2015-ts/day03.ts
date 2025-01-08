import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day03.input', 'utf8');

function partOne() {
  const visited = new Set();

  let [row, col] = [0, 0];
  visited.add(`${row}~${col}`);

  for (const d of input) {
    if (d === '^') row--;
    if (d === 'v') row++;
    if (d === '<') col--;
    if (d === '>') col++;
    visited.add(`${row}~${col}`);
  }

  return visited.size;
}

console.log('The answer to Part One may be', partOne());

function partTwo() {}

console.log('The answer to Part Two may be', partTwo());
