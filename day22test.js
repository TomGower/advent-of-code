const input = `Player 1:
9
2
6
3
1

Player 2:
5
8
4
7
10`;

const hands = input.split('\n\n');
const handOne = hands[0].split('\n');
const handTwo = hands[1].split('\n');
handOne.splice(0, 1);
handTwo.splice(0, 1);

const playGame = (arr1, arr2) => {
  while (arr1.length > 0 && arr2.length > 0) {
    const card1 = arr1.shift();
    const card2 = arr2.shift();
    if (+card1 > +card2) {
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

const calculateKey = arr => {
  let total = 0;
  for (let i = arr.length - 1, j = 1; i >= 0; i--, j++) {
    total += 51 ** i * arr[i];
  }
  return total;
}

const playRecursiveGame = (arr1, arr2, isRecursive = false) => {
  console.log('starting recursive game', arr1, arr2);
  const playRound = (arrA, cardA, arrB, cardB) => {
    console.log('calling playRound');
    if (arrA.length >= +cardA && arrB.length >= cardB) {
      console.log('playing recursive game');
      const winner = playRecursiveGame(arrA.slice(0, +cardA), arrB.slice(0, +cardB), true);
      winner === 1 ? arrA.push(cardA, cardB) : arrB.push(cardB, cardA);
    } else if (+cardA > +cardB) {
      arrA.push(cardA, cardB);
    } else {
      arrB.push(cardB, cardA);
    }
    return [arrA, arrB];
  }

  const memo = {};
  let rounds = 0;
  while (arr1.length > 0 && arr2.length > 0) {
  // while (rounds < 9) {
    let total1 = calculateKey(arr1);
    let total2 = calculateKey(arr2);
    if (memo[total1]) {
      // console.log('checking memo');
      if (memo[total1].has(total2)) {
        console.log('found memo value', isRecursive);
        if (isRecursive) return 1;
        return arr1;
      } else {
        memo[total1].add(total2);
      }
    } else {
      let val = new Set();
      val.add(total2);
      memo[total1] = val;
    }
    const card1 = arr1.shift();
    const card2 = arr2.shift();
    const res = playRound([...arr1], card1, [...arr2], card2);
    console.log('res', res);
    [arr1,arr2] = res;
    // console.log(memo);
    rounds++;
    console.log(arr1, arr2);
  }

  if (isRecursive) return arr1.length > 0 ? 1 : 2;
  return arr1.length > 0 ? arr1 : arr2;
}

console.log('part two', calculateTotal(playRecursiveGame([...handOne], [...handTwo])));
// not 6261
// not 10315