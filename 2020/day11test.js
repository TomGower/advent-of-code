const input = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`;

const inputArray = input.split('\n');
let emptyArray = new Array(inputArray.length).fill([]);

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