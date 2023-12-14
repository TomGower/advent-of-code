import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const values = readFileSync(__dirname + '/2023/inputs/day08.input', 'utf8').split('\n\n');

function createConnection(s) {
  const pattern = /^(\w+)\s*=\s*\(([^,]+),\s*(.+)\)$/;
  const match = pattern.exec(s);
  const [_, node, left, right] = match;
  return [node, left, right];
}

const [steps, rawConnections] = values;
const connections = rawConnections.split('\n').map(createConnection);
const connectionMap = new Map();
connections.forEach(([node, left, right]) => {
  connectionMap.set(node, [left, right]);
})
const stepCount = steps.length;


function bfs(startNode, endNode) {
  const seen = new Set();
  let moves = 0;
  let step = 0;
  const queue = [startNode];
  while (queue.length) {
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      const curr = queue.shift();
      if (curr === endNode) return moves;
      const next = connectionMap.get(curr);
      steps[step] === 'L' ? queue.push(next[0]) : queue.push(next[1]);
    }
    step = (step + 1) % stepCount;
    moves++;
  }
}

const p1 = bfs('AAA', 'ZZZ');

console.log('part one', p1); // 12643

