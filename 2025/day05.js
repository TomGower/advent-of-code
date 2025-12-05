import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day05.input', 'utf8');
const [ranges, ingredients] = input.split('\n\n').map((v) => v.split('\n'));
const parsedRanges = ranges.map((v) => v.split('-').map(BigInt));
const parsedIngredients = ingredients.map(BigInt);

function mergeIntervals(intervals) {
  intervals.sort((a, b) => {
    if (a[0] < b[0]) return -1;
    return 1;
  });
  const res = [];
  for (const [start, end] of intervals) {
    if (res.length === 0 || start > res.at(-1)[1]) {
      res.push([start, end]);
    } else {
      if (end > res.at(-1)[1]) res.at(-1)[1] = end;
    }
  }
  return res;
}

function partOne() {
  const sortedRanges = mergeIntervals(parsedRanges);
  const sortedIngredients = parsedIngredients.sort((a, b) => {
    if (a < b) return -1;
    return 1;
  });
  let res = 0;
  let rangeIdx = 0,
    ingredientsIdx = 0;
  while (
    ingredientsIdx < sortedIngredients.length &&
    rangeIdx < sortedRanges.length
  ) {
    if (sortedIngredients[ingredientsIdx] < sortedRanges[rangeIdx][0]) {
      ingredientsIdx++;
    } else if (sortedRanges[rangeIdx][1] < sortedIngredients[ingredientsIdx]) {
      rangeIdx++;
    } else {
      res++;
      ingredientsIdx++;
    }
  }
  return res;
}

console.log('the answer to Part One may be', partOne());
