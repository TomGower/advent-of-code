import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));

function getValue(part) {
  return part.x + part.m + part.a + part.s;
}

function parsePart(s) {
  const res = {};
  const trimmed = s.slice(1, -1);
  const pairs = trimmed.split(',');
  for (const pair of pairs) {
    const [k, v] = pair.split('=');
    res[k] = +v;
  }
  return res;
}

function parseOrder(order) {
  const orders = order.split(',');
  const res = [];
  for (const order of orders) {
    if (order.length === 1 || /^[a-z]+$/.test(order)) {
      res.push(order);
    } else {
      const [pieces, outcome] = order.split(':');
      if (pieces.includes('>')) {
        const comp = pieces.split('>');
        res.push({
          key: comp[0],
          val: parseInt(comp[1]),
          outcome,
        });
      } else {
        const comp = pieces.split('<');
        res.push({
          key: comp[0],
          val: -parseInt(comp[1]),
          outcome,
        });
      }
    }
  }
  return res;
}

function parseInstructions(arr) {
  const res = new Map();
  arr.forEach((s) => {
    const [key, order] = s.slice(0, -1).split('{');
    res.set(key, parseOrder(order));
  });
  return res;
}

function bfs(part, iKey, instructions) {
  const order = instructions.get(iKey);
  if (typeof order === 'string') {
    if (order.length === 1) {
      return order === 'A' ? getValue(part) : 0;
    } else {
      return bfs(part, order, instructions);
    }
  } else {
    for (const o of order) {
      if (typeof o === 'string') {
        if (o.length === 1) {
          return o === 'A' ? getValue(part) : 0;
        } else {
          return bfs(part, o, instructions);
        }
      } else {
        const { key, val, outcome } = o;
        const partVal = part[key];
        if (val < 0) {
          if (partVal < -val) {
            if (outcome.length === 1)
              return outcome === 'A' ? getValue(part) : 0;
            return bfs(part, outcome, instructions);
          }
        } else {
          if (partVal > val) {
            if (outcome.length === 1)
              return outcome === 'A' ? getValue(part) : 0;
            return bfs(part, outcome, instructions);
          }
        }
      }
    }
  }
  throw new Error('should not get here', part, instructions.get(iKey));
}

function partOne() {
  const input = readFileSync(__dirname + '/2023/inputs/day19.input', 'utf8');
  const [instructions, parts] = input.split('\n\n').map((v) => v.split('\n'));
  const parsedInstructions = parseInstructions(instructions);
  const parsedParts = parts.map(parsePart);

  return parsedParts.reduce(
    (acc, curr) => acc + bfs(curr, 'in', parsedInstructions),
    0
  );
}

const p1 = partOne();

console.log('part one', p1); // 472630

function clone(x) {
  return JSON.parse(JSON.stringify(x));
}

function calculateProduct(ranges) {
  let res = 1;
  for (let key in ranges) {
    if (key === 'key') continue;
    res *= ranges[key].max - ranges[key].min + 1;
  }
  return res;
}

function followOrders(curr, orders) {
  const res = [];

  for (const o of orders) {
    if (typeof o === 'string') {
      res.push({ ...clone(curr), key: o });
    } else {
      const { key, val, outcome } = o;
      if (val < 0) {
        if (curr[key].max <= -val) {
          res.push({ ...clone(curr) });
        } else {
          if (curr[key].min >= -val) continue;
          res.push({
            ...clone(curr),
            key: outcome,
            [key]: { min: curr[key].min, max: -val - 1 },
          });
          curr[key].min = -val;
        }
      } else {
        if (curr[key].min >= val) {
          res.push({ ...clone(curr) });
        } else {
          if (curr[key].max < val) continue;
          res.push({
            ...clone(curr),
            key: outcome,
            [key]: { min: val + 1, max: curr[key].max },
          });
          curr[key].max = val;
        }
      }
    }
  }
  return res;
}

function bfs2(queue, parsedInstructions) {
  let res = 0;

  while (queue.length) {
    const curr = queue.shift();
    if (curr.key === 'R') continue;
    if (curr.key === 'A') {
      res += calculateProduct(curr);
      continue;
    }
    const order = parsedInstructions.get(curr.key);
    queue.push(...followOrders(curr, order));
  }

  return res;
}

function partTwo() {
  const input = readFileSync(__dirname + '/2023/inputs/day19.input', 'utf8');
  const [instructions, _parts] = input.split('\n\n').map((v) => v.split('\n'));
  const parsedInstructions = parseInstructions(instructions);

  const props = ['x', 'm', 'a', 's'];

  const start = { key: 'in' };
  props.forEach((p) => {
    start[p] = {
      min: 1,
      max: 4000,
    };
  });
  const queue = [start];

  return bfs2(queue, parsedInstructions);
}

const p2 = partTwo();

console.log('part two', p2); // IS 116738260946855
