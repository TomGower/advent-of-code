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

function replaceOne(
  element: string,
  graph: Map<string, string[]>
): Set<string> {
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
  return seen;
}

function partOne() {
  return replaceOne(startElement, graph).size;
}

console.log('The answer to Part One may be', partOne());

function reverseReduction(
  target: string,
  replacements: Map<string, string[]>
): number {
  // Convert replacements into a reverse mapping
  const reverseReplacements: [string, string][] = [];
  for (const [from, toList] of replacements.entries()) {
    for (const to of toList) {
      reverseReplacements.push([to, from]);
    }
  }

  // Sort reverse replacements by length of the replacement molecule (longer first)
  reverseReplacements.sort((a, b) => b[0].length - a[0].length);

  let steps = 0;
  while (target !== 'e') {
    let replaced = false;

    for (const [to, from] of reverseReplacements) {
      const index = target.indexOf(to);
      if (index !== -1) {
        // Replace the substring
        target =
          target.slice(0, index) + from + target.slice(index + to.length);
        steps++;
        replaced = true;
        break;
      }
    }

    if (!replaced) {
      throw new Error('No valid replacement found! Check the input.');
    }
  }

  return steps;
}

// this takes forever and a day, so isn't a workable or intended solution
function bfsReverseReduction(
  target: string,
  replacements: Map<string, string[]>
): number {
  // Convert replacements into a reverse mapping
  const reverseReplacements: [string, string][] = [];
  for (const [from, toList] of replacements.entries()) {
    for (const to of toList) {
      reverseReplacements.push([to, from]);
    }
  }

  // BFS setup
  const queue: [string, number][] = [[target, 0]]; // [current molecule, steps]
  const seen = new Set<string>([target]);

  while (queue.length > 0) {
    const [current, steps] = queue.shift()!;

    if (current === 'e') {
      return steps; // Found the solution
    }

    for (const [to, from] of reverseReplacements) {
      let index = current.indexOf(to);
      while (index !== -1) {
        // Generate new molecule by replacing the substring
        const newMolecule =
          current.slice(0, index) + from + current.slice(index + to.length);

        if (!seen.has(newMolecule)) {
          queue.push([newMolecule, steps + 1]);
          seen.add(newMolecule);
        }

        // Look for the next occurrence of `to`
        index = current.indexOf(to, index + 1);
      }
    }
  }

  throw new Error('No valid sequence found to reduce to "e".');
}

function partTwo() {
  // I let this go for a while, and it died
  // let steps = 0;
  // const queue = ['e'];
  // const seen = new Set();
  // while (queue.length > 0) {
  //   steps++;
  //   const len = queue.length;
  //   for (let i = 0; i < len; i++) {
  //     const nextDrugs = replaceOne(queue.shift()!, graph);
  //     for (const drug of nextDrugs) {
  //       if (drug === startElement) return steps;
  //       if (seen.has(drug)) continue;
  //       seen.add(drug);
  //       queue.push(drug);
  //     }
  //   }
  // }

  // this shouldn't work and isn't a deterministic solution, but it works for my input
  return reverseReduction(startElement, graph);

  // I let this go for a while, and it died
  // return bfsReverseReduction(startElement, graph);
}

console.log('The answer to Part Two may be', partTwo());
