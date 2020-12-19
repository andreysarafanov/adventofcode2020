import { countValidStrings } from "./monster-messages";

describe("monster messages", () => {
    it.each`
      input                     | stringToCheck                 | expectedResult
      ${ruleInput()}              | ${'aaaabbaabbaaabaaabbaaaaa'} | ${true}
      ${ruleInput()}              | ${'bbbabababaabaaabbaaabaaabbabaababbabbaabbbaababbaaaabaababbbabab'} | ${false}
      ${ruleInput()}              | ${'aaaababbbaaabbababababbb'} | ${true}
      ${ruleInput()}              | ${'babbbabaaabbbbbaaaaaabbaababbbbbabaaabbb'} | ${false}
      ${ruleInput()}              | ${'abaabaabbbbbbbabaabbabab'} | ${true}
      ${ruleInput()}              | ${'babababaabbbbaaabbbababbaaabaabb'} | ${false}
    `("should be validated correctly", ({ input, stringToCheck, expectedResult }) => {
      const realResult = countValidStrings(input, stringToCheck) === 1;
      expect(realResult).toEqual(expectedResult);
    });
  });
  
function ruleInput(){ return `3: 7 45 | 10 39
120: 109 45 | 16 39
84: 96 39 | 104 45
6: 120 39 | 113 45
111: 45 93 | 39 45
13: 17 45 | 96 39
74: 122 45 | 17 39
94: 66 45 | 119 39
127: 39 84 | 45 132
129: 45 128 | 39 35
112: 39 35 | 45 58
24: 45 76 | 39 112
43: 39 17 | 45 96
2: 45 5 | 39 77
71: 100 45
11: 42 31
51: 77 45
4: 124 39 | 85 45
45: "a"
78: 111 39 | 128 45
8: 42
104: 45 39 | 39 93
29: 122 39 | 66 45
42: 63 45 | 20 39
41: 73 45 | 19 39
110: 39 98 | 45 114
55: 45 104 | 39 122
0: 8 11
53: 39 34 | 45 89
39: "b"
61: 77 45 | 104 39
121: 45 65 | 39 1
105: 45 44 | 39 99
113: 9 39 | 103 45
117: 96 93
125: 39 108 | 45 43
69: 45 39
56: 50 45 | 12 39
73: 39 35 | 45 100
87: 39 100 | 45 111
10: 45 13 | 39 73
19: 39 69 | 45 58
100: 39 45
66: 93 93
46: 45 82 | 39 74
76: 66 45 | 111 39
103: 45 52 | 39 115
77: 45 39 | 45 45
52: 82 39 | 112 45
15: 45 47 | 39 132
68: 39 77 | 45 17
1: 45 47 | 39 61
65: 37 45 | 51 39
98: 45 2 | 39 80
35: 39 45 | 45 45
93: 39 | 45
126: 111 39 | 77 45
32: 45 36 | 39 37
37: 45 69 | 39 119
90: 39 17 | 45 69
21: 39 66 | 45 58
22: 39 56 | 45 64
7: 123 39 | 48 45
60: 45 102 | 39 26
107: 45 29 | 39 71
58: 39 45 | 39 39
70: 128 39 | 111 45
81: 27 45 | 129 39
67: 5 39 | 100 45
96: 45 45 | 39 39
116: 39 87 | 45 55
106: 39 51 | 45 92
14: 45 128 | 39 58
48: 39 104 | 45 5
72: 45 35 | 39 111
130: 118 45 | 28 39
115: 45 91 | 39 87
31: 39 6 | 45 22
30: 79 45 | 57 39
9: 125 39 | 49 45
122: 39 39 | 45 93
23: 101 45 | 78 39
47: 39 100 | 45 58
28: 45 111 | 39 122
101: 45 77 | 39 66
33: 39 5 | 45 111
95: 39 5
27: 58 45 | 17 39
16: 15 39 | 116 45
80: 45 119 | 39 66
92: 45 111 | 39 58
57: 39 73 | 45 86
123: 45 58 | 39 77
5: 39 39
128: 45 45
124: 101 39 | 126 45
108: 45 122 | 39 119
119: 45 39 | 39 39
50: 81 45 | 106 39
99: 130 45 | 46 39
132: 17 45 | 119 39
49: 70 45 | 117 39
63: 131 39 | 83 45
85: 39 33 | 45 97
18: 45 60 | 39 25
83: 39 54 | 45 4
38: 62 45 | 21 39
64: 39 30 | 45 121
118: 45 17
91: 39 17 | 45 100
82: 39 100 | 45 119
86: 119 39 | 111 45
89: 39 119 | 45 77
44: 39 127 | 45 107
88: 45 95 | 39 89
17: 39 45 | 45 39
131: 39 3 | 45 110
12: 39 24 | 45 23
26: 39 108 | 45 90
36: 58 45 | 100 39
97: 45 111
25: 39 88 | 45 32
62: 96 39 | 111 45
59: 39 119 | 45 96
34: 45 35 | 39 100
79: 68 39 | 94 45
40: 39 72 | 45 14
20: 39 105 | 45 18
75: 111 45 | 69 39
114: 67 45 | 59 39
54: 38 39 | 53 45
102: 39 75 | 45 80
109: 39 40 | 45 41`};