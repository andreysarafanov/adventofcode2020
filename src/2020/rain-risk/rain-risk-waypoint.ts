import { Command, Direction } from "./rain-risk";

type Position = {x: number, y: number};
type ShipState = {position: Position, waypoint: Position};

export function getFinalPositionByWaypoint(input: string, initialWaypoint: Position): Position {
    const commands = parseInput(input);
    let shipState: ShipState = {
        position: {x: 0, y: 0},
        waypoint: initialWaypoint
    };

    for (let command of commands) {
        shipState = nextShipState(shipState, command);
    }

    return shipState.position;
}

function nextShipState(state: ShipState, command: Command): ShipState {
    let newPositionX = state.position.x;
    let newPositionY = state.position.y;
    let newWaypointX = state.waypoint.x;
    let newWaypointY = state.waypoint.y;
    if (command.direction === "N") {
        newWaypointY += command.value;
    } else if (command.direction === "S") {
        newWaypointY -= command.value
    } else if (command.direction === "E") {
        newWaypointX += command.value
    } else if (command.direction === "W") {
        newWaypointX -= command.value
    } else if (command.direction === "F") {
        newPositionY += state.waypoint.y * command.value;
        newPositionX += state.waypoint.x * command.value;
    } else if (command.direction === "L") {
        const quadrants = command.value / 90 * -1;
        const newWaypoint = rotateWaypoint(state.waypoint, quadrants);
        newWaypointX = newWaypoint.x;
        newWaypointY = newWaypoint.y;
    } else if (command.direction === "R") {
        const quadrants = command.value / 90;
        const newWaypoint = rotateWaypoint(state.waypoint, quadrants);
        newWaypointX = newWaypoint.x;
        newWaypointY = newWaypoint.y;
    } else {
        throw "unknown direction";
    }

    return {
        waypoint: {
            x: newWaypointX,
            y: newWaypointY
        },
        position: {
            x: newPositionX,
            y: newPositionY
        }
    };
}

function rotateWaypoint(wayPoint: Position, quadrantsToRotate: number): Position {
    const allQuadrants = [
        {x: 1, y: 1},
        {x: 1, y: -1},
        {x: -1, y: -1},
        {x: -1, y: 1}
    ];

    const currentQuadrantIndex: number =
        wayPoint.x > 0 && wayPoint.y >= 0
            ? 0
        : wayPoint.x >= 0 &&  wayPoint.y < 0
            ? 1
        : wayPoint.x < 0 &&  wayPoint.y <= 0
            ? 2
            : 3;
    const nextQuadrantIndex = (currentQuadrantIndex + quadrantsToRotate) % 4;
    const nextQuadrant = allQuadrants.slice(nextQuadrantIndex)[0];

    const swapPositions = quadrantsToRotate % 2 !== 0;
    const newAbsX = Math.abs(swapPositions ? wayPoint.y : wayPoint.x);
    const newAbsY = Math.abs(swapPositions ? wayPoint.x : wayPoint.y);

    const newWaypoint: Position = {x: newAbsX * nextQuadrant.x, y: newAbsY * nextQuadrant.y};
    return newWaypoint;
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