type LetterRule = {type: "letter", letter: string};
type RedirectRule = {type: "redirect", redirectTo: number};
type ConcatRule = {type: "concat", parts: number[]};

type SimpleRule = LetterRule | RedirectRule | ConcatRule;

type SingleRule = {type: "single", inner: SimpleRule};
type EitherRule = {type: "either", rules: SimpleRule[]};

type Rule = SingleRule | EitherRule;
type RuleByKey = {[key: number]: Rule};

export function countValidStrings(ruleInput: string, strings: string): number {
    const rules = parseRules(ruleInput);
    return strings.split('\n').filter(line => checkRule(line, 0, line.length - 1, rules[0], rules)).length;
}

function checkRule(line: string, from: number, to: number, rule: Rule, allRules: RuleByKey): boolean {
    if (rule.type === "single") {
        return checkSimpleRule(line, from, to, rule.inner, allRules);
    } else {
        return rule.rules.some(innerRule => checkSimpleRule(line, from, to, innerRule, allRules))
    }
}

function checkSimpleRule(line: string, from: number, to: number, rule: SimpleRule, allRules: RuleByKey): boolean {
    switch(rule.type) {
        case "letter": return checkLetterRule(line, from, to, rule, allRules);
        case "redirect": return checkRedirectRule(line, from, to, rule, allRules);
        case "concat": return checkConcatRule(line, from, to, rule, allRules);
    }
}

function checkConcatRule(line: string, from: number, to: number, rule: ConcatRule, allRules: RuleByKey): boolean {
    return rule.parts.length > 2
        ? checkLongConcatRule(line, from, to, rule, allRules)
        : checkShortConcatRule(line, from, to, rule, allRules);
}

function checkShortConcatRule(line: string, from: number, to: number, rule: ConcatRule, allRules: RuleByKey): boolean {
    const leftRule = allRules[rule.parts[0]];
    const rightRule = allRules[rule.parts[1]];
    if (leftRule.type === "single" && leftRule.inner.type === "letter" && rightRule.type === "single" && rightRule.inner.type === "letter") {
        return to - from === 1 && line[from] === leftRule.inner.letter && line[to] === rightRule.inner.letter;
    } else if (leftRule.type === "single" && leftRule.inner.type === "letter") {
        return line[from] === leftRule.inner.letter && checkRule(line, from + 1, to, rightRule, allRules);
    } else if (rightRule.type === "single" && rightRule.inner.type === "letter") {
        return line[to] === rightRule.inner.letter && checkRule(line, from, to - 1, leftRule, allRules);
    } else {
        for (let i = from; i < to; i++) {
            if (checkRule(line, from, i, leftRule, allRules) && checkRule(line, i+1, to, rightRule, allRules)) {
                return true;
            }
        }
        return false;
    }
}

function checkLongConcatRule(line: string, from: number, to: number, rule: ConcatRule, allRules: RuleByKey): boolean {
    if (rule.parts.length === 2) {
        return checkShortConcatRule(line, from, to, rule, allRules);
    }

    const leftRule = allRules[rule.parts[0]];
    const rightRule: ConcatRule = {type: "concat", parts: rule.parts.slice(1)};
    for (let i = from; i < to; i++) {
        if (checkRule(line, from, i, leftRule, allRules) && checkConcatRule(line, i+1, to, rightRule, allRules)) {
            return true;
        }
    }
    return false;
}

function checkLetterRule(line: string, from: number, to: number, rule: LetterRule, allRules: RuleByKey): boolean {
    return from === to && line[from] === rule.letter;
}

function checkRedirectRule(line: string, from: number, to: number, rule: RedirectRule, allRules: RuleByKey): boolean {
    return checkRule(line, from, to, allRules[rule.redirectTo], allRules);
}

function parseRules(input: string): RuleByKey {
    let result: RuleByKey = {};
    input.split('\n').forEach(line => {
        const [ruleNumber, ruleText] = line.split(': ');
        result[+ruleNumber] = parseRule(ruleText);
    })
    return result;
}

function parseRule(ruleStr: string): Rule {
    const parts = ruleStr.split(' | ');
    if (parts.length === 1) {
        return {type: "single", inner: parseSimpleRule(parts[0])};
    } else {
        return {type: "either", rules: parts.map(parseSimpleRule)};
    }
}

function parseSimpleRule(ruleStr: string): SimpleRule {
    if (ruleStr[0] === '"') {
        return {type: "letter", letter: ruleStr[1]};
    }
    const parts = ruleStr.split(' ');
    if (parts.length === 1) {
        return {type: "redirect", redirectTo: +parts[0]};
    } else {
        return {type: "concat", parts: parts.map(p => +p)};
    }
}