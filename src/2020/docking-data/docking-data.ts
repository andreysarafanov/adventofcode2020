type Command = 
    {type: "SetBitMask", value: string} |
    {type: "SetMem", value: number, position: number};

export function applyCommandsAndGetValueSum_V2(input: string): number {
    const mem: Map<number, number> = new Map<number, number>();
    let mask: string = "";
    const commands = parseInput(input);
    for (let command of commands) {
        if (command.type === "SetBitMask") {
            mask = command.value;
        } else if (command.type === "SetMem") {
            let positionStr = command.position.toString(2);

            let positionStrWithFloatingBits = new Array<string>();
            for (let i = 1; i <= mask.length; i++) {
                if (mask[mask.length - i] === "X" || mask[mask.length - i] === "1") {
                    positionStrWithFloatingBits.unshift(mask[mask.length - i]);
                } else if (i <= positionStr.length) {
                    positionStrWithFloatingBits.unshift(positionStr[positionStr.length - i]);
                } else {
                    positionStrWithFloatingBits.unshift("0");
                }
            }


            const numberOfFloatingBits = positionStrWithFloatingBits.filter(c => c === "X").length;
            for (let i = 0; i < Math.pow(2, numberOfFloatingBits); i++) {
                let thisPosition = positionStrWithFloatingBits.join('');
                const floatingBits = i.toString(2).padStart(numberOfFloatingBits, "0");
                for(let flIdx = 0; flIdx < numberOfFloatingBits; flIdx++) {
                    thisPosition = thisPosition.replace("X", floatingBits[flIdx]);
                }
                mem.set(parseInt(thisPosition, 2), command.value);
            }
        }
    }

    let sum = 0;
    for (let val of mem.values()) {
        sum += val;
    }
    return sum;
}

export function applyCommandsAndGetValueSum(input: string): number {
    const mem: Map<number, number> = new Map<number, number>();
    let mask: string = "";
    const commands = parseInput(input);
    for (let command of commands) {
        if (command.type === "SetBitMask") {
            mask = command.value;
        } else if (command.type === "SetMem") {
            let valueStr = command.value.toString(2);

            let result = new Array<string>();
            for (let i = 1; i <= mask.length; i++) {
                if (mask[mask.length - i] !== "X") {
                    result.unshift(mask[mask.length - i]);
                } else if (i <= valueStr.length) {
                    result.unshift(valueStr[valueStr.length - i]);
                } else {
                    result.unshift("0");
                }
            }
            const value = parseInt(result.join(''), 2);
            mem.set(command.position, value);
        }
    }

    let sum = 0;
    for (let val of mem.values()) {
        sum += val;
    }
    return sum;
}

function parseInput(input: string): Command[] {
    return input.split('\n').map(parseCommand);
}

function parseCommand(line: string): Command {
    const [left, right] = line.split(" = ");
    if (left === "mask") {
        return {type: "SetBitMask", value: right};
    } else {
        let position = left.substr(4, left.length - 5);
        return {type: "SetMem", value: +right, position: +position};
    }
}