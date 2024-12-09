import { PriorityQueue } from '@datastructures-js/priority-queue';
import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day09.input', 'utf8');

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

function binInsert(files, file) {
  const targetIdx = file[1];
  for (let i = 0; i < files.length; i++) {
    const fileIdx = files[i][1];
    if (targetIdx < fileIdx) {
      files.splice(i, 0, file);
      return;
    }
  }
  files.push(file);
}

function getFileSum([len, startIdx, counter]) {
  let res = 0;
  for (let i = 0; i < len; i++) {
    res += (startIdx + i) * counter;
  }
  return res;
}

function partTwo() {
  let files = [];
  const opens = new PriorityQueue(compareOpen);
  let startIdx = 0;
  let counter = 0;
  for (let i = 0; i < input.length; i++) {
    const len = Number(input[i]);
    if (i % 2 === 0) {
      files.push([len, startIdx, counter]);
      counter++;
    } else {
      opens.enqueue([len, startIdx]);
    }
    startIdx += len;
  }
  while (!opens.isEmpty()) {
    const [len, startIdx] = opens.dequeue();
    let availableFileIdx = -1;
    for (let i = files.length - 1; i >= 0; i--) {
      if (files[i][1] < startIdx) break;
      if (files[i][0] <= len) {
        availableFileIdx = i;
        break;
      }
    }
    if (availableFileIdx === -1) continue;
    const availableFile = files[availableFileIdx];
    availableFile[1] = startIdx;
    files.splice(availableFileIdx, 1);
    binInsert(files, availableFile);
    if (len > availableFile[0]) {
      opens.enqueue([len - availableFile[0], startIdx + availableFile[0]]);
    }
  }
  return files.reduce((acc, curr) => acc + getFileSum(curr), 0);
}

console.log('The answer to Part Two may be', partTwo());
