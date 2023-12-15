import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));

function findHorizontalReflection(puzzle) {
  for (let i = 0; i < puzzle.length - 1; i++) {
    let k = 0;
    reflection: while ((i - k) >= 0 && (i + 1 + k) < puzzle.length) {
      for (let j = 0; j < puzzle[i].length; j++) {
        if (puzzle[i - k][j] !== puzzle[i + 1 + k][j]) break reflection;
      }
      k++;
    }
    if (i - k < 0 || i + 1 + k === puzzle.length) return i + 1;
  }
  return 0;
}

function findVerticalReflection(puzzle) {
  for (let j = 0; j < puzzle[0].length - 1; j++) {
    let k = 0;
    reflection: while (((j - k) >= 0) && ((j + 1 + k) < puzzle[0].length)) {
      for (let i = 0; i < puzzle.length; i++) {
        if (puzzle[i][j - k] !== puzzle[i][j + 1 + k]) break reflection;
      }
      k++;
    }
    if (j - k < 0 || j + 1 + k === puzzle[0].length) return j + 1;
  }
  return 0;
}

const test = [
  '#.##..##.',
  '..#.##.#.',
  '##......#',
  '##......#',
  '..#.##.#.',
  '..##..##.',
  '#.#.##.#.'
]
console.log(findHorizontalReflection(test));
console.log('vertical', findVerticalReflection(test), 'should be 5');
const test2 = [
'#...##..#',
'#....#..#',
'..##..###',
'#####.##.',
'#####.##.',
'..##..###',
'#....#..#'
]
console.log(findHorizontalReflection(test2), 's/b 4');
console.log(findVerticalReflection(test2));

function partOne() {
  const input = readFileSync(__dirname + '/2023/inputs/day13.input', 'utf8');
  const puzzles = input.split('\n\n');
  const puzzleArrays = puzzles.map(p => p.split('\n'));
  const horizontal = puzzleArrays.map(findHorizontalReflection);
  const vertical = puzzleArrays.map(findVerticalReflection);

  return horizontal.reduce((acc, curr) => acc + curr * 100, 0) + vertical.reduce((acc, curr) => acc + curr, 0);
}

const p1 = partOne();

console.log('part one', p1);
// NOT 30100, too low
// NOT 34733, not just 1-indexing problem
// IS 36041, problem was I was starting the arrays in findReflection at 1 and not 0 and didn't change after I fixed symmetry conditions
