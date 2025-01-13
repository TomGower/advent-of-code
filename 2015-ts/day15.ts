import { readFileSync } from 'fs';
import path, { resolve } from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day15.input', 'utf8');

type Ingredient = {
  name: string;
  capacity: number;
  durability: number;
  flavor: number;
  texture: number;
  calories: number;
};

function parseInput(input: string): any {
  const ingredients: Ingredient[] = [];
  const rows = input.split('\n');
  for (const row of rows) {
    const exp =
      /(?<name>[A-Za-z]+): capacity (?<capacity>-?\d+), durability (?<durability>-?\d+), flavor (?<flavor>-?\d+), texture (?<texture>-?\d+), calories (?<calories>-?\d+)/;
    const match = row.match(exp);

    if (match && match.groups) {
      ingredients.push(
        Object.entries(match.groups).reduce((acc, [key, value]) => {
          acc[key] = key === 'name' ? value : Number(value);
          return acc;
        }, {}) as Ingredient
      );
    }
  }
  return ingredients;
}

const ingredients = parseInput(input);

function findOptimalPairing(
  ingredients: Ingredient[],
  idx: number,
  capacity: number,
  durability: number,
  flavor: number,
  texture: number,
  calories: number,
  remaining: number
): number {
  if (idx === ingredients.length || remaining === 0) {
    if (remaining > 0) return 0;
    if (
      capacity < 0 ||
      durability < 0 ||
      flavor < 0 ||
      texture < 0 ||
      calories < 0
    )
      return 0;
    return capacity * durability * flavor * texture;
  }
  const curr = ingredients[idx];
  let max = 0;
  for (let i = 1; i <= remaining; i++) {
    const currMix = findOptimalPairing(
      ingredients,
      idx + 1,
      capacity + i * curr.capacity,
      durability + i * curr.durability,
      flavor + i * curr.flavor,
      texture + i * curr.texture,
      calories + i * curr.calories,
      remaining - i
    );
    max = Math.max(max, currMix);
  }
  return max;
}

function partOne() {
  return findOptimalPairing(ingredients, 0, 0, 0, 0, 0, 0, 100);
}

console.log('The answer to Part One may be', partOne());

function findBestCookie(
  ingredients: Ingredient[],
  idx: number,
  capacity: number,
  durability: number,
  flavor: number,
  texture: number,
  calories: number,
  remaining: number
): number {
  if (calories > 500) return 0;
  if (idx === ingredients.length || remaining === 0) {
    if (remaining > 0 || calories !== 500) return 0;
    if (
      capacity < 0 ||
      durability < 0 ||
      flavor < 0 ||
      texture < 0 ||
      calories < 0
    )
      return 0;
    return capacity * durability * flavor * texture;
  }
  const curr = ingredients[idx];
  let max = 0;
  for (let i = 1; i <= remaining; i++) {
    const currMix = findBestCookie(
      ingredients,
      idx + 1,
      capacity + i * curr.capacity,
      durability + i * curr.durability,
      flavor + i * curr.flavor,
      texture + i * curr.texture,
      calories + i * curr.calories,
      remaining - i
    );
    max = Math.max(max, currMix);
  }
  return max;
}

function partTwo() {
  return findBestCookie(ingredients, 0, 0, 0, 0, 0, 0, 100);
}

console.log('The answer to Part Two may be', partTwo());
