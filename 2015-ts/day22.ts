import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day22.input', 'utf8');
const bossStats = input
  .split('\n')
  .map((v) => v.split(': ')[1])
  .map(Number) as [number, number];

const playerStats: [number, number] = [50, 500];

type Spell = 'magic missile' | 'drain' | 'shield' | 'poison' | 'recharge';

const spells: Record<Spell, any> = {
  'magic missile': {
    cost: 53,
    damage: 4,
  },
  drain: {
    cost: 73,
    damage: 2,
    heal: 2,
  },
  shield: {
    cost: 113,
    effect: {
      duration: 6,
      armor: 7,
    },
  },
  poison: {
    cost: 173,
    effect: {
      duration: 6,
      damage: 3,
    },
  },
  recharge: {
    cost: 229,
    effect: {
      duration: 5,
      mana: 101,
    },
  },
};

function canPlayerWinFight(
  manaAvailable: number,
  hurtPlayer: boolean = false,
  playerInfo: [number, number] = playerStats,
  bossInfo: [number, number] = bossStats,
  effects: Record<
    string,
    { duration: number; damage?: number; mana?: number; armor?: number }
  > = {},
  turn: number = 0
): boolean {
  let [php, pmana] = playerInfo;
  let parmor = 0;
  let [bhp, batt] = bossInfo;

  const nextEffects: Record<
    string,
    { duration: number; damage?: number; mana?: number; armor?: number }
  > = {};
  for (const key in effects) {
    nextEffects[key] = { ...effects[key] };
  }

  for (const key in nextEffects) {
    if (nextEffects[key].duration > 0) {
      if (key === 'poison') bhp -= nextEffects[key].damage!;
      if (key === 'recharge') pmana += nextEffects[key].mana!;
      if (nextEffects[key].duration >= 0)
        if (key === 'shield') parmor = nextEffects[key].armor!;
      nextEffects[key].duration -= 1;
    }
    if (nextEffects[key].duration === 0) delete nextEffects[key];
  }

  if (bhp <= 0) return true;
  if (php <= 0) return false;

  if (turn % 2 === 0) {
    if (hurtPlayer) {
      php--;
      if (php <= 0) return false;
    }

    for (const spellKey in spells) {
      const spell = spells[spellKey as Spell];
      if (pmana < spell.cost || manaAvailable < spell.cost || effects[spellKey])
        continue;

      const newEffects = cloneEffects(nextEffects);
      let newPHP = php;
      let newBHP = bhp;
      let newPMana = pmana - spell.cost;

      if (spellKey === 'magic missile') newBHP -= spell.damage;
      if (spellKey === 'drain') {
        newBHP -= spell.damage;
        newPHP += spell.heal!;
      }
      if (spell.effect) newEffects[spellKey] = { ...spell.effect };

      if (
        canPlayerWinFight(
          manaAvailable - spell.cost,
          hurtPlayer,
          [newPHP, newPMana],
          [newBHP, batt],
          newEffects,
          turn + 1
        )
      )
        return true;
    }

    return false;
  } else {
    const damage = Math.max(1, batt - parmor);
    const newEffects = cloneEffects(nextEffects);
    return canPlayerWinFight(
      manaAvailable,
      hurtPlayer,
      [php - damage, pmana],
      [bhp, batt],
      newEffects,
      turn + 1
    );
  }
}

function cloneEffects(
  effects: Record<
    string,
    { duration: number; damage?: number; mana?: number; armor?: number }
  >
): typeof effects {
  const cloned: typeof effects = {};
  for (const key in effects) {
    cloned[key] = { ...effects[key] };
  }
  return cloned;
}

function partOne() {
  let lo = 0;
  let hi = 10 ** 5;
  let res = Infinity;

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (canPlayerWinFight(mid)) {
      res = mid;
      hi = mid - 1;
    } else {
      lo = mid + 1;
    }
  }

  return res;
}

console.time('one');
console.log('The answer to Part One may be', partOne());
console.timeEnd('one');

function partTwo() {
  let lo = 0;
  let hi = 10 ** 5;
  let res = Infinity;
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (canPlayerWinFight(mid, true)) {
      res = mid;
      hi = mid - 1;
    } else {
      lo = mid + 1;
    }
  }
  return res;
}

console.time('two');
console.log('The answer to Part Two may be', partTwo());
console.timeEnd('two');
