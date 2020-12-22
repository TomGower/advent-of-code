import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const inputArray = readFileSync(__dirname + '/inputs/day11.input', 'utf8').split('\n');

let emptyArray = new Array(inputArray.length).fill([]);

const partOne = () => {
  
  const iterate = (prev) => {
    
    const checkAdjacent = (i, j) => {
      let count = 0;
      if (i > 0 && j > 0) prev[i-1][j-1] === '#' ? count++ : null;
      if (i > 0) prev[i-1][j] === '#' ? count++ : null;
      if (i > 0 && j < inputArray[0].length - 1) prev[i-1][j+1] === '#' ? count++ : null;
      if (j > 0) prev[i][j-1] === '#' ? count++ : null;
      if (j < inputArray[0].length - 1) prev[i][j+1] === '#' ? count++ : null;
      if (i < inputArray.length - 1 && j > 0) prev[i+1][j-1] === '#' ? count++ : null;
      if (i < inputArray.length - 1) prev[i+1][j] === '#' ? count++ : null;
      if (i < inputArray.length - 1 && j < inputArray[0].length - 1) prev[i+1][j+1] === '#' ? count++ : null;
      return count;
    }

    let next = new Array(inputArray.length);
    for (let i = 0; i < next.length; i++) {
      next[i] = [];
    }

    let diffs = 0;

    for (let i = 0; i < prev.length; i++) {
      for (let j = 0; j < prev[i].length; j++) {
        if (prev[i][j] === '.') {
          next[i][j] = '.';
        } else if (prev[i][j] === 'L') {
          if (checkAdjacent(i, j) === 0) {
            next[i][j] = '#';
            diffs++;
          }
          else next[i][j] = 'L';
        } else { // prev[i][j] === '#'
          if (checkAdjacent(i, j) >= 4) {
            next[i][j] = 'L';
            diffs++;
          }
          else next[i][j] = '#';
        }
      }
    }

    return [next, diffs];
  }

  let curr = inputArray;
  let nextArray;
  let iterationCount = 0;
  while (true) {
    nextArray = iterate(curr);
    if (nextArray[1] === 0) break;
    curr = nextArray[0];
    iterationCount++;
  }

  let occupied = 0;
  for (let i = 0; i < nextArray[0].length; i++) {
    for (let j = 0; j < nextArray[0][i].length; j++) {
      if (nextArray[0][i][j] === '#') occupied++;
    }
  }

  console.log('part one', occupied);
}

partOne();

const partTwo = () => {
  
  const iterate = (prev) => {
    
    const checkAdjacent = (arr, i, j) => {
      let count = 0;
      let step = 1;
      while (i-step >= 0 && j-step >= 0) {
        if (arr[i-step][j-step] === '.') step++;
        else if (arr[i-step][j-step] === '#') {count++; break;}
        else break;
      }
      step = 1;
      while (i-step >= 0) {
        if (arr[i-step][j] === '.') step++;
        else if (arr[i-step][j] === '#') {count++; break;}
        else break;
      }
      step = 1;
      while (i-step >= 0 && j + step < inputArray[0].length) {
        if (arr[i-step][j+step] === '.') step++;
        else if (arr[i-step][j+step] === '#') {count++; break;}
        else break;
      }
      step = 1;
      while (j-step >= 0) {
        if (arr[i][j-step] === '.') step++;
        else if (arr[i][j-step] === '#') {count++; break;}
        else break;
      }
      step = 1;
      while (j + step < inputArray[0].length) {
        if (arr[i][j+step] === '.') step++;
        else if (arr[i][j+step] === '#') {count++; break;}
        else break;
      }
      step = 1;
      while (i + step < inputArray.length && j - step >= 0) {
        if (arr[i+step][j-step] === '.') step++;
        else if (arr[i+step][j-step] === '#') {count++; break;}
        else break;
      }
      step = 1;
      while (i + step < inputArray.length) {
        if (arr[i+step][j] === '.') step++;
        else if (arr[i+step][j] === '#') {count++; break;}
        else break;
      }
      step = 1;
      while (i + step < inputArray.length && j + step < inputArray[0].length) {
        if (arr[i+step][j+step] === '.') step++;
        else if (arr[i+step][j+step] === '#') {count++; break;}
        else break;
      }
      return count;
    }

    let next = new Array(inputArray.length);
    for (let i = 0; i < next.length; i++) {
      next[i] = [];
    }

    let diffs = 0;

    for (let i = 0; i < prev.length; i++) {
      for (let j = 0; j < prev[i].length; j++) {
        if (prev[i][j] === '.') {
          next[i][j] = '.';
        } else if (prev[i][j] === 'L') {
          if (checkAdjacent(prev, i, j) === 0) {
            next[i][j] = '#';
            diffs++;
          }
          else next[i][j] = 'L';
        } else { // prev[i][j] === '#'
          let res = checkAdjacent(prev, i, j);
          if (checkAdjacent(prev, i, j) >= 5) {
            next[i][j] = 'L';
            diffs++;
          }
          else next[i][j] = '#';
        }
      }
    }

    return [next, diffs];
  }

  let curr = inputArray;
  let nextArray;
  let iterationCount = 0;
  while (true) {
    nextArray = iterate(curr);
    if (nextArray[1] === 0) break;
    curr = nextArray[0];
    iterationCount++;
    // console.table(curr);
  }

  // console.table(nextArray[0]);

  let occupied = 0;
  for (let i = 0; i < nextArray[0].length; i++) {
    for (let j = 0; j < nextArray[0][i].length; j++) {
      if (nextArray[0][i][j] === '#') occupied++;
    }
  }

  console.log('part two', occupied);
  console.log('iterations', iterationCount);
}

partTwo();