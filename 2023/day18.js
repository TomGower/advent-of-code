import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));

function getMinMaxRowCol(directions) {
  let maxRow = 0;
  let maxCol = 0;
  let minRow = 0;
  let minCol = 0;
  let row = 0;
  let col = 0;
  for (const [d, c, _s] of directions) {
    if (d === 'R') col += c;
    if (d === 'L') col -= c;
    if (d === 'U') row -= c;
    if (d === 'D') row += c;
    maxRow = Math.max(maxRow, row);
    maxCol = Math.max(maxCol, col);
    minRow = Math.min(minRow, row);
    minCol = Math.min(minCol, col);
  }

  return [minRow, maxRow, minCol, maxCol];
}

function markBorders(startRow, startCol, direction, count, grid) {
  grid[startRow][startCol] = true;
  if (direction === 'R') {
    for (let i = 1; i <= count; i++) {
      grid[startRow][startCol + i] = true;
    }
    return [startRow, startCol + count];
  }
  if (direction === 'L') {
    for (let i = 1; i <= count; i++) {
      grid[startRow][startCol - i] = true;
    }
    return [startRow, startCol - count];
  }
  if (direction === 'U') {
    for (let i = 1; i <= count; i++) {
      grid[startRow - i][startCol] = true;
    }
    return [startRow - count, startCol];
  }
  if (direction === 'D') {
    for (let i = 1; i <= count; i++) {
      grid[startRow + i][startCol] = true;
    }
    return [startRow + count, startCol];
  }
  throw new Error('unknow direction', direction)
}

// const seen = new Set();

// function markWater(r, c, waterArea, grid) {
//   const key = `${r}~${c}`;
//   if (r < 0 || r >= waterArea.length || c < 0 || c >= waterArea[0].length || grid[r][c] || waterArea[r][c] || seen.has(key)) return 0;
//   seen.add(key);
//   const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
//   let res = 1;
//   for (const [dr, dc] of dirs) {
//     if (seen.has(`${r + dr}~${c + dc}`) || waterArea[r][c] || grid[r][c]) continue;
//     res += markWater(r + dr, c + dc, waterArea, grid);

//   }
//   return res;
// }

// function hasAdjacentWater(r, c, waterArea, grid) {
//   if (r > 0) {if (waterArea[r - 1][c]) return true;}
//   if (r < grid.length - 1) {if (waterArea[r + 1][c]) return true;}
//   if (c > 0) {if (waterArea[r][c - 1]) return true;}
//   if (c < grid[0].length - 1) {if (waterArea[r][c + 1]) return true;}
//   return false;
// }

function partOne() {
  const input = readFileSync(__dirname + '/2023/inputs/day18.input', 'utf8');
  const directions = input.split('\n').map(v => v.split(' ')).map(([d, c, s]) => [d, +c, s.slice(1, s.length - 1)]);
  const [minRow, maxRow, minCol, maxCol] = getMinMaxRowCol(directions);
  const rows = maxRow - minRow + 1;
  const cols = maxCol - minCol + 1;

  const grid = new Array(rows).fill().map(_ => new Array(cols).fill(false));
  let [row, col] = [0 - minRow, 0 - minCol];
  for (const [d, c, _s] of directions) {
    [row, col] = markBorders(row, col, d, c, grid);
  }

  const seen = new Set();
  const getKey = (r, c) => `${r}~${c}`;

  const waterArea = new Array(rows).fill().map(_ => new Array(cols).fill(false));
  const queue = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (r === 0 || c === 0 || r === rows - 1 || c === cols - 1) {
        if (grid[r][c]) continue;
        queue.push([r, c]);
        seen.add(getKey(r, c));
      }
    }
  }
  const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  while (queue.length) {
    const [r, c] = queue.shift();
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] || waterArea[r][c]) continue;
    for (const [dr, dc] of dirs) {
      const key = getKey(r + dr, c + dc);
      if (seen.has(key)) continue;
      waterArea[r][c] = true;
      queue.push([r + dr, c + dc]);
    }
  }

  return (rows * cols) - waterArea.reduce((acc, curr) => acc + curr.filter(v => v).length, 0);
}

const p1 = partOne();

console.log('part one', p1);
// NOT 130687, too high (clearly)
// NOT 54355, still too high
// IS 48652
