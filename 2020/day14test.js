const input = `mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1`;

const inputArray = input.split('\n');

const partTwo = () => {
  let memo = {};
  let mask = '';

  const maskVals = (mask, key) => {
    let binKey = (+key).toString(2).padStart(36, '0').split('');
    let maskedKey = Array.from(mask);
    for (let i = 0; i < maskedKey.length; i++) {
      if (maskedKey[i] === '0') {
        maskedKey[i] = binKey[i];
      }
    }
    let fluctuating = [];
    for (let i = 0; i < maskedKey.length; i++) {
      if (maskedKey[maskedKey.length-1 - i] === 'X') {
        fluctuating.push(i);
        maskedKey[maskedKey.length-1 - i] = '0';
      };
    }
    let baseKeyVal = parseInt(maskedKey.join(''), 2);
    let res = new Array(2 ** fluctuating.length).fill(baseKeyVal);
    console.log(baseKeyVal, fluctuating);
    for (let i = 0; i < fluctuating.length; i++) {
      let nums = [];
      for (let j = 0; j < 2**i; j++) {
        nums.push(0);
      }
      for (let j = 0; j < 2**i; j++) {
        nums.push(2 ** fluctuating[i]);
      }
      while (nums.length < res.length) {
        nums = nums.concat(nums);
      }
      console.log(2 ** fluctuating[i], nums);
      for (let i = 0; i < res.length; i++) {
        res[i] += nums[i];
      }
    }
    console.log(res);
    return res;
  }

  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i].slice(0,3) === 'mas') {
      mask = inputArray[i].slice(7).split('');
    } else {
      vals = inputArray[i].match(/\d+/g);
      let key = vals[0];
      let val = +vals[1];
      let maskedVals = maskVals(mask, key);
      maskedVals.forEach(newKey => {
        memo[newKey] = val;
      })
    }
  }

  let total = 0;
  // console.log(memo);

  for (let keys in memo) {
    total += memo[keys];
  }

  console.log('part two', total);
}

partTwo();