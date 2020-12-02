import { RulePasswordPair } from "./validate-password";

export function parsePasswords(input: string): RulePasswordPair[] {
    return input.split('\n').map(parseLine);
}

function parseLine(line: string): RulePasswordPair {
    const [ruleStr, password] = line.split(": ");
    const [repetitions, letter] = ruleStr.split(" ");
    const [fromStr, toStr] = repetitions.split("-");
    const result: RulePasswordPair = {
        rule: {
            letter,
            from: +fromStr,
            to: +toStr
        },
        password
    };
    return result;
}