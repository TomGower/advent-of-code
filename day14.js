import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const inputArray = readFileSync(__dirname + '/inputs/day14.input', 'utf8').split('\n');

const partOne = () => {
  let memo = {};
  let mask = '';

  const maskVal = (mask, val) => {
    let res = Array.from(mask);
    for (let i = val.length-1, j = 1; i >= 0; i--, j++) {
      if (mask[mask.length-j] === 'X') {
        res[mask.length-j] = val[i];
      }
    }
    for (let i = 0; i < res.length; i++) {
      if (res[i] === 'X') res[i] = '0';
    }
    return res;
  }

  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i].slice(0,3) === 'mas') {
      mask = inputArray[i].slice(7).split('');
    } else {
      let vals = inputArray[i].match(/\d+/g);
      let key = vals[0];
      let val = (+vals[1]).toString(2).split('');
      let maskedVal = maskVal(mask, val);
      memo[key] = maskedVal;
    }
  }

  let total = 0;

  for (let keys in memo) {
    total += parseInt(memo[keys].join(''), 2);
  }

  console.log('part one', total);
}

partOne();

const partTwo = () => {
  let memo = {};
  let mask = '';

  const maskKeys = (mask, key) => {
    let binKey = (+key).toString(2).padStart(36, '0').split('');
    let maskedKey = Array.from(mask);
    let fluctuating = [];
    for (let i = 0; i < maskedKey.length; i++) {
      if (maskedKey[i] === '0') {
        maskedKey[i] = binKey[i];
      } else if (maskedKey[i] === 'X') {
        fluctuating.push(maskedKey.length-1 - i);
        maskedKey[i] = '0';
      }
    }
    let baseKeyVal = parseInt(maskedKey.join(''), 2);
    let res = new Array(2 ** fluctuating.length).fill(baseKeyVal);
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
      for (let i = 0; i < res.length; i++) {
        res[i] += nums[i];
      }
    }
    return res;
  }

  inputArray.forEach(item => {
    if (item.slice(0,3) === 'mas') {
      mask = item.match(/mask = ([01X]+)/)[1];
    } else {
      const [key, val] = item.match(/\d+/g);
      const maskedKeys = maskKeys(mask, key);
      maskedKeys.forEach(newKey => {
        memo[newKey] = +val;
      })
    }
  });

  let total = 0;

  for (let keys in memo) {
    total += memo[keys];
  }

  console.log('part two', total);
}

partTwo();