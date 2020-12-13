const input = `1000495
19,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,521,x,x,x,x,x,x,x,23,x,x,x,x,x,x,x,x,17,x,x,x,x,x,x,x,x,x,x,x,29,x,523,x,x,x,x,x,37,x,x,x,x,x,x,13`;

const inputArray = input.split('\n');


const partOne = () => {
  const time = +inputArray[0];
  const busTimes = inputArray[1].split(',');
  let waitTimes = {};
  for (let i = 0; i < busTimes.length; i++) {
    if (busTimes[i] === 'x') continue;
    const busTime = +busTimes[i];
    const quotient = Math.floor(time / busTime);
    const diff = ((quotient + 1) * busTime - time) % busTime;
    waitTimes[busTime] = diff;
  }
  let min = Infinity;
  let minBus = null;
  for (let keys in waitTimes) {
    if (+waitTimes[keys] < min) {
      min = +waitTimes[keys];
      minBus = +keys;
    }
  }

  console.log('part one', min * minBus);
}

partOne();

const partTwo = () => {
  const departTimes = {};
  const busTimes = inputArray[1].split(',');
  for (let i = 0; i < busTimes.length; i++) {
    if (busTimes[i] === 'x') continue;
    const busTime = +busTimes[i];
    departTimes[i] = busTime;
  }
  console.log(departTimes);
  // full result of departTimes
  /*
  {
    '0': 19,
    '9': 41,
    '19': 521,
    '27': 23,
    '36': 17,
    '48': 29,
    '50': 523,
    '56': 37,
    '63': 13
  }
  */

  // this helper function and the while loops were written based on the result of departTimes
  // the initial value of the counter was obtained by this helper function
  // the 135 initial factor was determined by resolving X % 19 === 0 && X + 50 % 523 === 0
  const getInitialValue = () => {
    for (let i = 0; i < 10000; i++) {
      let product = 19 * i;
      if ((product + 50) % 523 === 0) return (product / 19);
    }
    throw new Error('did not find a valid initial value');
  }
  const init = getInitialValue();

  const helper = () => {
    for (let i = 0; i < 10000; i++) {
      let product = (init + 523 * i) * 19;
      if ((product + 19) % 521 === 0) return (product / 19);
    }
    throw new Error('did not find a valid return value');
  }

  let counter = helper();;
  while (true) {
    const product = counter * 19;
    if (product % 19 === 0) {
      if ((product + 19) % 521 === 0) {
        if ((product + 9) % 41 === 0) {
          if ((product + 56) % 37 === 0) {
            if ((product + 48) % 29 === 0) {
              if ((product + 27) % 23 === 0) {
                if (product % 19 === 0) {
                  if ((product + 36) % 17 === 0) {
                    if ((product + 63) % 13 === 0) {
                      break;
                    }
                  }
                }
              }
            }
          }
        }
      }
    } else {
      throw new Error('this should not be possible');
    }
    counter += 521*523;
  }

  console.log('part two', counter * 19);
}

partTwo();