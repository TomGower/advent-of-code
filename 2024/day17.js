import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day17.input', 'utf8');
const [registerValues, programLine] = input.split('\n\n');

const individualRegisters = registerValues.split('\n');
const registers = individualRegisters
  .map((v) => v.split(' ').at(-1))
  .map(Number);

const programString = programLine.split(' ')[1];
const program = programString.split(',').map(Number);

function getComboValue(operand, registers) {
  if (operand <= 3) return operand;
  return registers[operand - 4];
}

function process(program, registers) {
  let pointer = 0;

  const output = [];

  while (pointer < program.length) {
    const [a, b, c] = registers;
    const opcode = program[pointer];
    let operand = program[pointer + 1];
    let nextPointer = pointer + 2;
    if (opcode === 0) {
      operand = getComboValue(operand, registers);
      registers[0] = Math.trunc(a / 2 ** operand);
    }
    if (opcode === 1) {
      registers[1] = (b ^ operand) >>> 0;
    }
    if (opcode === 2) {
      registers[1] = getComboValue(operand, registers) & 7;
    }
    if (opcode === 3) {
      if (a !== 0) {
        nextPointer = operand;
      }
    }
    if (opcode === 4) {
      registers[1] = b ^ c;
    }
    if (opcode === 5) {
      output.push(getComboValue(operand, registers) & 7);
    }
    if (opcode === 6) {
      operand = getComboValue(operand, registers);
      registers[1] = Math.trunc(a / 2 ** operand);
    }
    if (opcode === 7) {
      operand = getComboValue(operand, registers);
      registers[2] = Math.trunc(a / 2 ** operand);
    }
    pointer = nextPointer;
  }

  return output;
}

function partOne() {
  return process(program, registers).join(',');
}

console.log('The answer to Part One may be', partOne());

function partTwo() {
  let j = 0;
  for (let i = program.length - 1; i >= 0; i--) {
    j *= 8;
    const currTarget = program.slice(i).join(',');
    while (true) {
      const curr = process(program, [j, 0, 0]).join(',');
      if (curr === currTarget) {
        break;
      }
      j++;
    }
  }
  return j;
}

console.log('The answer to Part Two may be', partTwo());
