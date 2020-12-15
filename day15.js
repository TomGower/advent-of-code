const input = ``;

const inputArray = input.split('\n');

const turnsToTake = 2020;

const partOne = (turns) => {
  const nums = [1,0,15,2,10,13];
  // const nums = [0, 3, 6]; // test case
  const spoken = {};

  let prev = null;
  let currentTurn = 1;
  while (currentTurn <= turns) {
    if (currentTurn <= nums.length) {
      prev = nums[currentTurn - 1];
      spoken[prev] ? spoken[prev].push(currentTurn) : spoken[prev] = [currentTurn];
    } else {
      if (spoken[prev].length < 2) {
        prev = 0;
        spoken[prev] ? spoken[prev].push(currentTurn) : spoken[prev] = [currentTurn];
      } else {
        let indices = spoken[prev];
        prev = indices[indices.length - 1] - indices[indices.length - 2];
        spoken[prev] ? spoken[prev].push(currentTurn) : spoken[prev] = [currentTurn];
      }
    }
    // console.log(prev); // used for proof of concept on test case
    currentTurn++;
  }

  console.log('part one', prev);
}

partOne(2020);

partOne(30000000);

const partTwoNotOptimized = (turns) => {
  const nums = [1,0,15,2,10,13];
  const spoken = {};
  const res = [];

  const match = (arr1, arr2) => {
    if (arr1.length !== arr2.length) throw new Error('got arrays of unequal length');
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }

  const maxTurns = Math.max(turns, 100000);

  let prev = null;
  let currentTurn = 1;
  while (currentTurn <= maxTurns) {
    if (currentTurn <= nums.length) {
      prev = nums[currentTurn - 1];
    } else {
      if (spoken[prev].length < 2) {
        prev = 0;
      } else {
        prev = spoken[prev][spoken[prev].length - 1] - spoken[prev][spoken[prev].length - 2];
      }
    }
    res.push(prev);
    spoken[prev] ? spoken[prev].push(currentTurn) : spoken[prev] = [currentTurn];
    currentTurn++;
  }

  for (let i = 1; i < res.length - nums.length; i++) {
    if (res[i] === nums[0]) {
      if (match(res.slice(i, i + nums.length), res.slice(nums.length, nums.length * 2))) {
        console.log('matched at', i);
      }
    }
  }
  console.log('finished loop')
  // console.table(res);
}

partTwoNotOptimized(2020);
// partTwoNotOptimized(30000000);