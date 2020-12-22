import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const recipes = readFileSync(__dirname + '/inputs/day21.input', 'utf8').split('\n').map(recipe => {
  let split = recipe.slice(0, -1).split(' (contains ');
  return [split[0].split(' '), split[1].split(',').map(all => all.trim())];
});

const possibleAllergens = {};
for (const recipe of recipes) {
  const ingredients = recipe[0];
  const allergens = recipe[1];
  for (const allergen of allergens) {
    if (!possibleAllergens[allergen]) {
      possibleAllergens[allergen] = new Set(ingredients);
    } else {
      possibleAllergens[allergen] = new Set(ingredients.filter(ingredient => possibleAllergens[allergen].has(ingredient)));
    }
  };
};

const validAllergens = new Set();
for (const keys in possibleAllergens) {
  const curr = possibleAllergens[keys];
  for (const allergen of curr) {
    validAllergens.add(allergen);
  }
}

const allIngredients = {};
for (const recipe of recipes) {
  for (const ingredient of recipe[0]) {
    allIngredients[ingredient] ? allIngredients[ingredient]++ : allIngredients[ingredient] = 1;
  }
}

let total = 0;
for (const keys in allIngredients) {
  if (validAllergens.has(keys)) continue;
  total += allIngredients[keys];
}

console.log('part one', total); // 2307

const allergicIngredients = {};
while (Object.keys(allergicIngredients).length < validAllergens.size) {
  for (const keys in possibleAllergens) {
    let curr = possibleAllergens[keys];
    if (curr.size === 1) {
      const val = [...curr].join();
      allergicIngredients[keys] = val;
      for (const otherKeys in possibleAllergens) {
        if (keys === otherKeys) continue;
        if (possibleAllergens[otherKeys].has(val)) possibleAllergens[otherKeys].delete(val);
      }
      delete possibleAllergens[keys];
    }
  }
}

let res = [];
for (let keys in allergicIngredients) {
  res.push(keys);
}
res.sort();
for (let i = 0; i < res.length; i++) {
  res[i] = allergicIngredients[res[i]];
}

console.log('part two', res.join(',')); // cljf,frftg,vvfjj,qmrps,hvnkk,qnvx,cpxmpc,qsjszn
