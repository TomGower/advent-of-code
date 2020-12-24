const input = `sesenwnenenewseeswwswswwnenewsewsw
neeenesenwnwwswnenewnwwsewnenwseswesw
seswneswswsenwwnwse
nwnwneseeswswnenewneswwnewseswneseene
swweswneswnenwsewnwneneseenw
eesenwseswswnenwswnwnwsewwnwsene
sewnenenenesenwsewnenwwwse
wenwwweseeeweswwwnwwe
wsweesenenewnwwnwsenewsenwwsesesenwne
neeswseenwwswnwswswnw
nenwswwsewswnenenewsenwsenwnesesenew
enewnwewneswsewnwswenweswnenwsenwsw
sweneswneswneneenwnewenewwneswswnese
swwesenesewenwneswnwwneseswwne
enesenwswwswneneswsenwnewswseenwsese
wnwnesenesenenwwnenwsewesewsesesew
nenewswnwewswnenesenwnesewesw
eneswnwswnwsenenwnwnwwseeswneewsenese
neswnwewnwnwseenwseesewsenwsweewe
wseweeenwnesenwwwswnew`;

const inputArray = input.split('\n');

const parseSteps = str => {
  let res = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === 'n' || str[i] === 's') {
      res.push(str.substring(i, i+2));
      i++;
    } else {
      res.push(str[i]);
    }
  }
  return res;
}

const moves = inputArray.map(parseSteps);

let destinations = new Set();
for (const move of moves) {
  console.log(move);
  let x = 0;
  let y = 0;
  for (const step of move) {
    if (step === 'e') x += 2;
    else if (step === 'w') x -= 2;
    else if (step === 'nw') {
      x -= 1;
      y -= 1;
    }
    else if (step === 'se') {
      x += 1;
      y += 1;
    }
    else if (step === 'ne') {
      x += 1;
      y -= 1;
    }
    else if (step === 'sw') {
      x -= 1;
      y += 1;
    }
    else {
      throw new Error('this should be impossible');
    }
  }
  const key = `${x}|${y}`;
  console.log(key);
  if (destinations.has(key)) {
    // console.log('found duplicate', key);
    destinations.delete(key);
  }
  else (destinations.add(key));
}

// console.log(destinations);
console.log('part one', destinations.size);
// not 384
// not 210
