import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day13.input', 'utf8');
const dirsAndMachines = input.split('\n\n');

function getButtonsAndLocations(dirAndMachine) {
  const [a, b, prize] = dirAndMachine.split('\n');
  let [_namea, _tgta, ax, ay] = a.split(' ');
  let axVal = Number(ax.slice(1, -1));
  let ayVal = Number(ay.slice(1));
  let [_nameb, _tgtb, bx, by] = b.split(' ');
  let bxVal = Number(bx.slice(1, -1));
  let byVal = Number(by.slice(1));
  let [_namep, px, py] = prize.split(' ');
  let pxVal = Number(px.slice(2, -1));
  let pyVal = Number(py.slice(2));
  return [
    [axVal, ayVal],
    [bxVal, byVal],
    [pxVal, pyVal],
  ];
}

const allDirections = dirsAndMachines.map(getButtonsAndLocations);

function findCheapestPath(a, b, prize) {
  const [ax, ay] = a;
  const [bx, by] = b;
  const [px, py] = prize;
  function move(x, y, cost, moves) {
    if (moves > 100) return Infinity;
    if (x > px || y > py) return Infinity;
    if (x === px && y === py) return cost;
    return Math.min(
      move(x + ax, y + ay, cost + 3, moves + 1),
      move(x + bx, y + by, cost + 1, moves + 1)
    );
  }
  const res = move(0, 0, 0, 0);
  return res === Infinity ? 0 : res;
}

function findMathPath(a, b, prize) {
  const [ax, ay] = a;
  const [bx, by] = b;
  const [px, py] = prize;
  let res = Infinity;
  for (let i = 0; i <= 100; i++) {
    let x = i * ax,
      y = i * ay;
    if ((px - x) % bx === 0 && (px - x) / bx === (py - y) / by) {
      if ((px - x) / bx <= 100) {
        res = Math.min(res, 3 * i + (px - x) / bx);
      }
    }
  }
  return res === Infinity ? 0 : res;
}

function partOne() {
  let total = 0;
  for (const [a, b, prize] of allDirections) {
    total += findMathPath(a, b, prize);
  }
  return total;
}

console.log('The answer to Part One may be', partOne());

function partTwo() {}

console.log('The answer to Part Two may be', partTwo());
