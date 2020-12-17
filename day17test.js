const input = `.#.#..##
..#....#
##.####.
...####.
#.##..##
#...##..
...##.##
#...#.#.`;

let inputArray = input.split('\n');

console.log(inputArray);

let currentTurn = 0;

const isActive = (x, y) => {
  if (x < 0 || x >= inputArray.length) return false;
  if (y < 0 || y >= inputArray[x].length) return false;
  return inputArray[x][y] === '#';
}

const countActive = (l, w) => {
  let total = 0;
  for (let i = l-1; i <= l+1; i++) {
    for (let j = w-1; j <= w+1; j++) {
      if (isActive(i, j)) total++;
    }
  }
  return total;
}

while (currentTurn < 2) {
  let nextGrid = new Array(0).fill(new Array(0));
  for (let i = 0; i < inputArray.length; i++) {
    let curr = [];
    for (let j = 0; j < inputArray[i].length; j++) {
      const neighbors = countActive(i, j);
      if (inputArray[i][j] === '#') {
        if (neighbors === 2 || neighbors === 3) {
          curr.push('#');
        } else {
          curr.push('.');
        }
      } else {
        if (neighbors === 3) {curr.push('#');}
        else {curr.push('.');}
      }
    }
    nextGrid.push(curr);
  }
  
  inputArray = Array.from(nextGrid);
  console.table(inputArray);
  currentTurn++;
}

// console.table(inputArray);
