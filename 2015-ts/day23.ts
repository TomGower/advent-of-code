import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day23.input', 'utf8');
const instructions = input.split('\n');

function partOne() {
  const registers = {
    a: 0,
    b: 0,
  };
  let i = 0;
  while (i < instructions.length) {
    const orders = instructions[i].split(' ');
    const order = orders[0];
    if (order === 'jmp') {
      i += parseInt(orders[1]);
    } else if (order === 'jie') {
      const register = orders[1][0] as 'a' | 'b';
      if (registers[register] % 2 === 0) {
        i += parseInt(orders[2]);
      } else {
        i++;
      }
    } else if (order === 'jio') {
      const register = orders[1][0] as 'a' | 'b';
      if (registers[register] === 1) {
        i += parseInt(orders[2]);
      } else {
        i++;
      }
    } else if (order === 'inc') {
      const register = orders[1][0] as 'a' | 'b';
      registers[register]++;
      i++;
    } else if (order === 'tpl') {
      const register = orders[1][0] as 'a' | 'b';
      registers[register] *= 3;
      i++;
    } else if (order === 'hlf') {
      const register = orders[1][0] as 'a' | 'b';
      registers[register] /= 2;
      i++;
    } else {
      throw new Error(`unknown order ${order}`);
    }
  }
  return registers.b;
}

console.time('one');
console.log('The answer to Part One may be', partOne());
console.timeEnd('one');

function partTwo() {}

console.time('two');
console.log('The answer to Part Two may be', partTwo());
console.timeEnd('two');
