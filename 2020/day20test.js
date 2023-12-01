const input = `Tile 2311:
..##.#..#.
##..#.....
#...##..#.
####.#...#
##.##.###.
##...#.###
.#.#.#..##
..#....#..
###...#.#.
..###..###

Tile 1951:
#.##...##.
#.####...#
.....#..##
#...######
.##.#....#
.###.#####
###.##.##.
.###....#.
..#.#..#.#
#...##.#..

Tile 1171:
####...##.
#..##.#..#
##.#..#.#.
.###.####.
..###.####
.##....##.
.#...####.
#.##.####.
####..#...
.....##...

Tile 1427:
###.##.#..
.#..#.##..
.#.##.#..#
#.#.#.##.#
....#...##
...##..##.
...#.#####
.#.####.#.
..#..###.#
..##.#..#.

Tile 1489:
##.#.#....
..##...#..
.##..##...
..#...#...
#####...#.
#..#.#.#.#
...#.#.#..
##.#...##.
..##.##.##
###.##.#..

Tile 2473:
#....####.
#..#.##...
#.##..#...
######.#.#
.#...#.#.#
.#########
.###.#..#.
########.#
##...##.#.
..###.#.#.

Tile 2971:
..#.#....#
#...###...
#.#.###...
##.##..#..
.#####..##
.#..####.#
#..#.#..#.
..####.###
..#.#.###.
...#.#.#.#

Tile 2729:
...#.#.#.#
####.#....
..#.#.....
....#..#.#
.##..##.#.
.#.####...
####.#.#..
##.####...
##..#.##..
#.##...##.

Tile 3079:
#.#.#####.
.#..######
..#.......
######....
####.#..#.
.#...#.##.
#.#####.##
..#.###...
..#.......
..#.###...`;

const inputArray = input.split('\n\n');
const tiles = {};
inputArray.forEach(info => {
  let tile = info.split('\n');
  let id = tile[0].match(/\d+/)[0];
  tile.splice(0, 1);
  console.log(id, tile);
  tiles[id] = tile;
});

// console.log(tiles);

const matches = {};

for (let keys in tiles) {
  let match = {};
  let topRow = tiles[keys][0];
  let bottomRow = tiles[keys][tiles[keys].length-1];
  let leftCol = '';
  let rightCol = '';
  for (let rows of tiles[keys]) {
    leftCol += rows[0];
    rightCol += rows[rows.length-1];
  }
  for (let otherKeys in tiles) {
    if (keys === otherKeys) continue;
    let otherTop = tiles[otherKeys][0];
    let otherBottom = tiles[otherKeys][tiles[otherKeys].length-1];
    let otherLeft = '';
    let otherRight = '';
    for (let rows of tiles[otherKeys]) {
      otherLeft += rows[0];
      otherRight += rows[rows.length-1];
    }
    let otherBorders = [
      otherTop, otherTop.split('').reverse().join(''),
      otherBottom, otherBottom.split('').reverse().join(''),
      otherLeft, otherLeft.split('').reverse().join(''),
      otherRight, otherRight.split('').reverse().join('')
    ];
    if (otherBorders.includes(topRow) || otherBorders.includes(bottomRow.split('').reverse().join(''))) match.top ? match.top.push(otherKeys) : match.top = [otherKeys];
    if (otherBorders.includes(bottomRow) || otherBorders.includes(topRow.split('').reverse().join(''))) match.bottom ? match.bottom.push(otherKeys) : match.bottom = [otherKeys];
    if (otherBorders.includes(leftCol) || otherBorders.includes(rightCol.split('').reverse().join(''))) match.left ? match.left.push(otherKeys) : match.left = [otherKeys];
    if (otherBorders.includes(rightCol) || otherBorders.includes(leftCol.split('').reverse().join(''))) match.right ? match.right.push(otherKeys) : match.right = [otherKeys];
  }
  matches[keys] = match;
}
console.log(matches);

for (const keys in matches) {
  let counter = new Set();
  let match = matches[keys];
  for (const key in match) {
    match[key].forEach(item => counter.add(item));
  }
  if (counter.size === 2) console.log('2 matches', keys);
}
