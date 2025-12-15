import { fstat, readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day11.input', 'utf8');
const rows = input.split('\n');

function processRow(row) {
  const items = row.split(':');
  const node = items[0];
  const destinations = items[1].split(' ').filter((v) => v !== '');
  return [node, destinations];
}

function buildGraph(rows) {
  const map = new Map();
  for (const row of rows) {
    const [node, destinations] = processRow(row);
    map.set(node, destinations);
  }
  return map;
}

function dfs(node, graph, memo) {
  if (memo.has(node)) return memo.get(node);
  let count = 0;
  const destinations = graph.get(node) ?? [];
  for (const adj of destinations) {
    if (adj === 'out') return 1;
    count += dfs(adj, graph, memo);
  }
  memo.set(node, count);
  return count;
}

function partOne() {
  const graph = buildGraph(rows);
  const memo = new Map();
  return dfs('you', graph, memo);
}

console.log('the answer to Part One may be', partOne());
