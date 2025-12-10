import {
  MaxPriorityQueue,
  MinPriorityQueue,
} from '@datastructures-js/priority-queue';
import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day08.input', 'utf8');
const values = input.split('\n').map((v) => v.split(',').map(Number));

function getDistance(i, j) {
  const [a1, b1, c1] = values[i];
  const [a2, b2, c2] = values[j];
  const dist = Math.sqrt((a1 - a2) ** 2 + (b1 - b2) ** 2 + (c1 - c2) ** 2);
  return dist;
}

function dfs(node, connections, visited) {
  if (visited[node]) return 0;
  let size = 0;
  const queue = [node];
  visited[node] = true;
  while (queue.length > 0) {
    const curr = queue.shift();
    size++;
    for (const adj of connections[curr]) {
      if (visited[adj]) continue;
      visited[adj] = true;
      queue.push(adj);
    }
  }
  return size;
}

function partOne(maxSize = 1000) {
  const pq = new MaxPriorityQueue((a) => a.value);
  const n = values.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const dist = getDistance(i, j);
      pq.enqueue({
        value: dist,
        i,
        j,
      });
      if (pq.size() > maxSize) pq.dequeue();
    }
  }
  const connections = new Array(n).fill().map((_) => []);
  while (!pq.isEmpty()) {
    const { i, j } = pq.dequeue();
    connections[i].push(j);
    connections[j].push(i);
  }
  const sizeQueue = new MinPriorityQueue();
  const visited = new Array(n).fill(false);
  for (let i = 0; i < n; i++) {
    const groupSize = dfs(i, connections, visited);
    sizeQueue.enqueue(groupSize);
    if (sizeQueue.size() > 3) sizeQueue.dequeue();
  }
  let res = 1;
  while (!sizeQueue.isEmpty()) res *= sizeQueue.dequeue();
  return res;
}

console.log('the answer to Part One may be', partOne());
