import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const values = readFileSync(__dirname + '/2023/inputs/day07.input', 'utf8').split('\n');

const handRanks = {
  'HC': 1,
  '1P': 2,
  '2P': 3,
  '3K': 4,
  'FH': 5,
  '4K': 6,
  '5K': 7
}

const cardRanks = {
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 5,
  7: 6,
  8: 7,
  9: 8,
  'T': 9,
  'J': 10,
  'Q': 11,
  'K': 12,
  'A': 13
}

function getHandType(hand) {
  const cards = {}
  for (const c of hand) {
    cards[c] ? cards[c]++ : cards[c] = 1;
  }
  const counts = Object.values(cards).sort((a, b) => b - a);
  if (counts[0] === 5) return '5K';
  if (counts[0] === 4) return '4K';
  if (counts[0] === 3) {
    return counts[1] === 2 ? 'FH' : '3K';
  }
  if (counts[0] === 2) {
    return counts[1] === 2 ? '2P' : '1P';
  }
  return 'HC';
}

function compareHands(a, b) {
  for (let i = 0; i < a.length; i++) {
    if (a[i] === b[i]) continue;
    return cardRanks[a[i]] - cardRanks[b[i]];
  }
  return 0;
}

const handsBets = values.map(v => v.split(' ')).map(([a, b]) => [a, +b]);

const p1 = handsBets.map(([hand, bet]) => {
  const type = getHandType(hand);
  return [hand, bet, type];
}).sort((a, b) => {
  if (a[2] !== b[2]) return handRanks[a[2]] - handRanks[b[2]];
  return compareHands(a[0], b[0]);
}).reduce((acc, [_ch, cb, _ct], i) => acc + cb * (i + 1), 0);

console.log('part 1', p1); // 250347426

const jokerCardRanks = {
  ...cardRanks,
  'J': 0
}

function getJokerHandType(hand) {
  const cards = {}
  let jCount = 0;
  for (const c of hand) {
    if (c === 'J') jCount++;
    else {
      cards[c] ? cards[c]++ : cards[c] = 1;
    }
  }
  const counts = Object.values(cards).sort((a, b) => b - a);
  const firstCard = (counts[0] || 0) + jCount;
  if (firstCard === 5) return '5K';
  if (firstCard === 4) return '4K';
  if (firstCard === 3) {
    return counts[1] === 2 ? 'FH' : '3K';
  }
  if (firstCard === 2) {
    return counts[1] === 2 ? '2P' : '1P';
  }
  return 'HC';
}

function compareJokerHands(a, b) {
  for (let i = 0; i < a.length; i++) {
    if (a[i] === b[i]) continue;
    return jokerCardRanks[a[i]] - jokerCardRanks[b[i]];
  }
  return 0;
}

const jokerHands = handsBets.map(([hand, bet]) => {
  const type = getJokerHandType(hand);
  return [hand, bet, type];
}).sort((a, b) => {
  if (a[2] !== b[2]) return handRanks[a[2]] - handRanks[b[2]];
  return compareJokerHands(a[0], b[0]);
});

console.log(jokerHands);
// for (let i = 0; i < jokerHands.length - 1; i++) {
//   if (compareJokerHands(jokerHands[i], jokerHands[i + 1]) > 0) console.log('found a problem', i)
// }
// console.log(jokerCardRanks);

const p2 = jokerHands.reduce((acc, [_ch, cb, _ct], i) => acc + cb * (i + 1), 0);

console.log('part 2', p2); // NOT 251181217, too low
// IS 251224870, wasn't handling 'JJJJJ' hand correctly
