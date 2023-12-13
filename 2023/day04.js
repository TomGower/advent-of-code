import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const values = readFileSync(__dirname + '/2023/inputs/day04.input', 'utf8').split('\n');

const valuesMinusCards = values.map(v => v.split(':')[1].trim());

let p1 = 0;

for (let i = 0; i < valuesMinusCards.length; i++) {
  const values = valuesMinusCards[i];
  let [winners, tickets] = values.split('|');
  winners = new Set(winners.split(' ').filter(v => v).map(v => +v));
  tickets = tickets.split(' ').filter(v => v).map(v => +v);
  let res = 0;
  for (const t of tickets) {
    if (winners.has(t)) {
      res = res === 0 ? 1 : res * 2;
    }
  }
  p1 += res;
}

console.log('part 1', p1); // 26346
