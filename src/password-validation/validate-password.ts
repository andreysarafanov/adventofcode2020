import { parsePasswords } from "./parse-passwords";

export type Rule = {letter: string, from: number, to: number};
export type Password = string;
export type RulePasswordPair = {rule: Rule, password: Password};

export function calculateValidPairsV1(input: string) {
    const rulesAndPasswords = parsePasswords(input);
    const validCount = rulesAndPasswords.filter(isPairValidV1).length;
    return validCount;
}

export function calculateValidPairsV2(input: string) {
    const rulesAndPasswords = parsePasswords(input);
    const validCount = rulesAndPasswords.filter(isPairValidV2).length;
    return validCount;
}

function isPairValidV1({rule, password}: RulePasswordPair): boolean {
    let result = 0;
    for (let i = 0; i < password.length; i++) {
        if (password[i] === rule.letter) {
            result++;
        }
    }
    return result >= rule.from && result <= rule.to;
}

function isPairValidV2({rule, password}: RulePasswordPair): boolean {
    const fromMatch = password[rule.from - 1] === rule.letter;
    const toMatch = password[rule.to - 1] === rule.letter;

    return Number(fromMatch) + Number(toMatch) === 1;
}