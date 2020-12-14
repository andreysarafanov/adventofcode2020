export function getNearestBusIdMultipliedByMinutesToWait(input: string): number {
    const [line1, line2] = input.split('\n');
    const busIds = line2.split(',').filter(id => id !== "x").map(id => +id);
    const initialWait = +line1;
    let delta = 0;
    while(true) {
        delta++;
        for (let id of busIds) {
            if ((initialWait + delta) % id === 0) {
                return delta * id;
            }
        }
    }
}

export function part2(input: string): number {
    return getLastStart(parseInput(input));
}

export function part2_V2(input: string): number {
    return getLastStart_V2(parseInput(input));
}

function parseInput(input: string): {value: number, offset: number}[] {
    let arr = input.split(',')
        .map((v, i) => ({value: v === "x" ? -1 :+v, offset: i}))
        .filter(v => v.value !== -1)
        .map(v => ({value: v.value, offset: v.offset % v.value}));

    console.log(arr);
    return arr;
}

function getLastStart_V2(data: {value: number, offset: number}[]): number {
    let step = 1;
    let lastCheckedValue = 0;
    for (let {value, offset} of data) {
        while(true) {
            if ((lastCheckedValue + offset) % value === 0) {
                break;
            } else {
                lastCheckedValue += step;
            }
        }
        step *= value;
    }
    return lastCheckedValue;
}

function getLastStart(data: {value: number, offset: number}[]): number {
    const formulaArray: ((v: number) => number)[] = [v => v];
    const applyFormulas = (v:number) => formulaArray.reduce((acc, f) => f(acc), v);
    let firstCorrectLine = 0;
    for (let {value, offset} of data) {
        let desiredOffset = -1;
        for (let k = 0; k < value; k++) {
            let valueToCheck = applyFormulas(k) + offset;
            if (valueToCheck % value === 0) {
                desiredOffset = k;
                firstCorrectLine = valueToCheck - offset;
                break;
            }
        }
        if (desiredOffset === -1) {
            throw JSON.stringify({value, offset});
        }
        formulaArray.unshift(v => v*value + desiredOffset);
    }
    return firstCorrectLine;
}