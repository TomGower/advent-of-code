import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day09.input', 'utf8');

const trips: string[][] = input.split('\n').map((v) => {
  const trip = v.split(' ');
  const [a, _to, b, _equal, dist] = trip;
  return [a, b, dist];
});

function makeGraph(trips: string[][]): Map<string, Map<string, number>> {
  const map: Map<string, Map<string, number>> = new Map();
  for (const [a, b, dist] of trips) {
    if (!map.has(a)) map.set(a, new Map());
    if (!map.has(b)) map.set(b, new Map());
    map.get(a)!.set(b, +dist);
    map.get(b)!.set(a, +dist);
  }
  return map;
}
const graph = makeGraph(trips);

function partOne() {
  const target = graph.size;
  const queue: { curr: string; total: number; visited: Set<string> }[] = [];
  for (const [a, b, dist] of trips) {
    queue.push({ curr: a, total: +dist, visited: new Set([a, b]) });
    queue.push({ curr: b, total: +dist, visited: new Set([a, b]) });
  }
  let minDist = Infinity;

  while (queue.length) {
    const { curr, total, visited } = queue.shift()!;
    if (visited.size === target) {
      minDist = Math.min(minDist, total);
      continue;
    }
    const next = graph.get(curr)!;
    for (const [node, dist] of next) {
      if (visited.has(node)) continue;
      const nextVisited = new Set(visited);
      nextVisited.add(node);
      queue.push({ curr: node, total: total + dist, visited: nextVisited });
    }
  }

  return minDist;
}

console.log('The answer to Part One may be', partOne());

function partTwo() {}

console.log('The answer to Part Two may be', partTwo());
