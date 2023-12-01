import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
// manual find & replace on input, bag => bags & then bagss => bags
const inputArray = readFileSync(__dirname + '/inputs/day07.input', 'utf8').split('\n');

const splitter = str => {
  const arr = str.slice(0, -1).split('contain ')
  const key = arr[0].trimEnd();
  const inputs = arr[1].split(', ');
  return [key, inputs];
}

const partOne = () => {
  const outerBags = new Set();
  const bags = {};

  const addToSet = arr => {
    const outside = arr[0];
    const inside = arr[1];
    inside.forEach(inner => {
      const type = inner.slice(2);
      bags[type] ? bags[type].add(outside) : bags[type] = new Set([outside]);
    });
  }

  inputArray.forEach(item => {
    addToSet(splitter(item));
  });

  const traverse = bagName => {
    if (!outerBags.has(bagName)) queue.push(bagName);
    outerBags.add(bagName);
  }

  let queue = ['shiny gold bags'];

  while (queue.length > 0) {
    const item = queue.shift();
    const next = bags[item];
    if (!next) continue;
    next.forEach(traverse);
  }

  console.log('part one', outerBags.size); // 348
}

partOne();

const partTwo = () => {
  const bags = {};

  inputArray.forEach(item => {
    const output = splitter(item);
    const outside = output[0];
    bags[outside] = {};
    const inside = output[1];
    inside.forEach(inner => {
      const qty = +inner.slice(0, 2);
      const type = inner.slice(2);
      bags[outside][type] = qty;
    })
  });

  function countBags(type) {
    let subtotal = 0;
    for (let keys in bags[type]) {
      if (!bags[type][keys]) return 1;
      subtotal += bags[type][keys] * countBags(keys);
    }
    return 1 + subtotal;
  }
  
  const total = countBags('shiny gold bags') - 1;

  console.log('part two', total); // 18885
}

partTwo();