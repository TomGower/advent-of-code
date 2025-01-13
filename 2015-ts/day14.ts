import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day14.input', 'utf8');

type ReindeerInfo = {
  name: string;
  flyingTime: number;
  flyingSpeed: number;
  restingTime: number;
};

function parseInput(input: string) {
  const rows = input.split('\n');
  const res: ReindeerInfo[] = [];
  for (const row of rows) {
    const words = row.split(' ');
    const name = words[0];
    const flyingSpeed = +words[3];
    const flyingTime = +words[6];
    const restingTime = +words[13];
    res.push({ name, flyingSpeed, flyingTime, restingTime });
  }
  return res;
}

const reindeer = parseInput(input);

function findFarthestReineer(reindeer: ReindeerInfo[], time: number): number {
  let maxDistance = 0;
  let winner = '';
  for (const { name, flyingSpeed, flyingTime, restingTime } of reindeer) {
    const loopDistance = flyingSpeed * flyingTime;
    const loopTime = flyingTime + restingTime;
    const loops = Math.floor(time / loopTime);
    const leftoverTime = time - loops * loopTime;
    const dist =
      loopDistance * loops + Math.min(flyingTime, leftoverTime) * flyingSpeed;
    if (dist > maxDistance) {
      maxDistance = dist;
      winner = name;
    }
  }
  return maxDistance;
}

function partOne() {
  return findFarthestReineer(reindeer, 2503);
}

console.log('The answer to Part One may be', partOne());

function partTwo() {}

console.log('The answer to Part Two may be', partTwo());
