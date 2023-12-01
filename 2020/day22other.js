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
const [deck1, deck2] = hands.map(hand => hand.split('\n').slice(1));

const playHand = (deck1, deck2) => {
  const card1 = deck1.shift();
  const card2 = deck2.shift();

  const isDeck1Win = deck1.length >= +card1 && deck2.length >= +card2
    ? playGame(deck1.slice(0, +card1), deck2.slice(0, +card2))
    : +card1 > +card2;

  if (isDeck1Win) {
    deck1.push(card1, card2);
  } else {
    deck2.push(card2, card1);
  }
};

const playGame = (deck1, deck2) => {
  const seen = new Set()

  while (deck1.length > 0 && deck2.length > 0) {
    const snapshot = deck1.join() + '|' + deck2.join();

    if (seen.has(snapshot)) {
      return true;
    }

    seen.add(snapshot);

    playHand(deck1, deck2);
  }

  return deck1.length > 0;
};

const scoreDeck = deck => (
  deck
    .slice()
    .reverse()
    .reduce((points, card, i) => (i + 1) * card + points, 0)
);

const isDeck1Win = playGame(deck1, deck2);

console.log(deck1, deck2);
const res = scoreDeck(isDeck1Win ? deck1 : deck2);
console.log(res);