import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day10.input', 'utf8');
const rows = input.split('\n');
const machines = rows.map((v) => {
  const parts = v.split(' ');
  return [parts[0], parts.slice(1, -1), parts.at(-1)];
});

function activateLight(target, buttons) {
  target = target.slice(1, -1);
  buttons = buttons.map((v) => {
    const parts = v.split(' ').map((button) => button.slice(1, -1));
    return parts
      .map((v) => (v.indexOf(',') === -1 ? [+v] : v.split(',').map(Number)))
      .flat();
  });
  const initial = '.'.padEnd(target.length, '.');
  if (initial === target) return 0;
  const visited = new Set([initial]);
  let queue = [initial];
  let steps = 1;
  let idx = 0;
  while (idx < queue.length) {
    const nextQueue = [];
    for (const state of queue) {
      for (const button of buttons) {
        const curr = state.split('');
        for (const key of button) {
          curr[key] = curr[key] === '.' ? '#' : '.';
        }
        const newState = curr.join('');
        if (newState === target) return steps;
        if (visited.has(newState)) continue;
        visited.add(newState);
        nextQueue.push(newState);
      }
    }
    steps++;
    queue = nextQueue;
  }
  return -1;
}

function partOne() {
  let res = 0;
  for (const [diagram, buttons, _voltage] of machines) {
    res += activateLight(diagram, buttons);
  }
  return res;
}

console.log('the answer to Part One may be', partOne());
