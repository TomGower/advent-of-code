import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day21.input', 'utf8');
const bossStats = input
  .split('\n')
  .map((v) => v.split(': ')[1])
  .map(Number);

const weapons = [
  [8, 4, 0],
  [10, 5, 0],
  [25, 6, 0],
  [40, 7, 0],
  [74, 8, 0],
];
const armor = [
  [13, 0, 1],
  [31, 0, 2],
  [53, 0, 3],
  [75, 0, 4],
  [102, 0, 5],
];
const rings = [
  [25, 1, 0],
  [50, 2, 0],
  [100, 3, 0],
  [20, 0, 1],
  [40, 0, 2],
  [80, 0, 3],
];

function createCombinations(
  weapons: number[][],
  armor: number[][],
  rings: number[][]
): number[][] {
  const res: number[][] = [...weapons];
  let len = res.length;
  for (const [ca, aa, da] of armor) {
    res.push([ca, aa, da]);
    for (let i = 0; i < len; i++) {
      const [cost, att, def] = res[i];
      res.push([ca + cost, aa + att, da + def]);
    }
  }
  len = res.length;
  for (let i = 0; i < rings.length; i++) {
    const [ca, aa, da] = rings[i];
    res.push([ca, aa, da]);
    for (let j = 0; j < len; j++) {
      const [cost, att, def] = res[j];
      res.push([ca + cost, aa + att, da + def]);
      for (let k = i + 1; k < rings.length; k++) {
        const [ca2, aa2, da2] = rings[k];
        res.push([ca + cost + ca2, aa + att + aa2, da + def + da2]);
      }
    }
  }
  return res;
}

const possibleCombinations = createCombinations(weapons, armor, rings);

function doesPlayerWin(player: number[], boss: number[]): boolean {
  let [php, patt, pdef] = player;
  let [bhp, batt, bdef] = boss;

  let turn = 0;
  while (php > 0 && bhp > 0) {
    if (turn % 2 === 0) {
      bhp -= Math.max(patt - bdef, 1);
    } else {
      php -= Math.max(batt - pdef, 1);
    }
    turn++;
  }
  return php > 0;
}

function partOne() {
  let minCost = Infinity;
  for (const [cost, att, def] of possibleCombinations) {
    if (cost >= minCost) continue;
    if (doesPlayerWin([100, att, def], bossStats)) minCost = cost;
  }
  return minCost;
}

console.time('one');
console.log('The answer to Part One may be', partOne());
console.timeEnd('one');

function partTwo() {}

console.time('two');
console.log('The answer to Part Two may be', partTwo());
console.timeEnd('two');
