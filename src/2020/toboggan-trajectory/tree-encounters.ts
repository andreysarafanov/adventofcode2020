import { ParseField } from "./parseMap";

export type Point = {
    hasTree: boolean;
}

export type Field = {
    width: number;
    height: number;
    lines: Point[][];
}

export type Position = {
    x: number;
    y: number;
    fieldNumber: number;
}

export type Step = {x: number, y: number};

export function calculateTreeEncounters(input: string, step: Step): number {
    const field = ParseField(input);
    let position: Position = {fieldNumber: 0, x: 0, y: 0};
    let encounteredTrees = 0;
    while (position.y < field.height) {
        if (field.lines[position.y][position.x].hasTree) {
            // console.log('add tree');
            encounteredTrees++;
        }
        position = calculateNextPosition(position, field, step);
        // console.log(JSON.stringify(position));
    }
    return encounteredTrees;
}

function calculateNextPosition(position: Position, field: Field, step: Step): Position {
    const moveToNextField = position.x + step.x >= field.width;
    const nextX = (position.x + step.x) % field.width;
    const nextY = position.y + step.y;

    return ({
        fieldNumber: moveToNextField ? position.fieldNumber + 1 : position.fieldNumber,
        x: nextX,
        y: nextY
    })
}