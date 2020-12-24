import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const inputArray = readFileSync(__dirname + '/inputs/day24.input', 'utf8').split('\n');

const parseSteps = str => {
  let res = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === 'n' || str[i] === 's') {
      res.push(str.substring(i, i+2));
      i++;
    } else {
      res.push(str[i]);
    }
  }
  return res;
}

const steps = inputArray.map(parseSteps);

