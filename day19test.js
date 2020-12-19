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
  curr = curr.replace(/\s/g, '');
  console.log('after', curr);
  ruleset[keys] = curr;
}

console.log(ruleset);

const rule0 = '( ( ( ( b ( a ( b ( ( bb | (b|a) a ) a | (ab|aa) b ) | a ( ( bb | (b|a) a ) a | ( bb ) b ) ) | b ( a ( ( ba|aa) a | ( bb ) b ) | b ( b ( bb | (b|a) a ) | a ( b (b|a) | ab ) ) ) ) | a ( ( ( b (bb|aa) | a (bb|ba) ) a | ( a (bb|aa) | b ( b (b|a) | ab ) ) b ) b | ( ( (b|a) ( (b|a) (b|a) ) ) a | ( b (bb|aa) | a (bb| (b|a) a ) ) b ) a ) ) a | ( a ( ( a ( ( (b|a) (b|a) ) a | (ab|aa) b ) | b ( bab | a (bb|aa) ) ) a | ( ( bba | (ab|aa) b ) a | ( aba | (ab|aa) b ) b ) b ) | b ( ( a ( b (ba|ab) | aba ) | b ( bbb | a ( b (b|a) | ab ) ) ) b | ( ( (bb|ba) a | ( (b|a) a | ab ) b ) b | ( (ba|ab) a | (ab|aa) b ) a ) a ) ) b ) a | ( a ( ( ( ( a ( (b|a) a | ab ) | b ( b (b|a) | ab ) ) a | ( bab | aab ) b ) b | ( ( ( (b|a) (b|a) ) a | (ab|aa) b ) b | ( abb | bab ) a ) a ) b | ( ( ( (bb|ba) b | baa ) b | ( (bb|ba) b ) a ) a | ( a ( b (bb|ab) | a (ab|aa) ) | b ( (b|a) (bb|ba) ) ) b ) a ) | b ( a ( a ( ( abb | bab ) b | ( bab | a (bb|aa) ) a ) | b ( b ( ( (b|a) (b|a) ) a | (bb|ab) b ) | a ( ( (b|a) a | ab ) b | (ab|aa) a ) ) ) | b ( b ( a ( a (bb|ab) | b ( b (b|a) | ab ) ) | b ( bab ) ) | a ( a ( (ab|aa) a | bab ) | b ( abb | (ba|ab) a ) ) ) ) ) b ) ) ( ( ( ( b ( a ( b ( ( bb | (b|a) a ) a | (ab|aa) b ) | a ( ( bb | (b|a) a ) a | bbb ) ) | b ( a ( (ba|aa) a | bbb ) | b ( b ( bb | (b|a) a ) | a ( b (b|a) | ab ) ) ) ) | a ( ( ( b (bb|aa) | a (bb|ba) ) a | ( a (bb|aa) | b ( b (b|a) | ab ) ) b ) b | ( ( (b|a) ( (b|a) (b|a) ) ) a | ( b (bb|aa) | a (bb | (b|a) a ) ) b ) a ) ) a | ( a ( ( a ( ( (b|a) (b|a) ) a | (ab|aa) b ) | b ( bab | a (bb|aa) ) ) a | ( ( bba | (ab|aa) b ) a | ( aba | (ab|aa) b ) b ) b ) | b ( ( a ( b (ba|ab) | aba ) | b ( bbb | a ( b (b|a) | ab ) ) ) b | ( ( (bb|ba) a | ( (b|a) a | ab ) b ) b | ( (ba|ab) a | (ab|aa) b ) a ) a ) ) b ) a | ( a ( ( ( ( a ( (b|a) a | ab ) | b ( b (b|a) | ab ) ) a | (bab|aab) b ) b | ( ( ( (b|a) (b|a) ) a | (ab|aa) b ) b | (abb|bab) a ) a ) b | ( ( ( (bb|ba) b | baa ) b | ( (bb|ba) b ) a ) a | ( a ( b (bb|ab) | a (ab|aa) ) | b ( (b|a) (bb|ba) ) ) b ) a ) | b ( a ( a ( (abb|bab) b | ( bab | a (bb|aa) ) a ) | b ( b ( ( (b|a) (b|a) ) a | (bb|ab) b ) | a ( ( (b|a) a | ab ) b | (ab|aa) a ) ) ) | b ( b ( a ( a (bb|ab) | b ( b (b|a) | ab ) ) | b ( bab ) ) | a ( a ( (ab|aa) a | bab ) | b ( abb | (ba|ab) a ) ) ) ) ) b ) ( a ( a ( a ( a ( a ( (bb|ba) a | (ab|aa) b ) | b ( b (bb|ba) | aab ) ) | b ( ( aba | b (ba|aa) ) a | ( b (ba|aa) | a ( (b|a ) a | ab ) ) b ) ) | b ( ( a ( b (ba|ab) | abb ) | bbab ) a | ( b ( b (bb|aa) | a ( bb | (b|a) a ) ) | a ( ( (b|a) a | ab ) a | (bb|aa) b ) ) b ) ) | b ( ( ( ( a (bb|aa) | b ( bb | (b|a) a ) ) a | ( b (bb|ab) | a (ab|aa) ) b ) b | ( ( (ba|aa) (b|a) ) b | ( bab | (ba|aa) a ) a ) a ) b | ( ( b ( aba | aab ) | a ( b (ba|ab) | abb ) ) a | ( ( a ( (b|a) (b|a) ) | b ( b (b|a) | ab ) ) b | ( (bb|aa) b | ( b (b|a) | ab ) a ) a ) b ) a ) ) | b ( b ( ( b ( ( (bb|ba) b | baa ) b | ( ( bb | (b|a ) a ) b | ( (b|a) (b|a) ) a ) a ) | a ( ( b (bb|aa) | a (bb|ba) ) a | ( b ( bb | (b|a) a ) | a ( bb | a (b|a) ) ) b ) ) b | ( ( ( ( bb | (b|a) a ) a | bab ) b | ( bbb | ( b (b|a) | ab ) a ) a ) b | ( a ( b (ba|ab) | a ( b (b|a) | ab ) ) | b ( bab | aaa ) ) a ) a ) | a ( ( ( ( b (bb|ba) | a ( (b|a) (b|a) ) ) a | ( bab | a (bb|aa) ) b ) b | ( b (abb|aba) | a ( (bb|aa) b | ( b (b|a) | ab ) a ) ) a ) b | ( b ( ( b (bb|ab) | aba ) a | ( aba | (bb|aa) b ) b ) | a ( a ( b ( (b|a) (b|a) ) | a ( b (b|a) | ab ) ) | b (aba|bbb) ) ) a ) ) ) )';

// console.log(rule0);
