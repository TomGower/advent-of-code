import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day07.input', 'utf8');
const grid = input.split('\n');
const rows = grid.length;
const cols = grid[0].length;

function calculatePathsAndSplits() {
  const startCol = grid[0].indexOf('S');
  if (startCol === -1) throw new Error('cannot locate starting position');
  let beams = new Array(cols).fill(0);
  let splits = 0;
  beams[startCol] = 1;
  for (let row = 2; row < rows; row += 2) {
    const nextBeams = new Array(cols).fill(0);
    for (let col = 0; col < cols; col++) {
      if (beams[col]) {
        if (grid[row][col] === '^') {
          splits++;
          nextBeams[col - 1] += beams[col];
          nextBeams[col + 1] += beams[col];
        } else {
          nextBeams[col] += beams[col];
        }
      }
    }
    beams = nextBeams;
    // console.log(beams);
  }
  const total = beams.reduce((acc, curr) => acc + curr, 0);
  return [splits, total];
}

function partOne() {
  // const startCol = grid[0].indexOf('S');
  // if (startCol === -1) throw new Error('cannot locate starting position');
  // let res = 0;
  // let beams = new Array(cols).fill(false);
  // beams[startCol] = true;
  // for (let row = 2; row < rows; row += 2) {
  //   const nextBeams = new Array(cols).fill(false);
  //   for (let col = 0; col < cols; col++) {
  //     if (beams[col]) {
  //       if (grid[row][col] === '^') {
  //         nextBeams[col - 1] = true;
  //         nextBeams[col + 1] = true;
  //         res++;
  //       } else {
  //         nextBeams[col] = true;
  //       }
  //     }
  //   }
  //   beams = nextBeams;
  // }
  // return res;
}

const [splits, total] = calculatePathsAndSplits();

console.log('the answer to Part One may be', splits);

function partTwo() {
  // const startCol = grid[0].indexOf('S');
  // if (startCol === -1) throw new Error('cannot locate starting position');
  // let beams = new Array(cols).fill(0);
  // beams[startCol] = 1;
  // for (let row = 2; row < rows; row += 2) {
  //   const nextBeams = new Array(cols).fill(0);
  //   for (let col = 0; col < cols; col++) {
  //     if (beams[col]) {
  //       if (grid[row][col] === '^') {
  //         nextBeams[col - 1] += beams[col];
  //         nextBeams[col + 1] += beams[col];
  //       } else {
  //         nextBeams[col] += beams[col];
  //       }
  //     }
  //   }
  //   beams = nextBeams;
  // }
  // return beams.reduce((acc, curr) => acc + curr, 0);
}

console.log('the answer to Part Two may be', total);
