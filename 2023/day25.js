import { mincut } from '@graph-algorithm/minimum-cut';
import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));

function getProductOfGroupSizes(connections) {
  let connectionArray = [...connections].map((v) => v.split('~'));
  for (const [from, to] of mincut(connectionArray)) {
    connections.delete(`${from}~${to}`);
    connections.delete(`${to}~${from}`);
  }
  connectionArray = [...connections].map((v) => v.split('~'));
  const groups = [];
  const components = new Set(connectionArray.flat());
  const visited = new Set();

  for (const component of components) {
    if (visited.has(component)) continue;
    const group = [];
    const queue = [component];
    while (queue.length) {
      const component = queue.shift();
      if (visited.has(component)) continue;
      visited.add(component);
      group.push(component);
      const links = connectionArray
        .filter((conn) => conn.includes(component))
        .flat();
      queue.push(...links);
    }
    groups.push(group);
  }
  return groups
    .map((group) => group.length)
    .reduce((acc, curr) => acc * curr, 1);
}

function partOne() {
  const input = readFileSync(
    __dirname + '/2023/inputs/day25.input',
    'utf-8'
  ).split('\n');
  const lines = input.map((l) => l.split(':'));
  const connectionSet = new Set();
  for (let [head, connections] of lines) {
    connections = connections.trimStart().split(' ');
    for (const nei of connections) {
      connectionSet.add(`${head}~${nei}`);
    }
  }
  return getProductOfGroupSizes(connectionSet);
}

const p1 = partOne();

console.log('part one', p1);
