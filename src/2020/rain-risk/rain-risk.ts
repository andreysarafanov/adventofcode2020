export type Direction = "N" | "S" | "E" | "W" | "L" | "R" | "F";
export type Command = {direction: Direction, value: number};
export type MoveVector = {x: -1|0|1, y: -1|0|1};
type ShipState = {x: number, y: number, moveVector: MoveVector};

export function getFinalPosition(input: string): {x: number, y: number} {
    const commands = parseInput(input);
    let shipState: ShipState = {
        x: 0,
        y: 0,
        moveVector: {x: 1, y:0}
    };

    for (let command of commands) {
        shipState = nextShipState(shipState, command);
    }

    return {x: shipState.x, y: shipState.y};
}

function nextShipState(state: ShipState, command: Command): ShipState {
    let newX = state.x;
    let newY = state.y;
    let newMoveVector = state.moveVector;
    if (command.direction === "N") {
        newY += command.value
    } else if (command.direction === "S") {
        newY -= command.value
    } else if (command.direction === "E") {
        newX += command.value
    } else if (command.direction === "W") {
        newX -= command.value
    } else if (command.direction === "F") {
        newY += state.moveVector.y * command.value;
        newX += state.moveVector.x * command.value;
    } else if (command.direction === "L") {
        const quadrants = command.value / 90 * -1;
        newMoveVector = rotateShip(state.moveVector, quadrants);
    } else if (command.direction === "R") {
        const quadrants = command.value / 90;
        newMoveVector = rotateShip(state.moveVector, quadrants);
    } else {
        throw "unknown direction";
    }

    return {
        moveVector: newMoveVector,
        x: newX,
        y: newY
    };
}

function rotateShip(moveVector: MoveVector, quadrants: number): MoveVector {
    const allVectors: MoveVector[] = [
        {x: 1, y: 0},
        {x: 0, y: -1},
        {x: -1, y: 0},
        {x: 0, y: 1}
    ];
    const currentVectorIndex = allVectors.findIndex(v => v.x === moveVector.x && v.y === moveVector.y);
    const nextVectorIndex = (currentVectorIndex + quadrants) % allVectors.length;
    const nextVector = allVectors.slice(nextVectorIndex)[0];
    return nextVector;
}

function parseInput(input: string): Command[] {
    return input.split('\n').map(parseCommand);
}

function parseCommand(line: string): Command {
    const [letter, value] = [line[0], +line.slice(1)];
    return {
        direction: letter as Direction,
        value
    };
}