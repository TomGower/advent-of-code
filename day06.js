import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const answers = readFileSync(__dirname + '/inputs/day06.input', 'utf8').split('\n\n');

const partOne = () => {
  let count = 0;
  for (const answer of answers) {
    let qs = new Set();
    for (let j = 0; j < answer.length; j++) {
      if (answer[j] !== '\n') qs.add(answer[j]);
    }
    count += qs.size;
  }

  console.log('part one', count);
}

partOne(); // 6683

const partTwo = () => {
  let count = 0;
  for (const answer of answers) {
    let qs = {};
    let target = 1;
    for (const char of answer) {
      if (char === '\n') target++;
      else qs[char] ? qs[char]++ : qs[char] = 1;
    }
    for (let keys in qs) {
      if (qs[keys] === target) count++;
    }
  }

  console.log('part two', count);
}

partTwo(); // 3122