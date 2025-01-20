import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day19.input', 'utf8');
const [changes, startElement] = input.split('\n\n');

function buildGraph(changes: string): Map<string, string[]> {
  const map: Map<string, string[]> = new Map();
  const lines = changes.split('\n');
  for (const line of lines) {
    const [a, b] = line.split(' => ');
    if (!map.has(a)) map.set(a, []);
    map.get(a)!.push(b);
  }
  return map;
}

const graph = buildGraph(changes);

function replaceOne(element: string, graph: Map<string, string[]>): number {
  const seen: Set<string> = new Set();
  for (let i = 0; i < element.length; i++) {
    if (graph.has(element[i])) {
      const next = graph.get(element[i])!;
      for (const nei of next) {
        const newDrug =
          element.substring(0, i) + nei + element.substring(i + 1);
        seen.add(newDrug);
      }
    }
    if (graph.has(element.slice(i, i + 2))) {
      const next = graph.get(element.substring(i, i + 2))!;
      for (const nei of next) {
        const newDrug =
          element.substring(0, i) + nei + element.substring(i + 2);
        seen.add(newDrug);
      }
    }
  }
  return seen.size;
}

function partOne() {
  return replaceOne(startElement, graph);
}

console.log('The answer to Part One may be', partOne());

function partTwo() {}

console.log('The answer to Part Two may be', partTwo());
