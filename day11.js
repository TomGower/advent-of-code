import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const inputArray = readFileSync(__dirname + '/inputs/day11.input', 'utf8').split('\n');

const countOccupied = (matrix, target) => {
  let count = 0;
  for (const row of matrix) {
    for (const col of row) {
      if (col === target) count++;
    }
  }
  return count;
}

const partOne = () => {
  
  const iterate = (prev) => {
    
    const countAdjacent = (i, j) => {
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

    const next = new Array(inputArray.length);
    for (let i = 0; i < next.length; i++) {
      next[i] = [];
    }

    let diffs = 0;

    for (let i = 0; i < prev.length; i++) {
      for (let j = 0; j < prev[i].length; j++) {
        if (prev[i][j] === '.') {
          next[i][j] = '.';
        } else if (prev[i][j] === 'L') {
          if (countAdjacent(i, j) === 0) {
            next[i][j] = '#';
            diffs++;
          }
          else next[i][j] = 'L';
        } else { // prev[i][j] === '#'
          if (countAdjacent(i, j) >= 4) {
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
  while (true) {
    nextArray = iterate(curr);
    if (nextArray[1] === 0) break;
    curr = nextArray[0];
  }

  const occupied = countOccupied(nextArray[0], '#');

  console.log('part one', occupied);
}

partOne();

const partTwo = () => {
  
  const iterate = (prev) => {
    
    const countAdjacent = (arr, i, j) => {
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

    const next = new Array(inputArray.length);
    for (let i = 0; i < next.length; i++) {
      next[i] = [];
    }

    let diffs = 0;

    for (let i = 0; i < prev.length; i++) {
      for (let j = 0; j < prev[i].length; j++) {
        if (prev[i][j] === '.') {
          next[i][j] = '.';
        } else if (prev[i][j] === 'L') {
          if (countAdjacent(prev, i, j) === 0) {
            next[i][j] = '#';
            diffs++;
          }
          else next[i][j] = 'L';
        } else { // prev[i][j] === '#'
          let res = countAdjacent(prev, i, j);
          if (countAdjacent(prev, i, j) >= 5) {
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
  while (true) {
    nextArray = iterate(curr);
    if (nextArray[1] === 0) break;
    curr = nextArray[0];
  }

  const occupied = countOccupied(nextArray[0], '#');

  console.log('part two', occupied);
}

partTwo();