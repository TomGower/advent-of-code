import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));

function createNodeMap(input) {
  const map = new Map();
  const nodes = input.split('\n');
  for (const n of nodes) {
    const node = describeNode(n);
    map.set(node.name, node);
  }
  for (const [k, v] of map) {
    for (const t of v.targets) {
      const tNode = map.get(t);
      if (tNode?.type === '&') {
        tNode.inputs[k] = false;
      }
    }
  }
  return map;
}

function describeNode(s) {
  const [label, targetData] = s.split(' -> ');
  const targets = targetData.split(', ');
  if (label === 'broadcaster') {
    const name = label;
    return {
      name,
      targets,
    };
  } else {
    const type = label[0];
    const name = label.slice(1);
    return { name, type, targets, prev: false, isOn: false, inputs: {} };
  }
}

function processPulse(prev, pulseType, nodeName, nodeMap) {
  const res = [];
  const node = nodeMap.get(nodeName);
  if (node?.type === '%') {
    if (pulseType) return [];
    if (pulseType === false) node.isOn = !node.isOn;
    return node.targets.map((t) => [nodeName, node.isOn, t]);
  } else if (node?.type === '&') {
    node.inputs[prev] = pulseType;
    if (Object.values(node.inputs).every((v) => v)) {
      return node.targets.map((t) => [nodeName, false, t]);
    } else {
      return node.targets.map((t) => [nodeName, true, t]);
    }
  }
  if (!node) return [];
  throw new Error(
    `should be able to get to here, I dont think, nodename is ${nodeName}, node is ${node}`
  );
}

function runCycle(nodeMap) {
  let lo = 1;
  let hi = 0;
  const queue = [];
  const startNode = nodeMap.get('broadcaster');
  for (const t of startNode.targets) {
    queue.push([startNode.name, false, t]);
  }
  while (queue.length) {
    const [prev, pulseType, nodeName] = queue.shift();
    pulseType ? hi++ : lo++;
    queue.push(...processPulse(prev, pulseType, nodeName, nodeMap));
  }
  return [lo, hi];
}

// console.log(describeNode('broadcaster -> bt, rc, qs, qt'));

function partOne() {
  const input = readFileSync(__dirname + '/2023/inputs/day20.input', 'utf8');
  const nodeMap = createNodeMap(input);
  let lo = 0;
  let hi = 0;
  for (let i = 0; i < 1000; i++) {
    const [cLo, cHi] = runCycle(nodeMap);
    lo += cLo;
    hi += cHi;
  }
  console.log('lo, hi', lo, hi);
  return lo * hi;
}

const p1 = partOne();

console.log('part one', p1); // IS 861743850
