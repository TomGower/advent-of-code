import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const [cardPublicKey, doorPublicKey] = readFileSync(__dirname + '/inputs/day25.input', 'utf8').split('\n').map(Number);

const factor = 20201227;
let cardLoopSize = 0;
let cardVal = 1;

const transform = (val, subjectNumber) => {
  const interim = val * subjectNumber;
  return interim % factor;
}

while (cardVal !== cardPublicKey) {
  cardVal = transform(cardVal, 7);
  cardLoopSize++;
}
console.log('card loop size', cardLoopSize);

let doorLoopSize = 0;
let doorVal = 1;
while (doorVal !== doorPublicKey) {
  doorVal = transform(doorVal, 7);
  doorLoopSize++;
}
console.log('door loop size', doorLoopSize);

let doorKey = 1;
for (let i = 0; i < doorLoopSize; i++) {
  doorKey = transform(doorKey, cardPublicKey);
}

let cardKey = 1;
for (let i = 0; i < cardLoopSize; i++) {
  cardKey = transform(cardKey, doorPublicKey);
}

if (doorKey === cardKey) {
  console.log('part one: encryption key', doorKey);
} else {
  throw new Error('encryption keys do not match');
}