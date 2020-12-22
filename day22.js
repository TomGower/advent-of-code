const input = `Player 1:
40
28
39
7
6
16
1
27
38
8
15
3
26
9
30
5
50
17
20
45
34
10
21
14
43

Player 2:
4
49
35
11
32
12
48
23
47
22
46
13
18
41
24
36
37
44
19
42
33
25
2
29
31`;

const hands = input.split('\n\n');
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