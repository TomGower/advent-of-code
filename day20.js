import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const inputArray = readFileSync(__dirname + '/inputs/day20.input', 'utf8').split('\n\n');

const tiles = {};
for (const input of inputArray) {
  let tile = input.split('\n');
  const key = tile[0].match(/\d+/)[0];
  tile.splice(0, 1);
  if (tile.length !== 10 || tile[0].length !== 10) throw new Error('different size input');
  tiles[key] = tile;
}

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
    if (otherBorders.includes(topRow) || otherBorders.includes(topRow.split('').reverse().join(''))) match.top ? match.top.push(otherKeys) : match.top = [otherKeys];
    if (otherBorders.includes(bottomRow) || otherBorders.includes(bottomRow.split('').reverse().join(''))) match.bottom ? match.bottom.push(otherKeys) : match.bottom = [otherKeys];
    if (otherBorders.includes(leftCol) || otherBorders.includes(leftCol.split('').reverse().join(''))) match.left ? match.left.push(otherKeys) : match.left = [otherKeys];
    if (otherBorders.includes(rightCol) || otherBorders.includes(rightCol.split('').reverse().join(''))) match.right ? match.right.push(otherKeys) : match.right = [otherKeys];
  }
  matches[keys] = match;
}
// console.log(matches);
const borders = {};
const image = new Array(12).fill().map(() => new Array(12));

let product = 1;
for (const keys in matches) {
  let holder = new Set();
  let match = matches[keys];
  for (const key in match) {
    match[key].forEach(item => holder.add(item));
  }
  borders[keys] = holder;
  if (holder.size <= 2) {
    product *= +keys;
    if (image[0][0] === undefined) image[0][0] = keys;
  }
}

console.log('part one', product); // is 18482479935793

//build the image
const borderMatch = (key2, val) => borders[key2].has(val);
const used = new Set();
used.add(image[0][0]);

// console.log(borders[image[0][0]]);
let position = 0;
for (const item of borders[image[0][0]]) {
  if (position === 0) {
    image[0][1] = item;
    position++;
  } else {
    image[1][0] = item;
  }
  used.add(item);
}

//build the top row
const buildTopRow = () => {
  for (let i = 2; i < image.length; i++) {
    for (const item of borders[image[0][i-1]]) {
      if (used.has(item)) continue;
      if (borders[item].size === 3) {
        image[0][i] = item;
        used.add(item);
      } else if (borders[item].size === 2) {
        image[0][i] = item;
        used.add(item);
      }
    }
  }
}

//build the left column
const buildLeftColumn = () => {
  for (let i = 2; i < image.length; i++) {
    for (const item of borders[image[i-1][0]]) {
      if (used.has(item)) continue;
      if (borders[item].size === 3) {
        image[i][0] = item;
        used.add(item);
      } else if (borders[item].size === 2) {
        image[i][0] = item;
        used.add(item);
      }
    }
  }
}
buildTopRow();
buildLeftColumn();

const buildImage = () => {
  for (let i = 1; i < image.length; i++) {
    for (let j = 1; j < image[0].length; j++) {
      const left = image[i-1][j];
      const top = image[i][j-1];
      for (const item of borders[left]) {
        if (used.has(item)) continue;
        if (borderMatch(top, item)) {
          image[i][j] = item;
          used.add(item);
          break;
        }
      }
    }
  }
}
buildImage();

console.table(image);