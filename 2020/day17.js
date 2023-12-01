import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const inputArray = readFileSync(__dirname + '/inputs/day17.input', 'utf8').split('\n');

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
    let nextGrid = [];
    for (let i = 0; i < grid.length; i++) {
      let planeArr = [];
      for (let j = 0; j < grid[i].length; j++) {
        let gridArr = [];
        for (let k = 0; k < grid[i][j].length; k++) {
          const neighbors = countActive(i, j, k);
          const curr = grid[i][j][k];
          if (curr === '#') {
            if (neighbors === 2 || neighbors === 3) {
              gridArr.push('#');
            } else {
              gridArr.push('.');
            }
          } else {
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

const partTwo = (turns) => {
  const isActive = (d, h, l, w) => {
    if (d < 0 || d >= cube.length) return false;
    if (h < 0 || h >= cube[d].length) return false;
    if (l < 0 || l >= cube[d][h].length) return false;
    if (w < 0 || w >= cube[d][h][l].length) return false;
    return grid[d][h][l][w] === '#';
  }

  const countActive = (w, z, x, y) => {
    let total = 0;
    for (let m = w-1; m <= w+1; m++) {
      for (let i = z-1; i <= z+1; i++) {
        for (let j = x-1; j <= x+1; j++) {
          for (let k = y-1; k <= y+1; k++) {
            if (m < 0 || i < 0 || j < 0 || k < 0) continue;
            if ((i === z && (j === x && k === y)) && m === w) continue;
            if (isActive(m, i, j, k)) total++;
          }
        }
      }
    }
    return total;
  }

  let cube = [];
  let grid = [];
  grid.push(inputArray);
  cube.push(grid);

  let currentTurn = 0;

  while (currentTurn < turns) {
    // do stuff
    const cubeLen = cube.length;
    const planeLen = cube[0].length;
    const gridLen = cube[0][0].length;
    const rowLen = cube[0][0][0].length;
    const newRow = new Array(rowLen + 2).fill('.');
    const newGrid = new Array(gridLen + 2).fill(newRow);
    const newPlane = new Array(planeLen + 2).fill(newGrid);
    const newDimension = new Array(cubeLen + 2).fill(newPlane);
    for (let i = 0; i < cube.length; i++) {
      for (let j = 0; j < cube[i].length; j++) {
        for (let k = 0; k < cube[i][j].length; k++) {
          for (let m = 0; m < cube[i][j][k].length; m++) {
            cube[i][j][k][m] = ['.', ...cube[i][j][k][m], '.'];
          }
          cube[i][j][k].unshift(newRow);
          cube[i][j][k].push(newRow);
        }
        cube[i].unshift(newGrid);
        cube[i].push(newGrid);
      }
      cube.unshift(newPlane);
      cube.push(newPlane);
    }
    cube.unshift(newDimension);
    cube.push(newDimension);

    let nextCube = [];
    for (let i = 0; i < cubeLen; i++) {
      let nextPlane = [];
      for (let j = 0; j < planeLen; j++) {
        let nextGrid = [];
        for (let k = 0; k < gridLen; k++) {
          let nextRow = [];
          for (let m = 0; m < rowLen; m++) {
            const neighbors = countActive(i, j, k, m);
            const curr = cube[i][j][k][m];
            if (curr === '#') {
              if (neighbors === 2 || neighbors === 3) {
                nextcube[i][j][k][m] = '#';
              } else {
                nextcube[i][j][k][m] = '.';
              }
            } else {
              if (neighbors === 3) nextcube[i][j][k][m] = '#';
              else nextcube[i][j][k][m] = '.';
            }
          }
          nextGrid.push(nextRow);
        }
        nextPlane.push(nextGrid);
      }
      nextCube.push(nextPlane);
    }


    cube = nextCube;
    currentTurn++;
  }

  const getActive = hyper => {
    let total = 0;
    for (const plane of hyper) {
      for (const grid of plane) {
        for (const row of grid) {
          for (const cell of row) {
            if (isActive[plane][grid][row][cell]) total++;
          }
        }
      }
    }
    return total;
  }

  const result = getActive(cube);

  console.log('part two', result);
}

// partTwo(6); // should be 1692