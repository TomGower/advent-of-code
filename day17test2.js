const input = `.#.
..#
###`;

const inputArray = input.split('\n');
console.table(inputArray);

const isActive = (h, l, w) => {
  if (h < 0 || h >= grid.length) return false;
  if (l < 0 || l >= grid[h].length) return false;
  if (w < 0 || w >= grid[h][l].length) return false;
  return grid[h][l][w] === '#';
}

const countActive = (z, x, y) => {
  let total = 0;
  for (let i = z-1; i <= z+1; i++) {
    for (let j = x-1; j <= x+1; j++) {
      for (let k = y-1; k <= y+1; k++) {
        if (i < 0 || j < 0 || k < 0) continue;
        if (isActive(i, j, k)) total++;
      }
    }
  }
  return total;
}

let grid = [];
grid.push(inputArray);