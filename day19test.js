const input = `0: 4 1 5
1: 2 3 | 3 2
2: 4 4 | 5 5
3: 4 5 | 5 4
4: "a"
5: "b"

ababbb
bababa
abbbab
aaabbb
aaaabbb`;

const inputArray = input.split('\n\n');
const rules = inputArray[0].split('\n');
const messages = inputArray[1].split('\n');

const ruleset = {};
rules.forEach(rule => {
  let ruleArr = rule.split(': ');
  const key = ruleArr[0];
  const value = ruleArr[1];
  ruleset[key] = value;
});

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
  console.log('before', curr);
  curr = curr.replace(regexA, 'a');
  curr = curr.replace(regexB, 'b');
  curr = curr.replace(regexQuote, '');
  console.log('after', curr);
  ruleset[keys] = curr;
}

console.log(ruleset);
