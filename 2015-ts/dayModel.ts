import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const input = readFileSync(__dirname + '/inputs/day22.input', 'utf8');

function partOne() {}

console.time('one');
console.log('The answer to Part One may be', partOne());
console.timeEnd('one');

function partTwo() {}

console.time('two');
console.log('The answer to Part Two may be', partTwo());
console.timeEnd('two'); 
