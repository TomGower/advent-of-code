import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day23.input', 'utf8');
const connections = input.split('\n').map((v) => v.split('-'));

function buildGraph(connections) {
  const map = new Map();
  for (const [a, b] of connections) {
    if (!map.has(a)) map.set(a, new Set());
    if (!map.has(b)) map.set(b, new Set());
    map.get(a).add(b);
    map.get(b).add(a);
  }
  return map;
}

function findTrios(map) {
  const seen = new Set();
  for (const [key, value] of map) {
    const arrValues = Array.from(value);
    for (let i = 0; i < arrValues.length; i++) {
      for (let j = i + 1; j < arrValues.length; j++) {
        if (map.get(arrValues[i]).has(arrValues[j])) {
          const values = [key, arrValues[i], arrValues[j]].sort().join('~');
          seen.add(values);
        }
      }
    }
  }
  return seen;
}

function partOne() {
  const graph = buildGraph(connections);
  const groups = findTrios(graph);
  let count = 0;
  for (const trio of groups) {
    const comps = trio.split('~');
    inner: for (const id of comps) {
      if (id[0] === 't') {
        count++;
        break inner;
      }
    }
  }
  return count;
}

console.log('The answer to Part One may be', partOne());

function partTwo() {}

console.log('The answer to Part Two may be', partTwo());
