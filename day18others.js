const input = `1 + 2 * 3 + 4 * 5 + 6
1 + (2 * 3) + (4 * (5 + 6))`

const inputArray = input.split('\n');

const evaluate = str => {
  let res = null;
  
  let op = null;
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (char === ' ') continue;
    if (char === '(') {
      let stack = [')'];
      let start = i;
      i++;
      while (stack.length) {
        if (str[i] === '(') {
          stack.push(')');
        }
        if (str[i] === ')') {
          stack.pop();
        }
        i++;
      }
      str = str.slice(0, start) + `${evaluate(str.slice(start + 1, i - 1))}` + str.slice(i);
      i = start;
      char = str[i];
    }
    if (!Number.isNaN(+char) && res === null) {
      let num = char;
      while (!Number.isNaN(+str[i+1])) {
        i++;
        num += str[i];
      }
      res = +num;
    } else if (char === '+' || char === '*') {
      op = char;
    } else {
      let num = char;
      while (!Number.isNaN(+str[i+1])) {
        i++;
        num += str[i];
      }
      res = op === '+' ? res + (+num) : res * (+num);
    }
  }

  return res;
}

let total = 0;
for (const rows of inputArray) {
  console.log(evaluate(rows));
}

console.log('total', total);