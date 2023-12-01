import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const hands = readFileSync(__dirname + '/inputs/day22.input', 'utf8').split('\n\n');

let [handOne, handTwo] = hands.map(hand => hand.split('\n').slice(1).map(item => +item));

const playGame = (arr1, arr2) => {
  while (arr1.length && arr2.length) {
    const card1 = arr1.shift();
    const card2 = arr2.shift();
    if (card1 > card2) {
      arr1.push(card1, card2);
    } else {
      arr2.push(card2, card1);
    }
  }
  return arr1.length > 0 ? arr1 : arr2;
}

const calculateTotal = arr => {
  let total = 0;
  for (let i = arr.length - 1, j = 1; i >= 0; i--, j++) {
    total += j * arr[i];
  }
  return total;
}

console.log('part one', calculateTotal(playGame([...handOne], [...handTwo]))); // 32629

const playRecursiveGame = (arr1, arr2, isRecursive = false) => {
  const playRound = (arrA, cardA, arrB, cardB) => {
    if (arrA.length >= cardA && arrB.length >= cardB) {
      const winner = playRecursiveGame(arrA.slice(0, cardA), arrB.slice(0, cardB), true);
      winner === 1 ? arrA.push(cardA, cardB) : arrB.push(cardB, cardA);
    } else if (cardA > cardB) {
      arrA.push(cardA, cardB);
    } else {
      arrB.push(cardB, cardA);
    }
    return [arrA, arrB];
  }

  const seen = new Set();
  while (arr1.length && arr2.length) {
    const key = arr1.join('') + '|' + arr2.join('');
    if (seen.has(key)) {
      if (isRecursive) return 1;
      return arr1;
    } else {
      seen.add(key);
    }
    const card1 = arr1.shift();
    const card2 = arr2.shift();
    const res = playRound([...arr1], card1, [...arr2], card2);
    [arr1,arr2] = res;
  }

  if (isRecursive) return arr1.length > 0 ? 1 : 2;
  return arr1.length > 0 ? arr1 : arr2;
}

console.log('part two', calculateTotal(playRecursiveGame([...handOne], [...handTwo]))); // 32519