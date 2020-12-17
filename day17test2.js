const input = `.#.
..#
###`;

const inputArray = input.split('\n');

const partTwo = (turns) => {
  const isActive = (d, h, l, w) => {
    // console.log('isActive inputs', d, h, l, w);
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
    // console.log(cubeLen, planeLen, gridLen, rowLen);
    const newRow = new Array(rowLen + 2).fill('.');
    // console.log('newRow', newRow); // good
    const newGrid = new Array(gridLen + 2).fill(newRow);
    // console.log(newGrid); // good
    const newPlane = new Array(planeLen + 2).fill(newGrid);
    // console.log(newPlane); // good
    // const newDimension = new Array(cubeLen + 2).fill(newPlane); // not needed
    // console.log(newDimension.length, newPlane.length, newGrid.length, newRow.length);
    for (let i = 0; i < cubeLen; i++) {
      for (let j = 0; j < planeLen; j++) {
        for (let k = 0; k < gridLen; k++) {
          // console.log('cube i j k', cube[i][j][k]);
          // for (let m = 0; m < rowLen.length; m++) {
          cube[i][j][k] = ['.', ...cube[i][j][k], '.'];
          // }
        }
        cube[i][j].unshift(newRow);
        cube[i][j].push(newRow);
      }
      cube[i].unshift(newGrid);
      cube[i].push(newGrid);
    }
    cube.unshift(newPlane);
    cube.push(newPlane);
    // cube.unshift(newDimension); // not needed
    // cube.push(newDimension); // not needed

    console.log('newCube', cube.length, cube[0].length, cube[0][0].length, cube[0][0][0].length);

    let nextCube = [];
    for (let i = 0; i < cube.length; i++) {
      let nextPlane = [];
      for (let j = 0; j < cube[i].length; j++) {
        let nextGrid = [];
        for (let k = 0; k < cube[i][j].length; k++) {
          let nextRow = [];
          for (let m = 0; m < cube[i][j][k].length; m++) {
            const neighbors = countActive(i, j, k, m);
            const curr = cube[i][j][k][m];
            if (curr === '#') {
              if (neighbors === 2 || neighbors === 3) {
                nextRow.push('#');
              } else {
                nextRow.push('.');
              }
            } else {
              if (neighbors === 3) nextRow.push('#');
              else nextRow.push('.');
            }
          }
          console.log('nextRow', nextRow);
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
            if (cell === '#') total++;
          }
        }
      }
    }
    return total;
  }

  const result = getActive(cube);
  // console.table(cube);

  console.log('part two', result);
}

partTwo(1);