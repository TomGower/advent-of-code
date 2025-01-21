import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day20.input', 'utf8');
const inputValue = parseInt(input);

function getFactorTotal(val: number): number {
  const sqrt = Math.sqrt(val);
  let total = 0;
  for (let i = 1; i < sqrt; i++) {
    if (val % i === 0) {
      total += i + val / i;
    }
  }
  if (sqrt ** 2 === val) total += sqrt;
  return total;
}

function partOne() {
  const target = inputValue / 10;
  let val = 0;
  while (true) {
    const factorTotal = getFactorTotal(val);
    if (factorTotal >= target) return val;
    val++;
  }
}

console.log('The answer to Part One may be', partOne());

function partTwo() {}

console.log('The answer to Part Two may be', partTwo());
