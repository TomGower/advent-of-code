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

console.log('part one', calculateTotal(playGame(handOne, handTwo))); // 32629