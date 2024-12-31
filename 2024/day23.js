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

const graph = buildGraph(connections);

function partOne() {
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

function findMaxGroupSize(group, next) {
  if (next.length === 0) return [...group.sort()].join(',');
  const skip = findMaxGroupSize(group, next.slice(1));
  const curr = next[0];
  for (const v of group) {
    if (!graph.get(v).has(curr)) return skip;
  }
  group.push(curr);
  const take = findMaxGroupSize([...group], next.slice(1));
  group.pop();
  return skip.length > take.length ? skip : take;
}

function partTwo() {
  let password = '';
  for (const [key, value] of graph) {
    const group = [key];
    const nei = [...value];
    const maxGroup = findMaxGroupSize(group, nei);
    if (maxGroup.length >= password.length) password = maxGroup;
  }
  return password;
}

console.log('The answer to Part Two may be', partTwo());
