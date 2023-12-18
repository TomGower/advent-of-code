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

function tiltRight(platform) {
  for (let j = platform[0].length - 2; j >= 0; j--) {
    for (let i = 0; i < platform.length; i++) {
      if (platform[i][j] === 'O') {
        let k = 0;
        while ((j + k < platform[0].length - 1) && platform[i][j + k + 1] === '.') {
          k++;
        }
        platform[i][j] = '.';
        platform[i][j + k] = 'O';
      }
    }
  }
  return platform;
}

function tiltDown(platform) {
  for (let i = platform.length - 2; i >= 0; i--) {
    for (let j = 0; j < platform[i].length; j++) {
      if (platform[i][j] === 'O') {
        let k = 0;
        while ((i + k < platform.length - 1) && platform[i + k + 1][j] === '.') {
          k++;
        }
        platform[i][j] = '.';
        platform[i + k][j] = 'O';
      }
    }
  }
  return platform;
}

function tiltLeft(platform) {
  for (let i = 0; i < platform.length; i++) {
    for (let j = 1; j < platform[0].length; j++) {
      if (platform[i][j] === 'O') {
        let k = 0;
        while ((k < j) && platform[i][j - 1 - k] === '.') {
          k++;
        }
        platform[i][j] = '.';
        platform[i][j - k] = 'O';
      }
    }
  }
  return platform;
}

function cycle(platform) {
  platform = tiltUp(platform);
  platform = tiltLeft(platform);
  platform = tiltDown(platform);
  platform = tiltRight(platform);
  return platform;
}

function partTwo() {
  const input = readFileSync(__dirname + '/2023/inputs/day14.input', 'utf8');
  let platform = input.split('\n').map(v => v.split(''));
  const memo = new Map();
  let moves = 0;
  let cycleLength = Infinity;
  let cycleStart = 0;
  while (true) {
    const key = platform.map(r => r.join('')).join('');
    if (memo.has(key)) {
      cycleStart = memo.get(key);
      cycleLength = moves - memo.get(key);
      break;
    }
    memo.set(key, moves);
    platform = cycle(platform);
    moves++;
  }
  const rows = platform.length;
  
  const target = 1000000000 - cycleStart;
  let remainder = target % cycleLength;
  for (let i = 0; i < remainder; i++) {
    platform = cycle(platform);
  }

  return platform.reduce((acc, row, i) => acc + row.filter(v => v === 'O').length * (rows - i), 0);
}

const p2 = partTwo();

console.log('part two', p2); // 118747
