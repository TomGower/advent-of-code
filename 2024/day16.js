import { PriorityQueue } from '@datastructures-js/priority-queue';
import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day16.input', 'utf8');
const maze = input.split('\n');

function findSpecificPosition(grid, target) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === target) return [i, j];
    }
  }
  throw new Error(`Starting position ${target} not found in grid`);
}

function compareMoves(a, b) {
  return a.cost < b.cost ? -1 : 1;
}

function findShortestPath(startRow, startCol, maze) {
  const heap = new PriorityQueue(compareMoves);
  const seen = new Set();

  heap.enqueue({ row: startRow, col: startCol, direction: 'east', cost: 0 });

  while (!heap.isEmpty()) {
    const { row, col, direction, cost } = heap.dequeue();
    const key = `${row}~${col}~${direction}`;
    if (seen.has(key)) continue;
    seen.add(key);
    if (maze[row][col] === 'E') return cost;
    if (maze[row][col] === '#') continue;
    if (direction === 'east') {
      heap.enqueue({ row, col: col + 1, direction, cost: cost + 1 });
    } else if (direction === 'west') {
      heap.enqueue({ row, col: col - 1, direction, cost: cost + 1 });
    } else if (direction === 'north') {
      heap.enqueue({ row: row - 1, col, direction, cost: cost + 1 });
    } else {
      // south
      heap.enqueue({ row: row + 1, col, direction, cost: cost + 1 });
    }
    if (direction !== 'east')
      heap.enqueue({ row, col, direction: 'east', cost: cost + 1000 });
    if (direction !== 'west')
      heap.enqueue({ row, col, direction: 'west', cost: cost + 1000 });
    if (direction !== 'north')
      heap.enqueue({ row, col, direction: 'north', cost: cost + 1000 });
    if (direction !== 'south')
      heap.enqueue({ row, col, direction: 'south', cost: cost + 1000 });
  }

  return -1;
}

function partOne() {
  const [startRow, startCol] = findSpecificPosition(maze, 'S');

  return findShortestPath(startRow, startCol, maze);
}

console.log('The answer to Part One may be', partOne());

// doesn't truncate paths, results in overflow
function findCheapestPathSpots(startRow, startCol, maze) {
  const heap = new PriorityQueue(compareMoves);
  const visited = new Map();

  heap.enqueue({
    row: startRow,
    col: startCol,
    direction: 'east',
    cost: 0,
    path: [[startRow, startCol]],
  });

  const res = new Set();
  let minCost = Infinity;

  while (!heap.isEmpty()) {
    const { row, col, direction, cost, path } = heap.dequeue();
    if (cost > minCost) return res;
    const key = `${row}~${col}~${direction}`;
    if (maze[row][col] === '#') continue;
    if (visited.has(key) && visited.get(key) > cost) continue;
    visited.set(key, cost);
    if (maze[row][col] === 'E') {
      if (minCost === Infinity) {
        minCost = cost;
      }
      for (const v of path) {
        res.add(v);
      }
    }

    if (direction === 'east') {
      heap.enqueue({
        row,
        col: col + 1,
        direction,
        cost: cost + 1,
        path: [...path, [row, col + 1]],
      });
    } else if (direction === 'west') {
      heap.enqueue({
        row,
        col: col - 1,
        direction,
        cost: cost + 1,
        path: [...path, [row, col - 1]],
      });
    } else if (direction === 'north') {
      heap.enqueue({
        row: row - 1,
        col,
        direction,
        cost: cost + 1,
        path: [...path, [row - 1, col]],
      });
    } else {
      // south
      heap.enqueue({
        row: row + 1,
        col,
        direction,
        cost: cost + 1,
        path: [...path, [row + 1, col]],
      });
    }
    if (direction !== 'east' || direction !== 'west')
      heap.enqueue({
        row,
        col,
        direction: 'east',
        cost: cost + 1000,
        path,
      });
    if (direction !== 'west' || direction !== 'east')
      heap.enqueue({
        row,
        col,
        direction: 'west',
        cost: cost + 1000,
        path,
      });
    if (direction !== 'north' || direction !== 'south')
      heap.enqueue({
        row,
        col,
        direction: 'north',
        cost: cost + 1000,
        path,
      });
    if (direction !== 'south' || direction !== 'north')
      heap.enqueue({
        row,
        col,
        direction: 'south',
        cost: cost + 1000,
        path,
      });
  }

  return res;
}

const dirs = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

function getPaths(grid, start, end, lowestScore) {
  const queue = new PriorityQueue(compareMoves);
  queue.enqueue({
    x: start.x,
    y: start.y,
    dir: 1,
    cost: 0,
    path: [start],
  });
  const visited = new Map();
  const paths = [];

  while (!queue.isEmpty()) {
    const { x, y, dir, cost, path } = queue.dequeue();
    const key = `${x}~${y}~${dir}`;

    if (cost > lowestScore) continue;
    if (visited.has(key) && visited.get(key) < cost) continue;
    visited.set(key, cost);

    if (x === end.x && y === end.y && cost === lowestScore) {
      paths.push(path);
      continue;
    }

    const nx = x + dirs[dir][0];
    const ny = y + dirs[dir][1];
    if (grid[ny][nx] !== '#') {
      queue.enqueue({
        x: nx,
        y: ny,
        dir,
        cost: cost + 1,
        path: [...path, { x: nx, y: ny }],
      });
    }

    queue.enqueue({
      x,
      y,
      dir: (dir + 1) % 4,
      cost: cost + 1000,
      path: [...path],
    });
    queue.enqueue({
      x,
      y,
      dir: (dir + 3) % 4,
      cost: cost + 1000,
      path: [...path],
    });
  }

  return paths;
}

function partTwo() {
  const [startRow, startCol] = findSpecificPosition(maze, 'S');
  const [endRow, endCol] = findSpecificPosition(maze, 'E');

  const lowScore = findShortestPath(startRow, startCol, maze);

  const paths = getPaths(
    maze,
    { y: startRow, x: startCol },
    { y: endRow, x: endCol },
    lowScore
  );
  const joinedPaths = paths.map((p) => p.map(({ x, y }) => `${x}~${y}`));

  return new Set(joinedPaths.flat(1)).size;
}

console.log('The answer to Part Two may be', partTwo());
