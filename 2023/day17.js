import { PriorityQueue } from '@datastructures-js/priority-queue';

import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));

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
