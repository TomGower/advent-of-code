import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const orders = readFileSync(__dirname + '/inputs/day12.input', 'utf8').split('\n').map(i => [i[0], +i.slice(1)]);

const partOne = () => {
  const pos = [0, 0];
  const directions = ['E', 'S', 'W', 'N'];
  let directionIndex = 0;

  const move = (dir, mag) => {
    if (dir === 'N') pos[1] -= mag;
    else if (dir === 'S') pos[1] += mag;
    else if (dir === 'W') pos[0] -= mag;
    else if (dir === 'E') pos[0] += mag;
    else throw new Error('invalid direction, this should not be possible', dir);
  }

  for (const order of orders) {
    const [direction, magnitude] = order;
    if (direction === 'L') {
      directionIndex = (directionIndex - magnitude/90) % directions.length;
      while (directionIndex < 0) directionIndex += directions.length;
    } else if (direction === 'R') {
      directionIndex = (directionIndex + magnitude/90) % directions.length;
    } else if (direction === 'F') move(directions[directionIndex], magnitude);
    else move(direction, magnitude);
  };

  const res = pos.reduce((acc, curr) => acc + Math.abs(curr), 0);
  console.log('part one', res); // 582
}

partOne();

const partTwo = () => {
  const pos = [0, 0];
  let waypoint = [10, -1];

  const move = (dir, mag) => {
    if (dir === 'F') {
      pos[0] += mag * waypoint[0];
      pos[1] += mag * waypoint[1];
    } else if (dir === 'N') {
      waypoint[1] -= mag;
    } else if (dir === 'S') {
      waypoint[1] += mag;
    } else if (dir === 'W') {
      waypoint[0] -= mag;
    } else if (dir === 'E') {
      waypoint[0] += mag;
    } else {
      throw new Error('invalid direction, this should not be possible', dir);
    }
  }

  const changeDirection = (dir, mag) => {
    if (dir === 'L') mag = (4 - mag) % 4;
    while (mag < 0) mag += 4;
    while (mag > 0) {
      waypoint = [-waypoint[1], waypoint[0]];
      mag--;
    }
  }

  for (const order of orders) {
    const [direction, magnitude] = order;
    if (direction === 'L' || direction === 'R') changeDirection(direction, magnitude / 90);
    else move(direction, magnitude);    
  };

  const res = pos.reduce((acc, curr) => acc + Math.abs(curr), 0); 
  console.log('part two', res); // 52069
}

partTwo();