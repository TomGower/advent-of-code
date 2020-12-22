import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const passwordArray = readFileSync(__dirname + '/inputs/day02.input', 'utf8').split('\n');

function partOne() {
  let countValid = 0;
  
  for (let i = 0; i < passwordArray.length; i++) {
    const elements = passwordArray[i].split(' ');
    const nums = elements[0].split('-');
    const min = +nums[0];
    const max = +nums[1];
    const target = elements[1][0];
    const password = elements[2];
  
    const chars = {};
    for (let j = 0; j < password.length; j++) {
      const char = password[j];
      chars[char] ? chars[char]++ : chars[char] = 1;
    }
    if (chars[target] && chars[target] >= min && chars[target] <= max) countValid++;
  }

  console.log('part one', countValid);
}

partOne();

function partTwo() {
  let countValid = 0;

  for (let i = 0; i < passwordArray.length; i++) {
    const elements = passwordArray[i].split(' ');
    const nums = elements[0].split('-');
    const first = +nums[0];
    const second = +nums[1];
    const target = elements[1][0];
    const password = elements[2];
    // console.log(first, second, target, password);

    let count = 0; 
    if (password[first - 1] === target) count++;
    if (password[second - 1] === target) count++;
    if (count === 1) countValid++;
  }

  console.log('part two', countValid);

}

partTwo();