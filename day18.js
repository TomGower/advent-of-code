import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const operations = readFileSync(__dirname + '/inputs/day18.input', 'utf8').split('\n');

const partOne = () => {
    const evaluate = str => {
        let stack = [];
        for (let i = 0; i < str.length; i++) {
        if (str[i] === ' ') continue;
        else if (str[i] === '(') {
            let opens = 1;
            let index = i + 1;
            while (opens > 0) {
            if (str[index] === '(') opens++;
            else if (str[index] === ')') opens--;
            index++;
            }
            const val = evaluate(str.substring(i + 1, index - 1));
            stack.push(val);
            i = index;
        }
        else stack.push(str[i]);
        }
        console.log(stack);
        let res = eval(`${stack[0]}${stack[1]}${stack[2]}`);
        for (let i = 3; i < stack.length; i = i + 2) {
        res = eval(`${res}${stack[i]}${stack[i+1]}`);
        }
        return res;
    }

    let total = 0;
    for (const operation of operations) {
        total += evaluate(operation);
    }

    console.log('part one', total); // 3159145843816
}

partOne();