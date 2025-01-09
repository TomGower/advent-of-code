import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day11.input', 'utf8');
const baseVal = 'a'.charCodeAt(0);

const iVal = 'i'.charCodeAt(0) - baseVal;
const lVal = 'l'.charCodeAt(0) - baseVal;
const oVal = 'o'.charCodeAt(0) - baseVal;
const badValues = new Set([iVal, lVal, oVal]);

function isValid(chars: number[]): boolean {
  const charValues = new Set([chars]);
  if (charValues.size > chars.length - 2) return false; // does not have 2+ duplicates
  if (badValues.intersection(charValues).size > 0) return false;
  let hasTwoDuplicates = false;
  let hasDuplicate = false;
  for (let i = 1; i < chars.length; i++) {
    if (chars[i] === chars[i - 1]) {
      if (hasDuplicate) {
        hasTwoDuplicates = true;
      } else {
        hasDuplicate = true;
        i++;
      }
    }
  }
  if (!hasTwoDuplicates) return false;
  for (let i = 2; i < chars.length; i++) {
    if (chars[i] === chars[i - 1] + 1 && chars[i] === chars[i - 2] + 2)
      return true;
  }
  return false;
}

function incrementPassword(password: number[]): number[] {
  let carryover = true;
  let idx = password.length - 1;
  while (carryover && idx >= 0) {
    carryover = false;
    password[idx]++;
    if (badValues.has(password[idx])) {
      password[idx]++;
      for (let j = idx + 1; j < password.length; j++) {
        password[j] = 0;
        return password;
      }
    }
    if (password[idx] >= 26) {
      password[idx] %= 26;
      carryover = true;
    }
    idx--;
  }
  return password;
}

function partOne() {
  let password = input.split('').map((v) => v.charCodeAt(0) - baseVal);

  while (true) {
    if (isValid(password)) break;
    password = incrementPassword(password);
  }
  return password.map((v) => String.fromCharCode(baseVal + v)).join('');
}

console.log('The answer to Part One may be', partOne());

function partTwo() {
  let password = partOne()
    .split('')
    .map((v) => v.charCodeAt(0) - baseVal);
  password = incrementPassword(password);

  while (true) {
    if (isValid(password)) break;
    password = incrementPassword(password);
  }
  return password.map((v) => String.fromCharCode(baseVal + v)).join('');
}

console.log('The answer to Part Two may be', partTwo());
