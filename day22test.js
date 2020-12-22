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

const playHands = (arr1, arr2) => {
  let rounds = 0;
  while (arr1.length > 0 && arr2.length > 0) {
  // while (rounds < 5) {
    let card1 = arr1.shift();
    let card2 = arr2.shift();
    if (card1 > card2) {
      arr1.push(card1, card2);
    } else {
      arr2.push(card2, card1);
    }
    console.log(arr1, arr2);
    rounds++;
  }
  return arr1.length > 0 ? arr1 : arr2;
}

const res = playHands(handOne, handTwo);
console.log(res);
let total = 0;
for (let i = res.length - 1, j = 1; i > 0; i--, j++) {
  total += j * res[i];
}

console.log('part one', total); // not 31583