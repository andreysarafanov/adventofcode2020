const numbers = new Set(['0','1','2','3','4','5','6','7','8','9']);

export function evaluate(line: string) {
    const trimmed = line.replace(/\s/g, '');
    return evaluateRec(trimmed, 0).result;
}

export function evaluateWithPrecedence(line: string) {
    let trimmed = line.replace(/\s/g, '');
    const regex = /\([\*\+0-9]+\)/g;
    while(true) {
        const foundStrings = trimmed.match(regex)?.map(s => s);
        if (!foundStrings || foundStrings.length === 0) {
            break;
        }
        for (let str of foundStrings) {
            trimmed = trimmed.replace(str, evaluateWithPrecedenceWithoutBrackets(str.substr(1, str.length - 2)).toString());
        }
    }

    return evaluateWithPrecedenceWithoutBrackets(trimmed);
}

function evaluateWithPrecedenceWithoutBrackets(line: string) {
    const parts = line.split('*').map(part => part.split('+'));
    return parts.reduce((mult, part) => mult * part.reduce((a,b) => a + (+b), 0), 1);
}

function evaluateRec(line: string, indexFrom: number): {result: number, length: number} {
    let lastOperand: number = Number.MAX_SAFE_INTEGER;
    let lastOperation: "+" | "*" | undefined = undefined;
    let index = indexFrom;
    while(true) {
        const char = line[index];
        if (!char || char === ")") {
            return {result: lastOperand, length: index - indexFrom + 1};
        } else if (numbers.has(char)) {
            lastOperand = useOperation(lastOperation, lastOperand, +char);
            index += 1;
        } else if (char === "+" || char === "*") {
            lastOperation = char;
            index += 1;
        } else if (char === "(") {
            const {result, length} = evaluateRec(line, index + 1);
            lastOperand = useOperation(lastOperation, lastOperand, result);
            index += length + 1;
        }
    }
}

function useOperation(operation: "+" | "*" | undefined, lastOperand: number, thisOperand: number) {
    if (!operation) {
        return thisOperand;
    } else if (operation === "*") {
        return lastOperand * thisOperand;
    } else {
        return lastOperand + thisOperand;
    }
}