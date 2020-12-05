export function findMaxNumber(input: string): number {
    return parseSeatNumbers(input).sort((a, b) => b - a)[0];
}

export function printAllMissingNumbers(input: string): void {
    const allNumbers = new Set(parseSeatNumbers(input));
    for (let i = 0; i < 1024; i++) {
        if (!allNumbers.has(i) && allNumbers.has(i + 1) && allNumbers.has(i - 1)) {
            console.log(i);
        }
    }
}

function parseSeatNumbers(input: string): number[] {
    const numbers = input.split('\n').map(parseSeatNumber);
    return numbers;
}

function parseSeatNumber(input: string): number {
    const binary = input.replace(/F/g, '0').replace(/B/g, '1').replace(/R/g, '1').replace(/L/g, '0');
    const result = parseInt(binary, 2);
    return result;
}