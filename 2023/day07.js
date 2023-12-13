import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const values = readFileSync(__dirname + '/2023/inputs/day07test.input', 'utf8').split('\n');

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
