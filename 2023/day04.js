import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const values = readFileSync(__dirname + '/2023/inputs/day04.input', 'utf8').split('\n');

const valuesMinusCards = values.map(v => v.split(':')[1].trim());

let p1 = 0;

// const cardMap = {};
const cardMap = new Map();

for (let i = 0; i < valuesMinusCards.length; i++) {
  const values = valuesMinusCards[i];
  let [winners, tickets] = values.split('|');
  winners = new Set(winners.split(' ').filter(v => v).map(v => +v));
  tickets = tickets.split(' ').filter(v => v).map(v => +v);
  let res = 0;
  let tix = 1;
  for (const t of tickets) {
    if (winners.has(t)) {
      res = res === 0 ? 1 : res * 2;
      if (!cardMap.has(i)) cardMap.set(i, []);
      cardMap.get(i).push(i + tix++);
      // cardMap[i] ? cardMap[i].push(i + tix++) : cardMap[i] = [i + tix++];
    }
  }
  p1 += res;
}

console.log('part 1', p1); // 26346

const queue = new Array(values.length).fill().map((_, i) => i);
let p2 = 0;
console.log(cardMap)

while (queue.length) {
  const curr = queue.shift();
  // if (cardMap[curr]) queue.push(...cardMap[curr]);
  queue.push(...(cardMap.get(curr) ?? []));
  p2++;
}

console.log('part 2', p2); // NOT 1022637, NOT 1956116 (more than that), IS 8467762
