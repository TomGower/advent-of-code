import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));

function tiltUp(platform) {
  for (let i = 1; i < platform.length; i++) {
    for (let j = 0; j < platform[i].length; j++) {
      if (platform[i][j] === 'O') {
        let k = 0;
        while ((k < i) && platform[i - 1 - k][j] === '.') {
          k++;
        }
        platform[i][j] = '.';
        platform[i - k][j] = 'O';
      }
    }
  }
  return platform;
}

function partOne() {
  const input = readFileSync(__dirname + '/2023/inputs/day14.input', 'utf8');
  const platform = input.split('\n').map(v => v.split(''));
  const adjustedPlatform = tiltUp(platform);
  const rows = adjustedPlatform.length;

  return adjustedPlatform.reduce((acc, row, i) => acc + row.filter(v => v === 'O').length * (rows - i), 0);
}

const p1 = partOne();

console.log('part one', p1); // 113456

