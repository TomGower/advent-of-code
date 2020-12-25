const cardPublicKey = 5764801;
const doorPublicKey = 17807724;

const subjectNumber = 7;
const factor = 20201227;
let cardLoopSize = 0;
let cardVal = 1;

const transform = val => {
  const interim = val * subjectNumber;
  return interim % factor;
}

while (cardVal !== cardPublicKey) {
  cardVal = transform(cardVal);
  cardLoopSize++;
}
console.log('card loop size', cardLoopSize);

let doorLoopSize = 0;
let doorVal = 1;
while (doorVal !== doorPublicKey) {
  doorVal = transform(doorVal);
  doorLoopSize++;
}
console.log('door loop size', doorLoopSize);

let doorKey = cardPublicKey;
for (let i = 0; i < doorLoopSize; i++) {
  doorKey = transform(doorKey);
}
console.log('door encryption key', doorKey);

let cardKey = doorPublicKey;
for (let i = 0; i < cardLoopSize; i++) {
  cardKey = transform(cardKey);
}
console.log('card encryption key', cardKey);

// not 19131925
// not 14203396
// is 16902792