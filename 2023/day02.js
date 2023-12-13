import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const values = readFileSync(__dirname + '/2023/inputs/day02.input', 'utf8').split('\n');

// possible values: 12 red cubes, 13 green cubes, 14 blue cubes
const valuesMinusGameInfo = values.map(v => v.split(':')[1].trimStart());

let p1Count = 0;

const limits = {
  'red': 12,
  'green': 13,
  'blue': 14
};

for (let j = 0; j < valuesMinusGameInfo.length; j++) {
  const v = valuesMinusGameInfo[j];
  const parts = v.split(';').map(s => s.trim().split('').filter(v => v !== ',').join('').split(' '));
  let isValid = true;
  for (const part of parts) {
    if (!isValid) continue;
    for (let i = 0; i < part.length; i += 2) {
      const n = +part[i];
      const color = part[i + 1];
      if (n > limits[color]) isValid = false;
    }
  }
  console.log(parts, isValid)
  if (isValid) p1Count += (j + 1);
}

console.log('part 1', p1Count); // 2101, correct
