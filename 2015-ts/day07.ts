import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day07.input', 'utf8');
const rows = input.split('\n');

const values = new Map<string, number>();

function createGraph(edges: string[]): Map<string, string> {
  const graph = new Map<string, string>();
  for (const edge of edges) {
    const [instructions, target] = edge.split(' -> ');
    graph.set(target, instructions);
    if ('' + Number(instructions) === instructions) {
      values.set(target, Number(instructions));
    }
  }
  return graph;
}

const graph = createGraph(rows);

function dfs(node: string): number {
  if (values.has(node)) return values.get(node)!;
  if ('' + Number(node) === node) return Number(node);
  const instruction = graph.get(node)!;
  if ('' + Number(instruction) === instruction) return Number(instruction);
  const dirs = instruction.split(' ');
  let value: number;
  if (dirs.length === 1) {
    value = dfs(dirs[0]);
  } else if (dirs[0] === 'NOT') {
    const nodeValue = dfs(dirs[1]);
    value = 65535 - nodeValue;
  } else {
    const [a, order, b] = dirs;
    let aValue = dfs(a);
    const bValue = dfs(b);
    if (order === 'OR') {
      value = aValue | bValue;
    } else if (order === 'AND') {
      value = aValue & bValue;
    } else if (order === 'RSHIFT') {
      value = aValue >>= bValue;
    } else if (order === 'LSHIFT') {
      value = aValue <<= bValue;
    }
  }
  value = value! & 0xffff;
  values.set(node, value);
  return value;
}

function partOne() {
  return dfs('a');
}

console.log('The answer to Part One may be', partOne());

function partTwo() {}

console.log('The answer to Part Two may be', partTwo());
