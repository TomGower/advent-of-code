import { PriorityQueue } from '@datastructures-js/priority-queue';
import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day16.input', 'utf8');
const maze = input.split('\n');

function findStartPosition(grid, target) {
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
  console.log('heap successfully created');
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
  const [startRow, startCol] = findStartPosition(maze, 'S');

  return findShortestPath(startRow, startCol, maze);
}

console.log('The answer to Part One may be', partOne());

function partTwo() {}

console.log('The answer to Part Two may be', partTwo());
