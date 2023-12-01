const startingNums = [1,0,15,2,10,13];

const playGame = (turns, part) => {
  const spoken = new Map();

  let prev = null;
  let last = null;
  let currentTurn = 1;
  while (currentTurn <= turns) {
    if (currentTurn <= startingNums.length) {
      prev = startingNums[currentTurn - 1];
      last = spoken.get(prev);
      last ? last = [last[last.length - 1], currentTurn] : last = [currentTurn];
      spoken.set(prev, last);
    } else {
      last = spoken.get(prev);
      if (last.length < 2) {
        prev = 0;
      } else {
        prev = last[last.length - 1] - last[last.length - 2];
      }
      let prevIndex = spoken.get(prev);
      prevIndex ? prevIndex = [prevIndex[prevIndex.length - 1], currentTurn] : prevIndex = [currentTurn];
      spoken.set(prev, prevIndex);
    }
    currentTurn++;
  }

  console.log('part', part, prev);
}

playGame(2020, 'one'); // 211

playGame(30000000, 'two'); // 2159626
