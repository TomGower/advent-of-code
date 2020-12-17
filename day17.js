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
          if (isActive(i, j, k)) total++;
        }
      }
    }
    return total;
  }

  let grid = [];
  grid.push(inputArray);
  // console.log(grid);
  
  const generateFirstGrid = () => {
    let newGrid = [...inputArray];
    newGrid.unshift(new Array(0).fill(new Array(0)));
    newGrid.push(new Array(0).fill(new Array(0)));
    for (let i = 0; i < newGrid.length; i++) {
      let xArr = [];
      for (let j = 0; j < newGrid[i].length; j++) {
        let yArr = [];
        for (let k = 0; k < newGrid[i][j].length; k++) {
          const neighbors = countActive(i, j, k);
          const curr = newGrid[i][j][k];
          if (curr === '#') {
            if (neighbors === 2 || neighbors === 3) {
              yArr.push('#');
            } else {
              yArr.push('.');
            }
          } else {
            if (neighbors === 3) yArr.push('#');
            else yArr.push('.');
          }
        }
        xArr.push(yArr);
      }
      newGrid.push(xArr);
    }
    return newGrid;
  }
  let firstGrid = generateFirstGrid(grid);
  console.table('firstGrid', firstGrid);

  // let currentTurn = 0;
  // while (currentTurn < turns) {
  //   // do stuff
  //   nextGrid = new Array(grid.length + 2).fill(() => new Array(grid[0].length + 2)).fill(() => new Array(grid[0][0].length + 2));





    
    
  //   grid = nextGrid;
  //   currentTurn++;
  // }

  // console.log('newgrid', grid);
}

partOne(1);