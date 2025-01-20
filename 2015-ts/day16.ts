import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day16.input', 'utf8');

type Category =
  | 'children'
  | 'cats'
  | 'samoyeds'
  | 'pomeranians'
  | 'akitas'
  | 'vizslas'
  | 'goldfish'
  | 'trees'
  | 'cars'
  | 'perfumes';

const categoryNames = [
  'children',
  'cats',
  'samoyeds',
  'pomeranians',
  'akitas',
  'vizslas',
  'goldfish',
  'trees',
  'cars',
  'perfumes',
];

const correctProfile: Record<Category, number> = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
};

function parseInput(
  input: string
): Record<'idx' | Partial<Category>, number>[] {
  const lines = input.split('\n');
  const res: Record<'idx' | Partial<Category>, number>[] = [];
  for (let i = 0; i < lines.length; i++) {
    const exp = /Sue (?<idx>\d+): (?<description>.+)/;
    const match = lines[i].match(exp);
    if (match && match.groups) {
      const { idx, description } = match.groups;
      const person: Record<string, number> = {};
      person.idx = +idx;
      const categories = description.split(', ');
      for (const category of categories) {
        const [name, count] = category.split(': ') as [Category, string];
        person[name] = +count;
      }
      res.push(person);
    }
  }
  return res;
}

const sues = parseInput(input);

function partOne() {
  let res = 0;
  for (const person of sues) {
    let isValid = true;
    for (let key in person) {
      if (key === 'idx') continue;
      const categoryKey = key as Category;
      if (
        correctProfile[categoryKey] === undefined ||
        person[categoryKey] !== correctProfile[categoryKey]
      ) {
        isValid = false;
        break;
      }
    }
    if (isValid) res = person.idx;
  }
  return res;
}

console.log('The answer to Part One may be', partOne());

function partTwo() {}

console.log('The answer to Part Two may be', partTwo());
