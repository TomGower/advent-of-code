import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const inputArray = readFileSync(__dirname + '/inputs/day19.input', 'utf8').split('\n\n');

const rules = inputArray[0].split('\n');
const messages = inputArray[1].split('\n');

const partOne = () => {
  const ruleset = {};
  for (const rule of rules) {
    const [key, value] = rule.split(': ');
    ruleset[key] = value;
  }

  let iterations = 1;
  while (iterations > 0) {
    iterations = 0;
    for (const keys in ruleset) {
      let keyRefs = ruleset[keys].split(' ');
      for (let i = 0; i < keyRefs.length; i++) {
        if (keyRefs[i] === '|' || keyRefs[i] === '(' || keyRefs[i] === ')' || keyRefs[i][0] === '"') continue;
        iterations++;
        keyRefs[i] = `( ${ruleset[keyRefs[i]]} )`;
      }
      ruleset[keys] = keyRefs.join(' ');
    }
  }

  for (const keys in ruleset) {
    const regexA = /\( "a" \)/gi;
    const regexB = /\( "b" \)/gi;
    const regexQuote = /"/g;
    let curr = ruleset[keys];
    curr = curr.replace(regexA, 'a');
    curr = curr.replace(regexB, 'b');
    curr = curr.replace(regexQuote, '');
    curr = curr.replace(/\s/g, '');
    ruleset[keys] = curr;
  }

  const testExp = RegExp(`^${ruleset[0]}$`);
  let total = 0;
  for (const message of messages) {
    if (testExp.test(message)) total++;
  }
  console.log('part one', total); // 136
}

partOne();

const partTwo = () => {
  const ruleset = {};
  for (const rule of rules) {
    const [key, value] = rule.split(': ');
    ruleset[key] = value;
  }
  
  ruleset[8] = '42 | 42 908';
  ruleset[11] = '42 31 | 42 9011 31';
  // cheesed solution based on https://www.reddit.com/r/adventofcode/comments/kg5yys/2020_day_19_part_2_change_in_code/
  ruleset[908] = '42 | 42 918';
  ruleset[918] = '42 | 42 928';
  ruleset[928] = '42 | 42 938';
  ruleset[938] = '42 | 42 948';
  ruleset[948] = '42 | 42 958';
  ruleset[958] = '42 | 42 968';
  ruleset[968] = '42 | 42 978';
  ruleset[978] = '42 | 42 988';
  ruleset[988] = '42 | 42 998';
  ruleset[998] = '42';
  ruleset[9011] = '42 31 | 42 9111 31';
  ruleset[9111] = '42 31 | 42 9211 31';
  ruleset[9211] = '42 31 | 42 9311 31';
  ruleset[9311] = '42 31 | 42 9411 31';
  ruleset[9411] = '42 31 | 42 9511 31';
  ruleset[9511] = '42 31 | 42 9611 31';
  ruleset[9611] = '42 31 | 42 9711 31';
  ruleset[9711] = '42 31 | 42 9811 31';
  ruleset[9811] = '42 31 | 42 9911 31';
  ruleset[9911] = '42 31 | 42 10011 31';
  ruleset[10011] = '42 31'

  let iterations = 1;
  let loops = 0;
  while (iterations > 0) {
    iterations = 0;
    for (const keys in ruleset) {
      let keyRefs = ruleset[keys].split(' ');
      for (let i = 0; i < keyRefs.length; i++) {
        if (keyRefs[i] === '|' || keyRefs[i] === '(' || keyRefs[i] === ')' || keyRefs[i][0] === '"') continue;
        iterations++;
        keyRefs[i] = `( ${ruleset[keyRefs[i]]} )`;
      }
      ruleset[keys] = keyRefs.join(' ');
    }
    loops++;
    if (loops > 5) break;
  }

  console.log('loops', loops);

  for (const keys in ruleset) {
    const regexA = /\( "a" \)/gi;
    const regexB = /\( "b" \)/gi;
    const regexQuote = /"/g;
    let curr = ruleset[keys];
    curr = curr.replace(regexA, 'a');
    curr = curr.replace(regexB, 'b');
    curr = curr.replace(regexQuote, '');
    curr = curr.replace(/\s/g, '');
    ruleset[keys] = curr;
  }

  const testExp = RegExp(`^${ruleset[0]}$`);
  let total = 0;
  for (const message of messages) {
    if (testExp.test(message)) total++;
  }
  console.log('part two', total); // 256
}

partTwo();
