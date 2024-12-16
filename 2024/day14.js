import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day14.input', 'utf8');
const robots = input.split('\n');
const robotDirections = robots.map((r) => {
  const [pos, v] = r.split(' ');
  const [_marker, coords] = pos.split('=');
  const [x, y] = coords.split(',').map(Number);
  const [_v, dirs] = v.split('=');
  const [dx, dy] = dirs.split(',').map(Number);
  return [
    [x, y],
    [dx, dy],
  ];
});

const width = 101;
const height = 103;

function findRobotPosition(x, y, dx, dy, time = 100) {
  if (dx > width) dx = dx % width;
  if (dy > height) dy = dy % height;
  let finalX = x,
    finalY = y;
  for (let i = 0; i < time; i++) {
    finalX = (finalX + dx + width) % width;
    finalY = (finalY + dy + height) % height;
  }
  return [finalX, finalY];
}

function calculateQuadrants(grid) {
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
  return [ul, ur, bl, br];
}

function partOne() {
  const grid = new Array(height).fill().map((_) => new Array(width).fill(0));
  for (const [[x, y], [dx, dy]] of robotDirections) {
    const [fx, fy] = findRobotPosition(x, y, dx, dy);
    grid[fy][fx]++;
  }
  const [ul, ur, bl, br] = calculateQuadrants(grid);
  return ul * ur * bl * br;
}

console.log('The answer to Part One may be', partOne());

function takeTurn(robotPositions, move) {
  let grid = new Array(height).fill().map((_) => new Array(width).fill('.'));
  const nextPositions = [];
  for (const [[x, y], [dx, dy]] of robotPositions) {
    let nextX = (x + dx + width) % width;
    let nextY = (y + dy + height) % height;
    grid[nextY][nextX] = '#';
    nextPositions.push([
      [nextX, nextY],
      [dx, dy],
    ]);
  }
  const [ul, ur, bl, br] = calculateQuadrants(grid);
  const product = ul * ur * bl * br;
  if (move === 7519) {
    for (const r of grid) {
      console.log(r.join(''));
    }
  }
  return [product, nextPositions];
}

function partTwo() {
  let min = Infinity;
  let product;
  let minTurn;
  let robotPositions = robotDirections;

  const candidates = [];

  for (let i = 0; i < height * width; i++) {
    [product, robotPositions] = takeTurn(robotPositions, i);
    if (product < min) {
      min = product;
      minTurn = i;
      candidates.push(i);
      console.log('found a new candiate', product, i + 1);
    }
  }
  return minTurn;
}

console.log('The answer to Part Two may be', partTwo());
// rassin frassin off by 1 errors
