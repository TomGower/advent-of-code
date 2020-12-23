import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const inputArray = readFileSync(__dirname + '/inputs/day23.input', 'utf8').split('');
const inputArrayTest = '389125467'.split('');

const playGame = (rounds, arr) => {
  const len = arr.length;
  let vals = new Set([...arr]);
  let round = 0;
  let start = 0;

  let removed = [];
  let removedIndex = 0;
  let removedVals = new Set();

  while (round < rounds) {
    start = round % len;
    const startVal = arr[start];
    removedIndex = start + 1;
    removed = [];
    removedVals = new Set();
    while (removed.length < 3) {
      removedIndex = removedIndex % arr.length;
      removed.push(arr[removedIndex]);
      removedVals.add(arr[removedIndex]);
      arr.splice(removedIndex, 1);
    }
    let destination = startVal - 1;
    if (destination < 1) destination = 9;
    while (removedVals.has(destination.toString())) {
      destination = destination - 1;
      if (destination < 1) destination = 9;
    }
    const destinationIndex = arr.indexOf(destination.toString());
    const left = arr.slice(0, destinationIndex + 1);
    const right = arr.slice(destinationIndex + 1);
    arr = left.concat(removed).concat(right);
    let startLocation = arr.indexOf(startVal);
    while (startLocation !== start) {
      if (startLocation < start) {
        const last = arr.pop();
        arr.unshift(last);
        startLocation++;
      } else if (startLocation > start) {
        const first = arr.shift();
        arr.push(first);
        startLocation--;
      }
    }
    round++;
  }

  console.log('part one', arr.join('').slice(1));
}

playGame(100, inputArray);