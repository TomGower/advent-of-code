import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day20.input', 'utf8');
const inputValue = parseInt(input);

function getFactorTotal(val: number): number {
  const sqrt = Math.ceil(Math.sqrt(val));
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

console.time('one');
console.log('The answer to Part One may be', partOne());
console.timeEnd('one');

function partTwo() {
  const target = inputValue / 11;
  let max = target;
  const vals = new Map();
  for (let i = 1; i <= max; i++) {
    inner: for (let j = 1; j <= 50; j++) {
      const product = i * j;
      if (product >= max) break inner;
      vals.set(product, (vals.get(product) ?? 0) + i);
      if (vals.get(product) >= target) {
        max = product;
      }
    }
  }
  return max;
}

console.time('two');
console.log('The answer to Part Two may be', partTwo());
console.timeEnd('two');
