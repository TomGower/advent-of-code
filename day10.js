const input = `77
10
143
46
79
97
54
116
60
91
80
132
20
154
53
14
103
31
65
110
43
38
47
120
112
87
24
95
33
104
73
22
66
137
21
109
118
63
55
124
146
148
84
86
147
125
23
85
117
71
48
136
151
130
83
56
140
9
49
113
131
133
74
37
127
34
32
106
1
78
11
72
40
96
17
64
92
102
123
126
90
105
57
99
27
70
98
111
30
50
67
2
155
5
119
8
39`;

const inputArray = input.split('\n');

let max = -Infinity;
let voltages = new Set();
for (let i = 0; i < inputArray.length; i++) {
  max = Math.max(max, +inputArray[i]);
  voltages.add(+inputArray[i]);
}

const partOne = () => {
  let curr = 0;
  let oneDiffs = 0;
  let threeDiffs = 0;

  while (curr < max) {
    if (voltages.has(curr + 1)) {
      oneDiffs++;
      curr = curr + 1;
    } else if (voltages.has(curr + 2)) {
      curr = curr + 2;
    } else if (voltages.has(curr + 3)) {
      threeDiffs++;
      curr = curr + 3;
    } else {
      throw new Error('this should be impossible');
    }
  }

  console.log('part one:', oneDiffs * (threeDiffs + 1));
}

partOne();

const partTwo = () => {
  let dp = new Array(max + 1).fill(0);
  dp[0] = 1;
  if (voltages.has(1)) dp[1] = dp[0];
  if (voltages.has(2)) dp[2] = dp[0] + dp[1];
  if (voltages.has(3)) dp[3] = dp[0] + dp[1] + dp[2];
  for (let i = 4; i <= max; i++) {
    if (voltages.has(i)) {
      dp[i] += dp[i-3] + dp[i-2] + dp[i-1];
    }
  }

  console.log('part two:', dp[dp.length-1]);
}

partTwo();