type Rule = {
    check: (value: number) => boolean;
    ruleText: string;
    ruleName: string;
    initialId: number;
}

export function getOrderedRules(rulesStr: string, nearbyTicketsStr: string, myTicket: number[]): {name: string, v: number}[] {
    const rules = parseRules(rulesStr);
    const nearbyTickets = parseNearbyTickets(nearbyTicketsStr);
    const validTickets = nearbyTickets.filter(ticket => isValidTicket(ticket, rules));


    const rulesWithPossibleNumbers = new Map<Rule, Set<number>>();
    rules.forEach(rule => rulesWithPossibleNumbers.set(rule, getSetOfNumbersFrom0ToN(rules.length)));

    for (let rule of rules) {
        for (let ticket of validTickets) {
            for (let i = 0; i < ticket.length; i++) {
                if (!rule.check(ticket[i])) {
                    rulesWithPossibleNumbers.get(rule)?.delete(i);
                }
            }
        }
    }

    simplifyRulesWithPossibleNumbers(rulesWithPossibleNumbers);
    // console.log(rulesWithPossibleNumbers);

    const result = Array.from(rulesWithPossibleNumbers.keys()).sort((a, b) => {
        return (+(Array.from(rulesWithPossibleNumbers.get(a) as Set<number>)[0])) - (+(Array.from(rulesWithPossibleNumbers.get(b) as Set<number>)[0]));
    });
    // console.log(rulesWithPossibleNumbers);

    // const orderedRules = getOrderedRulesRec(rules, [], rulesWithPossibleNumbers);
    // if (orderedRules === "fail") {
    //     console.log("FAIL_2")
    //     throw "FAIL";
    // }

    const nameByValue = result.map((r, i) => ({name: r.ruleName, v: myTicket[i]}));
    return nameByValue;
}

function simplifyRulesWithPossibleNumbers(rulesWithPossibleNumbers: Map<Rule, Set<number>>) {
    const alreadyRemovedNumbers = new Set<number>();
    let oldRemovedNumbersSize = 0;
    while (true) {
        rulesWithPossibleNumbers.forEach((value, rule) => {
            if (value.size === 1) {
                const key = Array.from(value)[0];
                if (!alreadyRemovedNumbers.has(key)) {
                    rulesWithPossibleNumbers.forEach((v_1, rule_1) => {
                        if (rule_1.initialId !== rule.initialId) {
                            v_1.delete(key);
                        }
                    });
                    alreadyRemovedNumbers.add(key);
                }
            }
        })
        if (alreadyRemovedNumbers.size === oldRemovedNumbersSize) {
            break;
        }
        oldRemovedNumbersSize = alreadyRemovedNumbers.size;
    }
    
}

function getOrderedRulesRec(allRules: Rule[], alreadySetRules: number[], rulesWithPossibleNumbers: Map<Rule, Set<number>>): number[] | "fail" {
    if (alreadySetRules.length === allRules.length) {
        return alreadySetRules;
    }

    const currentIndex = alreadySetRules.length;

    const applyableRules = allRules.filter(rule => rulesWithPossibleNumbers.get(rule)?.has(currentIndex) && alreadySetRules.indexOf(rule.initialId) === -1);

    if (applyableRules.length === 0) {
        return "fail";
    }

    for (let i = 0; i < applyableRules.length; i++) {
        if (alreadySetRules.length === 0 || alreadySetRules.length < 10) {
            // console.log(`depth: ${alreadySetRules.length}, i:${i}`);
        }
        const result = getOrderedRulesRec(allRules, [...alreadySetRules, applyableRules[i].initialId], rulesWithPossibleNumbers);
        if (result !== "fail") {
            return result;
        }
    }
    return "fail";
}

function getSetOfNumbersFrom0ToN(n: number): Set<number> {
    return new Set(new Array(n).fill(1).map((_,i) => i));
}

function isValidTicket(ticket: number[], rules: Rule[]): boolean {
    for(let field of ticket) {
        if (!fieldIsValidForAnyRule(field, rules)) {
            return false;
        }
    }
    return true;
}

function fieldIsValidForAnyRule(field: number, rules: Rule[]): boolean {
    return rules.some(rule => rule.check(field));
} 

export function getSumOfInvalidFields(rulesStr: string, nearbyTicketsStr: string) {
    const rules = parseRules(rulesStr);
    const nearbyTickets = parseNearbyTickets(nearbyTicketsStr);

    let sum = 0;
    nearbyTickets.forEach(arr => arr.forEach(checkedValue => {
        if (!rules.some(rule => rule.check(checkedValue))) {
            sum += checkedValue;
        }
    }));
    return sum;
}

function parseNearbyTickets(nearbyTicketsStr: string): number[][] {
    return nearbyTicketsStr.split('\n').map(line => {
        return line.split(',').map(v => +v);
    });
}

function parseRules(inputRules: string): Rule[] {
    return inputRules.split('\n').map((line, i) => parseRule(line, i));
}

function parseRule(line: string, lineId: number): Rule {
    const [ruleName,rulePart] = line.split(': ');
    const blocks = rulePart.split(' or ').map(rangeStr => {
        const [fromStr, toStr] = rangeStr.split('-');
        return {from: +fromStr, to: +toStr};
    });
    return {
        ruleName,
        check: (value: number) => blocks.some(b => b.from <= value && value <= b.to),
        ruleText: line,
        initialId: lineId
    };
}