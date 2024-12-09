import { PriorityQueue } from '@datastructures-js/priority-queue';
import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day09.input', 'utf8');
// const input = '12345';

function compareFilled(a, b) {
  return b[1] - a[1];
}

function compareOpen(a, b) {
  return a[1] - b[1];
}

function partOne() {
  let startIdx = 0;
  let counter = 0;
  const filledStack = new PriorityQueue(compareFilled);
  const openStack = new PriorityQueue(compareOpen);
  for (let i = 0; i < input.length; i++) {
    const len = Number(input[i]);
    // console.log('len is', len, startIdx, counter);
    if (i % 2 === 0) {
      filledStack.enqueue([len, startIdx, counter]);
      counter++;
    } else {
      openStack.enqueue([len, startIdx]);
    }
    startIdx += len;
  }
  while (!openStack.isEmpty()) {
    if (openStack.front()[1] > filledStack.front()[1]) break;
    const [fileLen, fileStart, counter] = filledStack.dequeue();
    const [openLen, openStart] = openStack.dequeue();
    if (fileLen > openLen) {
      filledStack.enqueue([openLen, openStart, counter]);
      filledStack.enqueue([fileLen - openLen, fileStart, counter]);
    } else {
      filledStack.enqueue([fileLen, openStart, counter]);
      openStack.enqueue([openLen - fileLen, openStart + fileLen]);
    }
  }
  let res = 0;
  while (!filledStack.isEmpty()) {
    const [len, startIdx, counter] = filledStack.dequeue();
    for (let i = 0; i < len; i++) {
      res += (startIdx + i) * counter;
    }
  }
  return res;
}

console.log('The answer to Part One may be', partOne());

function partTwo() {}

console.log('The answer to Part Two may be', partTwo());
