function parseInput(input: string): number[] {
    return input.split('\n').map(s => +s);
}

export function findContinuousNumbersWithDefinedSum(input: string, sumToFind: number): {from: number, to: number} {
    const numbers = parseInput(input);
    let from = 0;
    let to = 1;
    let sum = numbers[0] + numbers[1];
    let hasSeenANumberTooLarge = false;
    let hasSeenANumberTooSmall = false;
    while (true) {
        console.log(`from=${from}, to=${to}, sum=${sum}, hasSeenANumberTooLarge=${hasSeenANumberTooLarge}, hasSeenANumberTooSmall=${hasSeenANumberTooSmall}`)
        if (sum === sumToFind) {
            return {from, to};
        }
        hasSeenANumberTooSmall = hasSeenANumberTooSmall || sum < sumToFind;
        hasSeenANumberTooLarge = hasSeenANumberTooLarge || sum > sumToFind;
        if (sum < sumToFind && !hasSeenANumberTooLarge) {
            to += 1;
            sum += numbers[to];
        } else if (sum > sumToFind && !hasSeenANumberTooSmall) {
            sum -= numbers[to]
            to -= 1;
        } else {
            sum -= numbers[from];
            from += 1;
            hasSeenANumberTooSmall = false;
            hasSeenANumberTooLarge = false;
        }
    }
}

export function getSumOfLargestAndSmallestNumbersInRange(from: number, to: number, input: string): number {
    const numbers = parseInput(input);
    let max = 0;
    let min = Number.MAX_SAFE_INTEGER;
    for (let i = from; i <= to; i++) {
        if (numbers[i] > max) max = numbers[i];
        if (numbers[i] < min) min = numbers[i];
    }
    return max + min;
}

export function findFirstWrongNumber(input: string, range: number): number|"fail" {
    const numbers = parseInput(input);
    const sumSets: Set<number>[] = [];
    for (let i = 0; i < range; i++) {
        sumSets.push(new Set());
        for (let j = 0; j < i; j++) {
            sumSets[i].add(numbers[i] + numbers[j]);
        }
    }
    console.log(sumSets);
    console.log(numbers);

    for (let i = range; i < numbers.length; i++) {
        let hasBeenFound = false;
        sumSets.push(new Set());
        for (let j = i - range; j < i; j++) {
            hasBeenFound = hasBeenFound || sumSets[j].has(numbers[i]);
            sumSets[i].add(numbers[j] + numbers[i]);
        }
        if (!hasBeenFound) {
            return numbers[i];
        }
    }

    return "fail";
}