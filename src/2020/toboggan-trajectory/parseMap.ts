import { Field, Point } from "./tree-encounters";

export function ParseField(input: string): Field {
    const lineStrings = input.split('\n');
    const width = lineStrings[0].length;
    const height = lineStrings.length;
    const lines = lineStrings.map(parseLine);
    return {width, height, lines};
}

function parseLine(line: string): Point[] {
    return line.split('').map(c => ({hasTree: c === '#'}));
}