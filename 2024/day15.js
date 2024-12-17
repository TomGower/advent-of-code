import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day15.input', 'utf8');
const [bigGrid, allMoves] = input.split('\n\n');
const grid = bigGrid.split('\n').map((r) => r.split(''));
const moves = allMoves.split('\n');

const rows = grid.length;
const cols = grid[0].length;

function findStartPosition(grid, target) {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === target) return [r, c];
    }
  }
  throw new Error(`target ${target} could not be found in grid`);
}

function canMove(r, c, direction, grid) {
  const [dr, dc] = direction;
  (r = r + dr), (c = c + dc);
  while (true) {
    if (grid[r][c] === '.') return true;
    if (grid[r][c] === '#') return false;
    (r += dr), (c += dc);
  }
}

function move(r, c, [dr, dc], grid) {
  if (!canMove(r, c, [dr, dc], grid)) return [r, c];
  if (grid[r + dr][c + dc] === '.') return [r + dr, c + dc];
  const [nextR, nextC] = [r + dr, c + dc];
  while (true) {
    if (grid[r + dr][c + dc] === 'O') {
      r += dr;
      c += dc;
    } else {
      grid[nextR][nextC] = '.';
      grid[r + dr][c + dc] = 'O';
      break;
    }
  }
  return [nextR, nextC];
}

function partOne() {
  const [startX, startY] = findStartPosition(grid, '@');
  let [x, y] = [startX, startY];
  grid[x][y] = '.';

  for (const row of moves) {
    for (const cell of row) {
      if (cell === '^') [x, y] = move(x, y, [-1, 0], grid);
      if (cell === '>') [x, y] = move(x, y, [0, 1], grid);
      if (cell === 'v') [x, y] = move(x, y, [1, 0], grid);
      if (cell === '<') [x, y] = move(x, y, [0, -1], grid);
    }
  }

  let res = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 'O') res += 100 * i + j;
    }
  }

  grid[startX][startY] = '@';

  return res;
}

console.log('The answer to Part One may be', partOne());
// correct at 27:30

function embiggenGrid(grid) {
  const res = [];
  for (const row of grid) {
    const newRow = [];
    for (const cell of row) {
      if (cell === '#') newRow.push('#', '#');
      if (cell === 'O') newRow.push('[', ']');
      if (cell === '.') newRow.push('.', '.');
      if (cell === '@') newRow.push('@', '.');
    }
    res.push(newRow);
  }
  return res;
}

function canMoveBigger(r, c, direction, grid) {
  const [dr, dc] = direction;
  const queue = [[r + dr, c + dc]];
  const seen = new Set();
  while (queue.length > 0) {
    const [nr, nc] = queue.shift();
    const key = `${nr}~${nc}`;
    if (seen.has(key)) continue;
    seen.add(key);
    if (grid[nr][nc] === '.') continue;
    else if (grid[nr][nc] === '#') return false;
    else {
      if (dr === 0) queue.push([nr + dr, nc + dc]);
      else {
        queue.push([nr + dr, nc + dc]);
        if (grid[nr][nc] === '[') {
          queue.push([nr + dr, nc + 1 + dc]);
        } else if (grid[nr][nc] === ']') {
          queue.push([nr + dr, nc - 1 + dc]);
        }
      }
    }
  }
  return true;
}

function moveBigger(r, c, [dr, dc], grid) {
  if (!canMoveBigger(r, c, [dr, dc], grid)) return [r, c];
  const [nextR, nextC] = [r + dr, c + dc];
  if (grid[nextR][nextC] === '.') return [nextR, nextC];
  if (grid[nextR][nextC] === '[' || grid[nextR][nextC] === ']') {
    if (dr === 0) {
      // pushing boxes left/right
      while (grid[r + dr][c + dc] !== '.') {
        if (grid[r + dr][c + dc] === '[') {
          grid[r + dr][c + dc] = ']';
        } else {
          grid[r + dr][c + dc] = '[';
        }
        (r += dr), (c += dc);
      }
      grid[r + dr][c + dc] = dc > 0 ? ']' : '[';
    } else {
      // pushing boxes up or down
      const queue = [];
      queue.push([nextR, nextC, '.']);
      const visited = new Set();
      while (queue.length) {
        const [row, col, val] = queue.shift();
        const key = `${row}~${col}`;
        if (visited.has(key)) continue;
        visited.add(key);
        // if this is another box, we need to move the box
        if (grid[row][col] === '[') {
          queue.push([row + dr, col + dc, grid[row][col]]);
          if (!visited.has(`${row}~${col + 1}`)) {
            queue.push([row + dr, col + 1 + dc, grid[row][col + 1]]);
            grid[row][col + 1] = '.';
          }
        } else if (grid[row][col] === ']') {
          queue.push([row + dr, col + dc, grid[row][col]]);
          if (!visited.has(`${row}~${col - 1}`)) {
            queue.push([row + dr, col - 1 + dc, grid[row][col - 1]]);
            grid[row][col - 1] = '.';
          }
        }
        // in all cases, update value
        grid[row][col] = val;

        // old code
        // if (grid[row][col] === '[') {
        //   queue.push([row + dr, col + dc, grid[row][col]]);
        //   if (!visited.has(`${row}~${col + 1}`)) {
        //     queue.push([row + dr, col + 1 + dc, ']']);
        //     visited.add(`${row}~${col + 1}`);
        //     grid[row][col + 1] = '.';
        //   }
        // } else if (grid[row][col] === ']') {
        //   queue.push([row + dr, col + dr, grid[row][col]]);
        //   if (!visited.has(`${row}~${col - 1}`)) {
        //     queue.push([row + dr, col - 1 + dc, '[']);
        //     visited.add(`${row}~${col - 1}`);
        //     grid[row][col - 1] = '.';
        //   }
        // }
        // grid[row][col] = val;
      }
    }
    grid[nextR][nextC] = '.';
  }
  return [nextR, nextC];
}

function partTwo() {
  const biggerGrid = embiggenGrid(bigGrid.split('\n').map((r) => r.split('')));
  const [startX, startY] = findStartPosition(biggerGrid, '@');
  let [x, y] = [startX, startY];
  biggerGrid[x][y] = '.';

  for (const row of moves) {
    for (const cell of row) {
      if (cell === '^') [x, y] = moveBigger(x, y, [-1, 0], biggerGrid);
      if (cell === '>') [x, y] = moveBigger(x, y, [0, 1], biggerGrid);
      if (cell === 'v') [x, y] = moveBigger(x, y, [1, 0], biggerGrid);
      if (cell === '<') [x, y] = moveBigger(x, y, [0, -1], biggerGrid);
    }
  }

  let res = 0;
  for (let i = 0; i < biggerGrid.length; i++) {
    for (let j = 0; j < biggerGrid[0].length; j++) {
      if (biggerGrid[i][j] === '[') res += 100 * i + j;
    }
  }

  biggerGrid[startX][startY] = '@';

  return res;
}

console.log('The answer to Part Two may be', partTwo());
// correct at 2h2m
