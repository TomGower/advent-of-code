import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day23.input', 'utf8');
const instructions = input.split('\n');

function operate(registers: Record<'a' | 'b', number>): number {
  let i = 0;
  while (i < instructions.length) {
    const orders = instructions[i].split(' ');
    const order = orders[0];
    const register = orders[1][0] as 'a' | 'b';
    if (order === 'jmp') {
      i += parseInt(orders[1]);
    } else if (order === 'jie') {
      if (registers[register] % 2 === 0) {
        i += parseInt(orders[2]);
      } else {
        i++;
      }
    } else if (order === 'jio') {
      if (registers[register] === 1) {
        i += parseInt(orders[2]);
      } else {
        i++;
      }
    } else if (order === 'inc') {
      registers[register]++;
      i++;
    } else if (order === 'tpl') {
      registers[register] *= 3;
      i++;
    } else if (order === 'hlf') {
      registers[register] /= 2;
      i++;
    } else {
      throw new Error(`unknown order ${order}`);
    }
  }
  return registers.b;
}

function partOne() {
  const registers = {
    a: 0,
    b: 0,
  };
  return operate(registers);
}

console.time('one');
console.log('The answer to Part One may be', partOne());
console.timeEnd('one');

function partTwo() {
  const registers = {
    a: 1,
    b: 0,
  };
  return operate(registers);
}

console.time('two');
console.log('The answer to Part Two may be', partTwo());
console.timeEnd('two');
