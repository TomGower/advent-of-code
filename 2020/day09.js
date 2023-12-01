import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const inputArray = readFileSync(__dirname + '/inputs/day09.input', 'utf8').split('\n');


const partOne = () => {
  let sums = new Array(25 * 25).fill(0);
  
  const update = (next) => {
    let index = next % 25;
    for (let j = 0; j < 25; j++) {
      sums[index * 25 + j] += (+inputArray[next] - +inputArray[next - 25]);
      sums[25 * j + index] += (+inputArray[next] - +inputArray[next - 25]);
    }
  }

  //populate initial array
  for (let i = 0; i < 25; i++) {
    for (let j = 0; j < 25; j++) {
      sums[i * 25 + j] += +inputArray[i];
      sums[25 * j + i] += +inputArray[i];
    }
  }

  for (let k = 25; k < inputArray.length; k++) {
    if (sums.includes(+inputArray[k]) === false) {
      console.log('part one', +inputArray[k]);
      return +inputArray[k];
    }
    update(k);
  }

}

const target = partOne(); // was 466456641

const partTwo = () => {
  let start = 0;
  let end = 0;
  let curr = 0;
  while (curr !== target) {
    if (curr < target) {
      curr += +inputArray[end];
      end++;
    } else { // curr > target
      curr -= +inputArray[start];
      start++;
    }
  }
  let min = Infinity;
  let max = -Infinity;
  for (let i = start; i <= end; i++) {
    min = Math.min(min, +inputArray[i]);
    max = Math.max(max, +inputArray[i]);
  }

  console.log('part two', min + max);
}

partTwo();