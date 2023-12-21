import { PriorityQueue } from '@datastructures-js/priority-queue';

import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));

function createNode(r, c, d, dC, cost) {
  return {
    r,
    c,
    direction: d,
    dC,
    cost,
  };
}

function traverse(node, grid, visited, rows, cols) {
  const { r, c, cost, direction, directionCount } = node;
  if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length) return [];
  const key = `${r}~${c}~${direction}~${directionCount}`;
  if (visited.has(key) && visited.get(key) <= cost) return [];
  visited.set(key, cost);
  const res = [];
  if (direction === 'up') {
    if (directionCount < 3 && r > 0)
      res.push({
        r: r - 1,
        c,
        direction,
        directionCount: directionCount + 1,
        cost: cost + grid[r - 1][c],
      });
    if (c > 0)
      res.push({
        r,
        c: c - 1,
        direction: 'left',
        directionCount: 1,
        cost: cost + grid[r][c - 1],
      });
    if (c < cols - 1)
      res.push({
        r,
        c: c + 1,
        direction: 'right',
        directionCount: 1,
        cost: cost + grid[r][c + 1],
      });
  }
  if (direction === 'down') {
    if (directionCount < 3 && r < rows - 1)
      res.push({
        r: r + 1,
        c,
        direction,
        directionCount: directionCount + 1,
        cost: cost + grid[r + 1][c],
      });
    if (c > 0)
      res.push({
        r,
        c: c - 1,
        direction: 'left',
        directionCount: 1,
        cost: cost + grid[r][c - 1],
      });
    if (c < cols - 1)
      res.push({
        r,
        c: c + 1,
        direction: 'right',
        directionCount: 1,
        cost: cost + grid[r][c + 1],
      });
  }
  if (direction === 'left') {
    if (directionCount < 3 && c > 0)
      res.push({
        r,
        c: c - 1,
        direction,
        directionCount: directionCount + 1,
        cost: cost + grid[r][c - 1],
      });
    if (r > 0)
      res.push({
        r: r - 1,
        c,
        direction: 'up',
        directionCount: 1,
        cost: cost + grid[r - 1][c],
      });
    if (r < rows - 1)
      res.push({
        r: r + 1,
        c,
        direction: 'down',
        directionCount: 1,
        cost: cost + grid[r + 1][c],
      });
  }
  if (direction === 'right') {
    if (directionCount < 3 && c < cols - 1)
      res.push({
        r,
        c: c + 1,
        direction,
        directionCount: directionCount + 1,
        cost: cost + grid[r][c + 1],
      });
    if (r > 0)
      res.push({
        r: r - 1,
        c,
        direction: 'up',
        directionCount: 1,
        cost: cost + grid[r - 1][c],
      });
    if (r < rows - 1)
      res.push({
        r: r + 1,
        c,
        direction: 'down',
        directionCount: 1,
        cost: cost + grid[r + 1][c],
      });
  }
  return res;
}

function compareFunction(a, b) {
  if (!a.cost || !b.cost) return -1;
  return a.cost - b.cost;
}

function bfs(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const visited = new Map();
  const queue = new PriorityQueue(compareFunction);
  queue.enqueue({
    r: 0,
    c: 1,
    cost: grid[0][1],
    direction: 'right',
    directionCount: 1,
  });
  queue.enqueue({
    r: 1,
    c: 0,
    cost: grid[1][0],
    direction: 'down',
    directionCount: 1,
  });
  while (queue.size() > 0) {
    const curr = queue.dequeue();
    if (curr.r === rows - 1 && curr.c === cols - 1) return curr.cost;
    const adjacentSquares = traverse(curr, grid, visited, rows, cols);
    adjacentSquares.forEach((s) => queue.enqueue(s));
  }
  return 0;
}

function partOne() {
  const input = readFileSync(__dirname + '/2023/inputs/day17.input', 'utf8');
  const grid = input.split('\n').map((r) => r.split('').map((v) => +v));
  return bfs(grid);
}

const p1 = partOne();

console.log('part one', p1); // 722

function getUltraLeftMoves(node, grid, rows, cols) {
  const { r, c, cost, direction } = node;
  const res = [];
  if (c < 4 || direction === 'left' || direction === 'right') return res;
  let addedCost = 0;
  for (let i = c - 1; i >= 0 && i >= c - 10; i--) {
    addedCost += grid[r][i];
    if (i > c - 4) continue;
    res.push(createNode(r, i, 'left', c - i, cost + addedCost));
  }
  return res;
}

function getUltraRightMoves(node, grid, rows, cols) {
  const { r, c, cost, direction } = node;
  const res = [];
  if (c > cols - 4 || direction === 'right' || direction === 'left') return res;
  let addedCost = 0;
  for (let i = c + 1; i < cols && i <= c + 10; i++) {
    addedCost += grid[r][i];
    if (i < c + 4) continue;
    res.push(createNode(r, i, 'right', i - c, cost + addedCost));
  }
  return res;
}

function getUltraDownMoves(node, grid, rows, cols) {
  const { r, c, cost, direction } = node;
  const res = [];
  if (r > rows - 4 || direction === 'up' || direction === 'down') return res;
  let addedCost = 0;
  for (let i = r + 1; i < rows && i <= r + 10; i++) {
    addedCost += grid[i][c];
    if (i < r + 4) continue;
    res.push(createNode(i, c, 'down', i - r, cost + addedCost));
  }
  return res;
}

function getUltraUpMoves(node, grid, rows, cols) {
  const { r, c, cost, direction } = node;
  const res = [];
  if (r < 4 || direction === 'up' || direction === 'down') return res;
  let addedCost = 0;
  for (let i = r - 1; i >= 0 && i >= r - 10; i--) {
    addedCost += grid[i][c];
    if (i > r - 4) continue;
    res.push(createNode(i, c, 'up', r - i, cost + addedCost));
  }
  return res;
}

function getUltraMoves(node, grid, rows, cols) {
  return [
    ...getUltraLeftMoves(node, grid, rows, cols),
    ...getUltraRightMoves(node, grid, rows, cols),
    ...getUltraUpMoves(node, grid, rows, cols),
    ...getUltraDownMoves(node, grid, rows, cols),
  ];
}

function traverseUltra(node, grid, visited, rows, cols) {
  const { r, c, cost, direction } = node;
  if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length) return [];
  const key = `${r}~${c}~${direction}`;
  if (visited.has(key) && visited.get(key) <= cost) return [];
  visited.set(key, cost);
  return getUltraMoves(node, grid, rows, cols);
}

function bfsUltra(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const visited = new Map();
  const startNode = { r: 0, c: 0, direction: '', cost: 0 };
  const queue = new PriorityQueue(compareFunction);
  queue.enqueue(startNode);
  while (queue.size() > 0) {
    const curr = queue.dequeue();
    if (curr.r === rows - 1 && curr.c === cols - 1) return curr.cost;
    const adjacentSquares = traverseUltra(curr, grid, visited, rows, cols);
    adjacentSquares.forEach((s) => queue.enqueue(s));
  }
  return 0;
}

function partTwo() {
  const input = readFileSync(__dirname + '/2023/inputs/day17.input', 'utf8');
  const grid = input.split('\n').map((r) => r.split('').map((v) => +v));
  // const testNode = createNode(4, 0, 'down', 4, 15);
  // console.log(getUltraRightMoves(testNode, grid, grid.length, grid[0].length));
  return bfsUltra(grid);
}

const p2 = partTwo();

console.log('part two', p2);
// NOT 711, too low
// NOT 913, too high
// test gives correct answer of 94, problem should not be with right or down functions
