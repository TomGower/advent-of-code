import { PriorityQueue } from '@datastructures-js/priority-queue';
import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day20.input', 'utf8');
const mat = input.split('\n').map((v) => v.split(''));

function getPosition(grid, target) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === target) return [i, j];
    }
  }
  throw new Error(`target ${target} was not found in grid`);
}

const startPosition = getPosition(mat, 'S');
const endPosition = getPosition(mat, 'E');

const dirs = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function findShortestDistance(grid, start, end) {
  const queue = [start];
  const seen = new Set();
  seen.add(`${start[0]}~${start[1]}`);
  let steps = 0;
  while (queue.length) {
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      const [r, c] = queue.shift();
      if (r === end[0] && c === end[1]) return steps;
      for (const [dr, dc] of dirs) {
        const [nr, nc] = [r + dr, c + dc];
        const key = `${nr}~${nc}`;
        if (
          nr < 0 ||
          nr >= grid.length ||
          nc < 0 ||
          nc >= grid[0].length ||
          seen.has(key) ||
          grid[nr][nc] === '#'
        )
          continue;
        seen.add(key);
        queue.push([nr, nc]);
      }
    }
    steps++;
  }
  throw new Error(`path from ${start} to ${end} could not be found`);
}

function findShortestDistanceWithOneSlip(grid, start, end, maxTime) {
  const queue = [[start[0], start[1], false]];
  let count = 0;
  let steps = 0;
  while (steps <= maxTime) {
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      const [row, col, used] = queue.shift();
      if (row === end[0] && col === end[1]) {
        count++;
        continue;
      }
      for (const [dr, dc] of dirs) {
        const [nr, nc] = [row + dr, col + dc];
        // const key = `${nr}~${nc}`;
        if (nr < 0 || nr >= grid.length || nc < 0 || nc >= grid[0].length)
          continue;
        if (grid[nr][nc] === '#') {
          if (!used) queue.push([nr, nc, true]);
        }
        // seen.add(key);
        queue.push([nr, nc, used]);
      }
    }
    steps++;
  }
  return count;
}

function oneSlipShortest(grid, start, end, maxTime) {
  const minHeap = new PriorityQueue((a, b) => a.steps - b.steps);
  const [startRow, startCol] = start;
  const [endRow, endCol] = end;
  const seen = new Set();
  seen.add(`${startRow}~${startCol}`);
  minHeap.enqueue({
    row: startRow,
    col: startCol,
    used: false,
    steps: 0,
  });
  let count = 0;
  while (!minHeap.isEmpty()) {
    const { row, col, used, steps } = minHeap.dequeue();
    // console.log(row, col, used, steps);
    if (steps > maxTime) break;
    if (row === endRow && col === endCol) {
      count++;
      continue;
    }
    // console.log(Math.abs(row - endRow), Math.abs(col - endCol), steps, maxTime);
    if (Math.abs(row - endRow) + Math.abs(col - endCol) + steps > maxTime)
      continue;
    for (const [dr, dc] of dirs) {
      const [nr, nc] = [row + dr, col + dc];
      if (nr < 0 || nr >= grid.length || nc < 0 || nc >= grid[0].length)
        continue;
      if (grid[nr][nc] === '#') {
        if (!used) {
          minHeap.enqueue({
            row: nr,
            col: nc,
            used: true,
            steps: steps + 1,
          });
        } else {
          minHeap.enqueue({ row: nr, col: nc, used, steps: steps + 1 });
        }
      }
    }
  }
  return count;
}

function fillDistances(grid, end, memo) {
  const queue = [end];
  let steps = 0;
  while (queue.length) {
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      const [row, col] = queue.shift();
      if (memo[row][col] !== Infinity) continue;
      memo[row][col] = steps;
      for (const [dr, dc] of dirs) {
        const [nr, nc] = [row + dr, col + dc];
        if (nr < 0 || nr >= grid.length || nc < 0 || nc >= grid[0].length)
          continue;
        if (grid[nr][nc] === '#') continue;
        queue.push([nr, nc]);
      }
    }
    steps++;
  }
}

function findShortestPathsWithOneMove(grid, start, memo, maxSteps) {
  const [startRow, startCol] = start;
  const queue = [[startRow, startCol]];
  const wallQueue = [];
  const seen = new Set();
  seen.add(`${startRow}~${startCol}`);
  let steps = 0;
  let count = 0;
  while (queue.length) {
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      const [row, col] = queue.shift();
      for (const [dr, dc] of dirs) {
        const [nr, nc] = [row + dr, col + dc];
        const key = `${nr}~${nc}`;
        if (
          nr < 0 ||
          nr >= grid.length ||
          nc < 0 ||
          nc >= grid[0].length ||
          seen.has(key)
        )
          continue;
        seen.add(key);
        if (grid[nr][nc] === '#') {
          wallQueue.push([nr, nc, steps + 2]);
        } else {
          queue.push([nr, nc]);
        }
      }
    }
    steps++;
    if (steps > maxSteps) break;
  }
  // console.log(wallQueue);
  const walls = new Set();
  for (const [row, col, stepCount] of wallQueue) {
    const wallKey = `${row}~${col}`;
    // if (walls.has(wallKey)) continue;
    // walls.add(wallKey);
    for (const [dr, dc] of dirs) {
      const [nr, nc] = [row + dr, col + dc];
      if (nr < 0 || nr >= grid.length || nc < 0 || nc >= grid[0].length)
        continue;
      if (memo[nr][nc] + stepCount <= maxSteps) {
        walls.add(`${row}~${col}~${nr}~${nc}`);
      }
    }
  }
  // console.log(walls);
  return walls.size;
}

function partOne() {
  const minDistance = findShortestDistance(mat, startPosition, endPosition);
  console.log('min distance is', minDistance);
  // let count = 0;
  // for (let i = 1; i < mat.length; i++) {
  //   for (let j = 1; j < mat[0].length; j++) {
  //     if (mat[i][j] !== '#') continue;
  //     mat[i][j] = '.';
  //     const newSteps = findShortestDistance(
  //       mat,
  //       startPosition,
  //       endPosition,
  //       minDistance - 100
  //     );
  //     if (newSteps !== -1) count++;
  //   }
  // }

  // return count;

  // return findShortestDistanceWithOneSlip(
  //   mat,
  //   startPosition,
  //   endPosition,
  //   minDistance - 100
  // );
  // return oneSlipShortest(mat, startPosition, endPosition, minDistance - 50);
  const memo = new Array(mat.length)
    .fill()
    .map((_) => new Array(mat[0].length).fill(Infinity));
  fillDistances(mat, endPosition, memo);

  // console.table(memo);

  return findShortestPathsWithOneMove(
    mat,
    startPosition,
    memo,
    minDistance - 100
  );
}

console.log('The answer to Part One may be', partOne());

function partTwo() {}

console.log('The answer to Part Two may be', partTwo());
