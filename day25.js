import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const [cardPublicKey, doorPublicKey] = readFileSync(__dirname + '/inputs/day25.input', 'utf8').split('\n').map(Number);

const factor = 20201227;
const initialSubjectNumber = 7;
const transform = (val, subjectNumber) => {
  return (val * subjectNumber) % factor;
}

let cardLoopSize = 0;
let cardVal = 1;
while (cardVal !== cardPublicKey) {
  cardVal = transform(cardVal, initialSubjectNumber);
  cardLoopSize++;
}
console.log('card loop size', cardLoopSize);

let doorLoopSize = 0;
let doorVal = 1;
while (doorVal !== doorPublicKey) {
  doorVal = transform(doorVal, initialSubjectNumber);
  doorLoopSize++;
}
console.log('door loop size', doorLoopSize);

let cardKey = 1;
for (let i = 0; i < cardLoopSize; i++) {
  cardKey = transform(cardKey, doorPublicKey);
}

let doorKey = 1;
for (let i = 0; i < doorLoopSize; i++) {
  doorKey = transform(doorKey, cardPublicKey);
}

if (cardKey === doorKey) {
  console.log('part one: encryption key', cardKey);
} else {
  throw new Error('encryption keys do not match');
}