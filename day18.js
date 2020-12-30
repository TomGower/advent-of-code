import { readFileSync } from 'fs';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
const operations = readFileSync(__dirname + '/inputs/day18.input', 'utf8').split('\n');

/*
--- Day 18: Operation Order ---
As you look out the window and notice a heavily-forested continent slowly appear over the horizon, you are interrupted by the child sitting next to you. They're curious if you could help them with their math homework.

Unfortunately, it seems like this "math" follows different rules than you remember.

The homework (your puzzle input) consists of a series of expressions that consist of addition (+), multiplication (*), and parentheses ((...)). Just like normal math, parentheses indicate that the expression inside must be evaluated before it can be used by the surrounding expression. Addition still finds the sum of the numbers on both sides of the operator, and multiplication still finds the product.

However, the rules of operator precedence have changed. Rather than evaluating multiplication before addition, the operators have the same precedence, and are evaluated left-to-right regardless of the order in which they appear.

For example, the steps to evaluate the expression 1 + 2 * 3 + 4 * 5 + 6 are as follows:

1 + 2 * 3 + 4 * 5 + 6
  3   * 3 + 4 * 5 + 6
      9   + 4 * 5 + 6
         13   * 5 + 6
             65   + 6
                 71
Parentheses can override this order; for example, here is what happens if parentheses are added to form 1 + (2 * 3) + (4 * (5 + 6)):

1 + (2 * 3) + (4 * (5 + 6))
1 +    6    + (4 * (5 + 6))
     7      + (4 * (5 + 6))
     7      + (4 *   11   )
     7      +     44
            51
Here are a few more examples:

2 * 3 + (4 * 5) becomes 26.
5 + (8 * 3 + 9 + 3 * 4 * 3) becomes 437.
5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4)) becomes 12240.
((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2 becomes 13632.
Before you can help with the homework, you need to understand it yourself. Evaluate the expression on each line of the homework; what is the sum of the resulting values?
*/

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