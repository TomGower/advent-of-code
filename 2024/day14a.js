import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day14a.input', 'utf8');
const robots = input.split('\n');
const robotDirections = robots.map((r) => {
  let exp = /p=(?<x>\d+),(?<y>\d+) v=(?<dx>-?\d+),(?<dy>-?\d+)/;
  const { x, y, dx, dy } = exp.exec(r).groups;
  return [[x, y].map(Number), [dx, dy].map(Number)];
});

const width = 11;
const height = 7;

function findRobotPosition(x, y, dx, dy, time = 100) {
  if (dx > width) dx = dx % width;
  if (dy > height) dy = dy % height;
  let finalX = x,
    finalY = y;
  for (let i = 0; i < time; i++) {
    finalX = (finalX + dx + width) % width;
    finalY = (finalY + dy + height) % height;
  }
  console.log(finalX, finalY);
  return [finalX, finalY];
}

function partOne() {
  const grid = new Array(height).fill().map((_) => new Array(width).fill(0));
  for (const [[x, y], [dx, dy]] of robotDirections) {
    const [fx, fy] = findRobotPosition(x, y, dx, dy);
    grid[fy][fx]++;
  }
  const midRow = Math.floor(height / 2);
  const midCol = Math.floor(width / 2);
  let ul = 0,
    ur = 0,
    bl = 0,
    br = 0;
  for (let i = 0; i < height; i++) {
    if (i === midRow) continue;
    for (let j = 0; j < width; j++) {
      if (j === midCol) continue;
      if (i < midRow && j < midCol) ul += grid[i][j];
      if (i < midRow && j > midCol) ur += grid[i][j];
      if (i > midRow && j < midCol) bl += grid[i][j];
      if (i > midRow && j > midCol) br += grid[i][j];
    }
  }
  console.table(grid);
  console.log(ul, ur, bl, br);
  return ul * ur * bl * br;
}

console.log('The answer to Part One may be', partOne());

function partTwo() {}

console.log('The answer to Part Two may be', partTwo());
