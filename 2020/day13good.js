import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const inputArray = readFileSync(__dirname + '/inputs/day13.input', 'utf8').split('\n');

const busTimes = inputArray[1].split(',');

const partOneOptimized = () => {
  const time = +inputArray[0];
  const busTimes = inputArray[1].split(',');
  let minDiff = Infinity;
  let minBus = null;
  busTimes.forEach(bus => {
    if (bus !== 'x') {
      let diff = bus - (time % bus);
      if (diff < minDiff) {
        minDiff = diff;
        minBus = bus;
      }
    }
  });

  console.log('part one optimized', minDiff * minBus);
}

partOneOptimized();

const partTwoGood = () => { //stolen from D-T-P

  function makeBusPositions(busArray) {
    const busPositions = {};
  
    busArray.forEach((bus, index) => {
      if (bus !== 'x') busPositions[bus] = index;
    });
  
    return busPositions;
  }
  
  function earliestParade(busPositions) {
    let timeStart = 0;
    let timeIncrement = 1;
  
    const descendingBusPairs = Object.entries(busPositions).map(([bus, gap]) => [Number(bus), Number(gap)]).sort(([bus1, ], [bus2, ]) => (bus2 - bus1));
  
    for (const [bus, gap] of descendingBusPairs) {
      let time = timeStart;
  
      while(true) {
        if ((bus - (time % bus)) % bus === gap % bus) {
          timeStart = time;
          timeIncrement *= bus;
          break;
        }
        time += timeIncrement;
      }
    }
  
    return timeStart;
  }
  
  console.log('part two', earliestParade(makeBusPositions(busTimes)));
}

partTwoGood();