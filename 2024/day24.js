import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day24.input', 'utf8');
const [rawGates, rawPairings] = input.split('\n\n');

function createGateMap(rawGates) {
  const gates = rawGates.split('\n').map((v) => v.split(': '));
  const map = new Map();
  for (const [a, b] of gates) {
    map.set(a, +b);
  }
  return map;
}

const gateMap = createGateMap(rawGates);

function getOutput(node, values, operations) {
  const { gates, type } = operations.get(node);
  const [a, b] = gates;
  let aValue, bValue;
  if (values.has(a)) {
    aValue = values.get(a);
  } else {
    aValue = getOutput(a, values, operations);
  }
  if (values.has(b)) {
    bValue = values.get(b);
  } else {
    bValue = getOutput(b, values, operations);
  }
  if (type === 'AND') return aValue && bValue ? 1 : 0;
  if (type === 'OR') return aValue || bValue ? 1 : 0;
  if (type === 'XOR') return !(aValue && bValue) && (aValue || bValue) ? 1 : 0;
  throw new Error('unknown type', type);
}

function getPairingValues(rawPairings) {
  const values = new Map();

  for (const [k, v] of gateMap) {
    values.set(k, v);
  }

  const operations = new Map();

  for (const line of rawPairings) {
    const [a, type, b, _arrow, res] = line.split(' ');
    operations.set(res, { gates: [a, b], type });
  }

  for (const key of operations.keys()) {
    if (values.has(key)) continue;
    const output = getOutput(key, values, operations);
    values.set(key, output);
  }

  return values;
}

function partOne() {
  const zValues = [];
  const values = getPairingValues(rawPairings.split('\n'));

  for (const [key, value] of values) {
    if (key[0] === 'z') {
      const idx = parseInt(key.slice(1));
      zValues[idx] = value;
    }
  }

  return parseInt(zValues.reverse().join(''), 2);
}

console.log('The answer to Part One may be', partOne());
// not 8510417647883, too low

function partTwo() {}

console.log('The answer to Part Two may be', partTwo());
