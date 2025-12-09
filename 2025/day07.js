import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day07.input', 'utf8');
const grid = input.split('\n');
const rows = grid.length;
const cols = grid[0].length;

function partOne() {
  const startCol = grid[0].indexOf('S');
  if (startCol === -1) throw new Error('cannot locate starting position');
  let res = 0;
  let beams = new Array(cols).fill(false);
  beams[startCol] = true;
  for (let row = 1; row < rows; row++) {
    const nextBeams = new Array(cols).fill(false);
    for (let col = 0; col < cols; col++) {
      if (beams[col]) {
        if (grid[row][col] === '^') {
          if (col > 0) nextBeams[col - 1] = true;
          if (col < cols - 1) nextBeams[col + 1] = true;
          res++;
        } else {
          nextBeams[col] = true;
        }
      }
    }
    beams = nextBeams;
  }
  return res;
}

console.log('the answer to Part One may be', partOne());
