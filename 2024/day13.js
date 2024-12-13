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
  for (let i = 0; i <= Math.min(px / ax, py / ay); i++) {
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

const diff = 10000000000000;
const updatePrizeLocations = allDirections.map(([a, b, prize]) => [
  a,
  b,
  [prize[0] + diff, prize[1] + diff],
]);

function findAlgebraPath(a, b, prize) {
  const [ax, ay] = a;
  const [bx, by] = b;
  const [px, py] = prize;
  const aMoves = Math.round((px * by - py * bx) / (ax * by - ay * bx));
  const bMoves = Math.round((ax * py - ay * px) / (ax * by - ay * bx));
  if (ax * aMoves + bx * bMoves === px && ay * aMoves + by * bMoves === py) {
    return aMoves * 3 + bMoves;
  }
  return 0;
}

function partTwo() {
  let total = 0;
  for (const [a, b, prize] of updatePrizeLocations) {
    total += findAlgebraPath(a, b, prize);
  }
  return total;
}

console.log('The answer to Part Two may be', partTwo());
