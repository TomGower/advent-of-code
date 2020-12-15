const input = ``;

const inputArray = input.split('\n');

const turnsToTake = 2020;
const nums = [1,0,15,2,10,13];

const partOne = (turns) => {
  // const nums = [0, 3, 6]; // test case
  const spoken = new Map();

  let prev = null;
  let last = null;
  let prevIndex = null;
  let currentTurn = 1;
  while (currentTurn <= turns) {
    if (currentTurn <= nums.length) {
      prev = nums[currentTurn - 1];
      last = spoken.get(prev);
      last ? last.push(currentTurn) : last = [currentTurn];
      spoken.set(prev, last);
    } else {
      last = spoken.get(prev);
      if (last.length < 2) {
        prev = 0;
        prevIndex = spoken.get(prev);
        prevIndex ? prevIndex.push(currentTurn) : prevIndex = [currentTurn];
        spoken.set(prev, prevIndex);
      } else {
        prev = last[last.length - 1] - last[last.length - 2];
        prevIndex = spoken.get(prev);
        prevIndex ? prevIndex.push(currentTurn) : prevIndex = [currentTurn];
        spoken.set(prev, prevIndex);
      }
    }
    // console.log(prev); // used for proof of concept on test case
    currentTurn++;
  }

  console.log('part one', prev);
}

partOne(2020);

partOne(30000000);
