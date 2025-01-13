import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day13.input', 'utf8');

function parseInput(input: string) {
  const rows = input.split('\n');
  const map: Map<string, Map<string, number>> = new Map();
  for (const row of rows) {
    const [person, _1, net, number, _2, _3, _4, _5, _6, _7, nei] =
      row.split(' ');
    const diff = Number(number) * (net === 'gain' ? 1 : -1);
    if (!map.has(person)) {
      map.set(person, new Map());
    }
    map.get(person)!.set(nei.slice(0, -1), diff);
  }
  return map;
}

function dfs(
  node: string,
  happinessGraph: Map<string, Map<string, number>>,
  table: Record<string, Record<'left' | 'right', boolean>>
): number {
  if (table[node].right) {
    for (let key in table) {
      if (!table[key].left || !table[key].right) return -Infinity;
    }
    return 0;
  }
  let max = 0;
  const neighbors = happinessGraph.get(node)!;
  for (const [person, val] of neighbors) {
    if (table[person].left) continue;
    table[person].left = true;
    table[node].right = true;
    const curr =
      val +
      happinessGraph.get(person)!.get(node)! +
      dfs(person, happinessGraph, table);
    max = Math.max(max, curr);
    table[person].left = false;
    table[node].right = false;
  }
  return max;
}

function partOne() {
  const happinessGraph = parseInput(input);
  const table: Record<string, Record<'left' | 'right', boolean>> = {};
  for (const person of happinessGraph.keys()) {
    table[person] = { left: false, right: false };
  }
  const person = happinessGraph.keys().next().value!;
  return dfs(person, happinessGraph, table);
}

console.log('The answer to Part One may be', partOne());

function partTwo() {}

console.log('The answer to Part Two may be', partTwo());
