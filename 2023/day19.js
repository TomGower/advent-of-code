import { readFileSync } from 'fs';
import path, { parse } from 'path';
const __dirname = path.resolve(path.dirname(''));

function getValue(part) {
  return part.x + part.m + part.a + part.s;
}

function parsePart(s) {
  const res = {};
  const trimmed = s.slice(1, -1);
  const pairs = trimmed.split(',');
  for (const pair of pairs) {
    const [k, v] = pair.split('=')
    res[k] = +v;
  }
  return res;
}

function parseOrder(order) {
  const orders = order.split(',')
  const res = [];
  for (const order of orders) {
    if (order.length === 1 || /^[a-z]+$/.test(order)) {
      res.push(order);
    } else {
      const [pieces, outcome] = order.split(':')
      if (pieces.includes('>')) {
        const comp = pieces.split('>')
        res.push({
          key: comp[0],
          val: parseInt(comp[1]),
          outcome
        });
      } else {
        const comp = pieces.split('<')
        res.push({
          key: comp[0],
          val: -(parseInt(comp[1])),
          outcome
        })
      }
    }
  }
  return res;
}

// console.log(/^[a-z]+$/.test('vv'))

function parseInstructions(arr) {
  const res = new Map();
  arr.forEach(s => {
    const [key, order] = (s.slice(0, -1)).split('{');
    res.set(key, parseOrder(order));
  })
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
            if (outcome.length === 1) return outcome === 'A' ? getValue(part) : 0;
            return bfs(part, outcome, instructions); 
          }
        } else {
          if (partVal > val) {
            if (outcome.length === 1) return outcome === 'A' ? getValue(part) : 0;
            return bfs(part, outcome, instructions); 
          }
        }
      }
    }
  }
  console.log('should not get here', part, instructions.get(iKey));
  return 0;
}

function partOne() {
  const input = readFileSync(__dirname + '/2023/inputs/day19.input', 'utf8');
  const [instructions, parts] = input.split('\n\n').map(v => v.split('\n'));
  const parsedInstructions = parseInstructions(instructions);
  const parsedParts = parts.map(parsePart);

  return parsedParts.reduce((acc, curr) => acc + bfs(curr, 'in', parsedInstructions), 0);
}

const p1 = partOne();

console.log('part one', p1); // 472630
