import { Rules } from "./handy-haversacks";

export function parseRules(input: string): Rules {
    const result: Rules = {};
    const lines = input.split('\n');
    for (let line of lines) {
        let [key, ruleStr] = line.split(' bags contain ');
        if (ruleStr === 'no other bags.') {
            result[key] = [];
        } else {
            if (ruleStr.endsWith(' bags.')) {
                ruleStr = ruleStr.substr(0, ruleStr.length - 6);
            } else if (ruleStr.endsWith(' bag.')) {
                ruleStr = ruleStr.substr(0, ruleStr.length - 5);
            }
            const ruleStrings = ruleStr.split(/ bags, | bag, /g);
            const rules = ruleStrings.map(parseRule);
            result[key] = rules;
        }
    }
    return result;
}

function parseRule(ruleStr: string): {type: string, amount: number} {
    const amount = +ruleStr.substr(0,1);
    const type = ruleStr.substr(2);
    return ({
        amount, type
    });
}