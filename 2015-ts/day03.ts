import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day03.input', 'utf8');

function findHouses(directions: string): Set<string> {
  const visited: Set<string> = new Set();

  let [row, col] = [0, 0];
  visited.add(`${row}~${col}`);

  for (const d of directions) {
    if (d === '^') row--;
    if (d === 'v') row++;
    if (d === '<') col--;
    if (d === '>') col++;
    visited.add(`${row}~${col}`);
  }

  return visited;
}

function partOne() {
  return findHouses(input).size;
}

console.log('The answer to Part One may be', partOne());

function partTwo() {
  const santaDirections = input
    .split('')
    .filter((_v, i) => i % 2 === 0)
    .join('');
  const roboSantaDirections = input
    .split('')
    .filter((_v, i) => i % 2 === 1)
    .join('');

  return findHouses(santaDirections).union(findHouses(roboSantaDirections))
    .size;
}

console.log('The answer to Part Two may be', partTwo());
