function parseAndSortInput(input: string): number[] {
    const arr = input.split('\n').map(s => +s).sort((a,b) => a - b);
    arr.unshift(0);
    arr.push(arr[arr.length - 1] + 3);

    return arr;
}

export function calculatePermutations(input: string) {
    return splitToDiffStrings(parseAndSortInput(input)).map(permutationsForDiffString).reduce((a,b) => a*b, 1);
}

function permutationsForDiffString(str: string): number {
    if (str.length === 0 || str.length === 1) {
        return 1
    } else if (str === '11') {
        return 2;
    } else if (str === '111') {
        return 4;
    } else if (str === '1111') {
        return 7;
    } else {
        throw str;
    }
}

function splitToDiffStrings(numbers: number[]): string[] {
    return toDiffString(numbers).split('3');
}

function toDiffString(numbers: number[]): string {
    const arr = new Array<number>(numbers.length - 1);
    for (let i = 0; i < numbers.length - 1; i++) {
        arr[i] = numbers[i + 1] - numbers[i];
    }
    return arr.map(n => n.toString()).join("");
}

export function getDiffBy1And3(input: string) :{by1: number, by3: number} {
    const sortedInput = parseAndSortInput(input);
    let by1 = 0;
    let by3 = 0;

    for(let i = 1; i < sortedInput.length; i++) {
        if (sortedInput[i] - sortedInput[i-1] === 1) {
            by1++;
        }
        if (sortedInput[i] - sortedInput[i-1] === 3) {
            by3++;
        }
    }

    return {by1, by3};
}