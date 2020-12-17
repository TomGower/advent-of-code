const input = `.#.#..##
..#....#
##.####.
...####.
#.##..##
#...##..
...##.##
#...#.#.`;

const inputArray = input.split('\n');

const partOne = (turns) => {
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
          if (i === z && (j === x && k === y)) continue;
          if (isActive(i, j, k)) total++;
        }
      }
    }
    return total;
  }
  
  let grid = [];
  grid.push(inputArray);
  
  let currentTurn = 0;
  
  while (currentTurn < turns) {
    // do stuff
    const gridLen = grid[0].length;
    const gridRowLen = grid[0][0].length;
    const newPlane = new Array(gridLen + 2).fill(new Array(gridRowLen + 2).fill('.'));
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        grid[i][j] = ['.', ...grid[i][j], '.'];
      }
      grid[i].unshift(new Array(gridRowLen + 2).fill('.'));
      grid[i].push(new Array(gridRowLen + 2).fill('.'));
    }
    grid = [newPlane, ...grid, newPlane];
    // console.log(grid);
    let nextGrid = [];
    for (let i = 0; i < grid.length; i++) {
      let planeArr = [];
      for (let j = 0; j < grid[i].length; j++) {
        let gridArr = [];
        for (let k = 0; k < grid[i][j].length; k++) {
          const neighbors = countActive(i, j, k);
          const curr = grid[i][j][k];
          if (curr === '#') {
            // console.log(i, j, k, 'active', neighbors);
            if (neighbors === 2 || neighbors === 3) {
              gridArr.push('#');
            } else {
              gridArr.push('.');
            }
          } else {
            // console.log(i, j, k, 'inactive', neighbors);
            if (neighbors === 3) {
              gridArr.push('#');
            } else {
              gridArr.push('.');
            }
          }
        }
        planeArr.push(gridArr);
      }
      nextGrid.push(planeArr);
    }
  
    grid = nextGrid;
    currentTurn++;
  }

  let activeCount = 0;
  for (let planes of grid) {
    for (let rows of planes) {
      for (let cell of rows) {
        if (cell === '#') activeCount++;
      }
    }
  }

  console.log('part one', activeCount);
}

partOne(6);