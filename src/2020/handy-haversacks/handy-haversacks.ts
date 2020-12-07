import { parseRules } from "./parse-rules";

type MultipleBags = {type: string, amount: number};
export type Rules = {[key: string]: MultipleBags[]};
type PossibleParents = {[key: string]: Set<string>};
const ShinyGold = 'shiny gold';

export function calculateOuterBagsForShinyGold(input: string): number {
    const rules = parseRules(input);
    const possibleParents = getPossibleParents(rules);
    const result = new Set(possibleParents[ShinyGold]);
    let lastResultSize: number;
    do {
        lastResultSize = result.size;
        const resultValues = Array.from(result.keys());
        resultValues.forEach(v => {
            const parents = possibleParents[v] || new Set<string>();
            parents.forEach(p => result.add(p));
        })
    } while (result.size > lastResultSize);
    return result.size;
}

export function calculateTotalBagsInsideShinyGold(input: string): number {
    const rules = parseRules(input);
    let result = 0;
    let lastResult = 0;
    let lastAddedBags = rules[ShinyGold];
    do {
        lastResult = result;
        lastAddedBags.forEach(bags => result += bags.amount);
        let nextBatch: MultipleBags[] = [];
        lastAddedBags.forEach(bags => {
            const bagsToAdd = rules[bags.type];
            for (let i = 0; i < bags.amount; i++) {
                nextBatch = [...bagsToAdd, ...nextBatch];
            }
        })
        lastAddedBags = nextBatch;
    } while (result > lastResult)
    return result;
}

function getPossibleParents(rules: Rules): PossibleParents {
    const result: PossibleParents = {};
    for (let ruleKey of Object.keys(rules)) {
        for (let {type, amount} of rules[ruleKey]) {
            result[type] = result[type] || new Set<string>();
            result[type].add(ruleKey);
        }
    }
    return result;
}
