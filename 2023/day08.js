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

function findCycleLength(startNode) {
  const destinations = [];
  let moves = 0;
  const queue = [startNode];
  while (destinations.length < 10) {
    const dir = steps[moves % stepCount];
    const curr = queue.shift();
    if (curr[2] === 'Z') {
      destinations.push(moves);
      if (moves - destinations[0] === 0) return destinations[0];
    }
    const next = connectionMap.get(curr);
    const nextNode = dir === 'L' ? next[0] : next[1];
    queue.push(nextNode);
    moves++;
  }
  return destinations;
}

console.log(findCycleLength('LCA'));

function partTwo() {
  let moves = 0;
  
  const startNodes = [...connectionMap.keys()].filter(v => v[2] === 'A');

  let queue = [...startNodes];

  const cycleLengths = queue.map(findCycleLength);
  console.log(cycleLengths); // [11567, 19637, 15871, 21251, 12643, 19099]

  // this doesn't work, these have common factors
  // I'm not writing my own LCM functionality, see below
  return cycleLengths.reduce((acc, curr) => acc * curr, 1);

  // TAKES FOREVER AND EVER AND EVER TO RUN, POTENTIALLY WEEKS?
  // while (true) {
  //   const dir = steps[moves % stepCount];
  //   if (moves >= (10 ** 9)) break;
  //   const nextQueue = [];
  //   for (const node of queue) {
  //     const next = connectionMap.get(node);
  //     nextQueue.push(dir === 'L' ? next[0] : next[1]);
  //   }
  //   moves++;
  //   if (nextQueue.every(v => v[2] === 'Z')) return moves;
  //   queue = nextQueue;
  // }
}

const p2 = partTwo();

// LCM calculator: https://www.calculatorsoup.com/calculators/math/lcm.php

console.log('part two', p2);
// answer 13,133,452,426,987
