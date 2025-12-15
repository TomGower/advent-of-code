import { readFileSync } from 'fs';
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

const graph = buildGraph(rows);

function dfs(node, graph, memo, fftVisited = true, dacVisited = true) {
  const key = `${node}~${fftVisited}~${dacVisited}`;
  if (memo.has(key)) return memo.get(key);
  let count = 0;
  const destinations = graph.get(node) ?? [];
  for (const adj of destinations) {
    if (adj === 'out') {
      return fftVisited && dacVisited ? 1 : 0;
    }
    if (adj === 'fft') {
      count += dfs(adj, graph, memo, true, dacVisited);
    } else if (adj === 'dac') {
      count += dfs(adj, graph, memo, fftVisited, true);
    } else {
      count += dfs(adj, graph, memo, fftVisited, dacVisited);
    }
  }
  memo.set(key, count);
  return count;
}

function partOne() {
  const memo = new Map();
  return dfs('you', graph, memo);
}

console.log('the answer to Part One may be', partOne());

function partTwo() {
  const memo = new Map();
  return dfs('svr', graph, memo, false, false);
}

console.log('the answer to Part Two may be', partTwo());
