import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const inputArray = readFileSync(__dirname + '/inputs/day24.input', 'utf8').split('');

