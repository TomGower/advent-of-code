import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const inputArray = readFileSync(__dirname + '/inputs/day04.input', 'utf8').split('\n\n');

for (let i = 0; i < inputArray.length; i++) {
  let curr = inputArray[i];
  let lineSplit = curr.split('\n');
  let final = [];
  for (const item of lineSplit) {
    const input = item.split(' ');
    if (input !== item) {
      final = final.concat(input);
    } else {
      final.push(input);
    }
  }
  inputArray[i] = final;
}

function partOne() {
  let fieldNames = new Set(['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']);
  let count = 0;

  for (const fields of inputArray) {
    const currentFields = new Set();
    for (const field of fields) {
      const fieldName = field.split(':')[0];
      currentFields.add(fieldName);
    }
    let hasFields = true;
    for (const name of fieldNames) {
      if (!currentFields.has(name)) {
        hasFields = false;
        break;
      }
    }
    if (hasFields) count++;
  }

  console.log('part one', count);
}

partOne(); //not 288

function partTwo() {
  let count = 0;
  let targetFields = new Set(['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']);

  for (let i = 0; i < inputArray.length; i++) {
    let curr = inputArray[i];
    let fields = {};
    for (let j = 0; j < curr.length; j++) {
      let data = curr[j].split(':');
      fields[data[0]] = data[1];
    }
    let hasFields = true;
    for (let item of targetFields) {
      if (fields[item]) continue;
      else {
        hasFields = false;
        break;
      }
    }
    if (!hasFields) continue;
    if (+fields['byr'] > 2002 || +fields['byr'] < 1920) continue;
    if (+fields['iyr'] > 2020 || +fields['iyr'] < 2010) continue;
    if (+fields['eyr'] > 2030 || +fields['eyr'] < 2020) continue;
    if (fields['hgt'].slice(-2) === 'cm') {
      let hgt = +fields['hgt'].slice(0, -2);
      if (hgt < 150 || hgt > 193) continue;
    } else {
      let hgt = +fields['hgt'].slice(0, -2);
      if (hgt < 59 || hgt > 76) continue;
    }
    if (fields['hcl'][0] !== '#') {
      continue;
    }
    let hcl = fields['hcl'].slice(1);
    if (hcl.length !== 6) continue;
    if (/^[0-9a-f]+$/.test(hcl) === false) continue;
    const eyeColors = new Set(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']);
    if (!eyeColors.has(fields['ecl'])) continue;
    if (fields['pid'].length !== 9 || /^\d+$/.test(fields['pid']) !== true) continue;
    count++;
  }

  console.log('part two', count);
}

partTwo();