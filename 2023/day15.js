import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));

function updateValue(char, val) {
  let code = char.charCodeAt(0);
  val += code;
  val *= 17;
  val %= 256;
  return val;
}

function calculateHash(string) {
  let res = 0;
  for (const c of string) {
    res = updateValue(c, res);
  }
  return res;
}


function partOne() {
  const input = readFileSync(__dirname + '/2023/inputs/day15.input', 'utf8');
  const steps = input.split(',');
  
  let res = 0;
  steps.reduce((acc, curr) => {
    const val = calculateHash(curr, acc)
    res += val;
    return val;
  }, 0);
  
  return res;
}

const p1 = partOne();

console.log('part one', p1); // 521341
