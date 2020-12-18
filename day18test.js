const input = `1 + 2 * 3 + 4 * 5 + 6
1 + (2 * 3) + (4 * (5 + 6))`

const inputArray = input.split('\n');

const doOperation = (left, right, op) => {
  if (op === '*') return left * right;
  if (op === '+') return left + right;
  if (op === '-') return left - right;
  if (op === '/') return left / right;
  throw new Error('unkown operation', op);
}

const evaluate = str => {
  let stack = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== ' ') stack.push(str[i]);
  }
  let curr = undefined;
  const operations = new Set('+-*/');
  let parenStack = [];
  let parenStackIndex = [];
  let right = undefined;
  let op = undefined;
  for (let i = 0; i < stack.length; i++) {
    const char = str[i];
    if (char.match(/\d+/)) {
      if (curr === undefined) {
        curr = +char;
      } else if (right === undefined) {
        right = +char;
        curr = doOperation(curr, right, op);
        right = undefined;
        op = undefined;
      }
    } else if (operations.has(char)) {
      op = char;
    } else if (char === '(') {
      parenStack.push(char);
      parenStackIndex.push(i);
      let index = i + 1;
      while (parenStack.length > 0) {
        if (stack[index] === ')') {
          if (parenStack.length > 1) {
            parenStack.pop();
          } else {
            if (curr === undefined) {
              curr = evaluate(stack.slice(parenStartIndex + 1, index));
              i = index;
            } else {
              right = evaluate(stack.slice(parenStackIndex + 1, index));
              curr = doOperation(curr, right, op);
              i = index;
              right = undefined;
              op = undefined;
            }
          }
        } else if (stack[index] === '(') {
          parenStack.push('(');
        }
        index++;
      }
    }
  }
  return curr;
}

let total = 0;
for (const rows of inputArray) {
  total += evaluate(rows);
}

console.table(inputArray);