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

function findFurthestReindeer(reindeer: ReindeerInfo[], time: number): number {
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
  return findFurthestReindeer(reindeer, 2503);
}

console.log('The answer to Part One may be', partOne());

function findLeaders(reindeer: ReindeerInfo[], time: number): number {
  const leaders: [string[], number][] = new Array(time + 1)
    .fill(0)
    .map((_) => [[], 0]);
  const scores: Record<string, number> = {};
  for (const { name, flyingSpeed, flyingTime, restingTime } of reindeer) {
    scores[name] = 0;
    let dist = 0;
    let i = 0;
    while (i <= time) {
      for (let j = 1; j <= flyingTime; j++) {
        if (i + j > time) break;
        dist += flyingSpeed;
        if (dist === leaders[i + j][1]) {
          leaders[i + j][0].push(name);
        } else if (dist > leaders[i + j][1]) {
          leaders[i + j] = [[name], dist];
        }
      }
      for (let j = 1; j <= restingTime; j++) {
        if (i + flyingTime + j > time) break;
        if (dist === leaders[i + flyingTime + j][1]) {
          leaders[i + flyingTime + j][0].push(name);
        } else if (dist > leaders[i + flyingTime + j][1]) {
          leaders[i + flyingTime + j] = [[name], dist];
        }
      }
      i += flyingTime + restingTime;
    }
  }
  for (const [deer, _dist] of leaders) {
    for (const d of deer) {
      scores[d]++;
    }
  }
  return Math.max(...Array.from(Object.values(scores)));
}

function partTwo() {
  return findLeaders(reindeer, 2503);
}

console.log('The answer to Part Two may be', partTwo());
