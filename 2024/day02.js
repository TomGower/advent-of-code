import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const values = readFileSync(__dirname + '/inputs/day02.input', 'utf8').split(
  '\n'
);
const testExample = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`.split('\n');
const test2 = `48 46 47 49 51 54 56
1 1 2 3 4 5
1 2 3 4 5 5
5 1 2 3 4 5
1 4 3 2 1
1 6 7 8 9
1 2 3 4 3
9 8 7 6 7
7 10 8 10 11
29 28 27 25 26 25 22 20
57 56 57 59 60 63 64 65
91 92 95 93 94
16 13 15 13 12 11 9 6
40 41 43 44 47 46 47 49`.split('\n');

function isDecreasing(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] >= arr[i - 1]) return false;
  }
  return true;
}

function isIncreasing(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] <= arr[i - 1]) return false;
  }
  return true;
}

function gap1to3(arr) {
  for (let i = 1; i < arr.length; i++) {
    const diff = Math.abs(arr[i] - arr[i - 1]);
    if (diff < 1 || diff > 3) return false;
  }
  return true;
}

function isValidUnchanged(arr) {
  return (isIncreasing(arr) || isDecreasing(arr)) && gap1to3(arr);
}

function partOne() {
  const reports = values.map((v) => v.split(' ').map(Number));
  return reports.filter(isValidUnchanged).length;
}

console.log('The answer to Part One may be', partOne());

function isMostlyDecreasing(arr) {
  let hasMistake = false;
  let prev = arr[0];
  for (let i = 1; i < arr.length; i++) {
    const diff = prev - arr[i];
    if (diff > 3 || diff < 1) {
      if (hasMistake) return false;
      hasMistake = true;
      if (i === 1) {
        const v1 = [arr[0], ...arr.slice(2)];
        return isValidUnchanged(v1) || isValidUnchanged(arr.slice(1));
      }
    } else {
      prev = arr[i];
    }
  }
  return true;
}

function isMostlyIncreasing(arr) {
  let hasMistake = false;
  let prev = arr[0];
  for (let i = 1; i < arr.length; i++) {
    const diff = arr[i] - prev;
    if (diff > 3 || diff < 1) {
      if (hasMistake) return false;
      hasMistake = true;
      if (i === 1) {
        const v1 = [arr[0], ...arr.slice(2)];
        return isValidUnchanged(v1) || isValidUnchanged(arr.slice(1));
      }
      const oldDiff = arr[i] - arr[i - 2];
      if (oldDiff >= 1 && oldDiff <= 3) prev = arr[i];
    } else {
      prev = arr[i];
    }
  }
  return true;
}

function isValid(arr) {
  return isMostlyDecreasing(arr) || isMostlyIncreasing(arr);
}

// console.log('testing', isValid([8, 7, 8, 10, 13, 15, 17]), 'should be true');
// console.log('testing', isValid([90, 89, 91, 93, 95, 94]), 'should be false');
// console.log('testing', isValid([4, 5, 3, 1]), 'should be true');
// console.log('testing', isValid([75, 77, 72, 70, 69]), 'should be true');
// console.log('testing', isValid([7, 10, 8, 10, 11]), 'should be true');
// console.log('testing', isValid([12, 15, 9, 7, 6, 5]), 'should be true');
// console.log('testing', isValid([76, 74, 79, 82, 83, 86, 88, 89]), 's/b true');
// console.log('testing', isValid([90, 89, 86, 84, 83, 79]), 'should be true');
// console.log('testing', isValid([31, 34, 32, 30, 28, 27, 24, 22]), 's/b true');
// console.log('testing', isValid([77, 76, 73, 70, 64]), 's/b true');
// console.log('testing', isValid([2, 1, 3, 5, 8]), 's/b true');
// console.log('testing', isValid([12, 10, 7, 8, 4]), 's/b true');

function partTwo() {
  const reports = values.map((v) => v.split(' ').map(Number));

  // let count = 0;

  // for (const r of reports) {
  //   let update = false;
  //   if (isValidUnchanged(r)) {
  //     update = true;
  //   } else {
  //     inner: for (let i = 0; i < r.length; i++) {
  //       const revisedR = r.toSpliced(i, 1);
  //       if (isValidUnchanged(revisedR)) {
  //         update = true;
  //         break inner;
  //       }
  //     }
  //   }
  //   if (update && !isValid(r)) console.log(r);
  //   if (update) count++;
  // }

  // return count;
  return reports.filter(isValid).length;
}

console.log('The answer to Part Two may be', partTwo());
