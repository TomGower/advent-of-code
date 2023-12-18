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

function partTwo() {
  const input = readFileSync(__dirname + '/2023/inputs/day15.input', 'utf8');
  // const input = 'rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7';
  const steps = input.split(',');
  const boxes = new Array(256).fill().map(_ => []);

  for (const s of steps) {
    const split = s.includes('=') ? s.indexOf('=') : s.indexOf('-');
    const label = s.slice(0, split);
    const focalLength = s.slice(split + 1);
    const value = calculateHash(label);
    if (!focalLength) {
      // splitter is dash
      const idx = boxes[value].findIndex((el) => el[0] === label);
      if (idx !== -1) {
        boxes[value].splice(idx, 1);
      }
    } else {
      // splitter is =
      const idx = boxes[value].findIndex((el) => el[0] === label);
      if (idx !== -1) {
        boxes[value].splice(idx, 1, [label, focalLength]);
      } else {
        boxes[value].push([label, focalLength])
      }
    }
  }

  return boxes.reduce((accBox, currBox, idxBox) => accBox + currBox.reduce((accLens, currLens, idxLens) => accLens + (idxBox + 1) * (idxLens + 1) * currLens[1], 0), 0)
}

const p2 = partTwo();

console.log('part two', p2); // 252782
