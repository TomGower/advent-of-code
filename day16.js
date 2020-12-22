import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const inputs = readFileSync(__dirname + '/inputs/day16.input', 'utf8').split('\n\n');

const inputFields = inputs[0].split('\n');
const myTicket = inputs[1].split('\n').slice(1).join('').split(',').map(num => +num);
const otherTickets = inputs[2].split('\n').slice(1).map(ticket => ticket.split(',').map(num => +num));

const fieldValues = [];
for (const field of inputFields) {
  const fieldNums = field.match(/\d+/g);
  fieldValues.push([fieldNums[0], fieldNums[1]], [fieldNums[2], fieldNums[3]]);
}

const validValues = new Set();
for (const values of fieldValues) {
  for (let i = values[0]; i <= values[1]; i++) {
    validValues.add(i);
  }
}

const partOne = () => {
  let sum = 0;
  for (const otherTicket of otherTickets) {
    for (const val of otherTicket) {
      if (!validValues.has(val)) sum += val;
    }
  }

  console.log('part one', sum); // 25059
}

partOne();

const partTwo = () => {
  const isValidTicket = ticket => {
    return ticket.every(num => validValues.has(+num));
  }

  const validTickets = otherTickets.filter(isValidTicket);

  const fields = {};
  for (const field of inputFields) {
    const fieldName = field.split(':')[0];
    const fieldNums = field.match(/\d+/g).map(num => +num);
    const fieldSet = new Set();
    for (let i = fieldNums[0]; i <= fieldNums[1]; i++) {
      fieldSet.add(i);
    }
    for (let j = fieldNums[2]; j <= fieldNums[3]; j++) {
      fieldSet.add(j);
    }
    fields[fieldName] = fieldSet;
  };

  let validFields = {};
  for (let keys in fields) {
    for (let i = 0; i < validTickets[0].length; i++) {
      let isValid = true;
      for (let j = 0; j < validTickets.length; j++) {
        if (!fields[keys].has(+validTickets[j][i])) {
          isValid = false;
          break;
        }
      }
      if (isValid) {
        validFields[keys] ? validFields[keys].add(i) : validFields[keys] = new Set([i]);
      }
    }
  }

  const fieldIndices = {};
  while (Object.keys(fieldIndices).length < Object.keys(fields).length) {
    for (let keys in validFields) {
      if (validFields[keys].size === 1) {
        const val = [...validFields[keys]][0];
        fieldIndices[keys] = val;
        for (let otherKeys in validFields) {
          if (keys === otherKeys) continue;
          if (validFields[otherKeys].has(val)) validFields[otherKeys].delete(val);
        }
        delete validFields[keys];
      }
    }
  }

  let product = 1;
  for (const fields in fieldIndices) {
    if (fields.split(' ')[0] === 'departure') {
      product *= myTicket[fieldIndices[fields]];
    }
  }

  console.log('part two', product); // 3253972369789
}

partTwo();