type Point = {
    x: number;
    y: number;
    z: number;
}

type SpaceState = {
    state: {[key:string]: boolean};
    xLimits: {from: number, to: number};
    yLimits: {from: number, to: number};
    zLimits: {from: number, to: number};
}

export function getActiveCubesAfterNSteps(input: string, n:number): number {
    let state = parseInitialState(input);
    console.log(`INITIAL`);
    printState(state);
    for (let i = 1; i <= n; i++) {
        state = nextState(state);
        console.log(`STEP ${i}`);
        printState(state);
    }
    return Object.keys(state.state).length;
}

function printState(spaceState: SpaceState): void {
    const {state, xLimits, yLimits, zLimits} = spaceState;
    for (let z = zLimits.from; z <= zLimits.to; z++) {
        console.log(`z=${z}, x:${xLimits.from} - ${xLimits.to}, y:${yLimits.from} - ${yLimits.to}`);
        for (let y = yLimits.from; y <= yLimits.to; y++) {
            const line = new Array<string>();
            for (let x = xLimits.from; x <= xLimits.to; x++) {
                const thisPointStr = pointToStr({x,y,z});
                line.push(state[thisPointStr] ? '#' : '.');
            }
            console.log(line.join(''));
        }
        console.log();
    }
    console.log();
}

function nextState(spaceState: SpaceState): SpaceState {
    const {state, xLimits, yLimits, zLimits} = spaceState;
    const newState: {[key:string]: boolean} = {};
    let minX = Number.MAX_SAFE_INTEGER, minY = Number.MAX_SAFE_INTEGER, minZ = Number.MAX_SAFE_INTEGER;
    let maxX = Number.MIN_SAFE_INTEGER, maxY = Number.MIN_SAFE_INTEGER, maxZ = Number.MIN_SAFE_INTEGER;
    for (let z = zLimits.from-1; z <= zLimits.to+1; z++)
    for (let y = yLimits.from-1; y <= yLimits.to+1; y++)
    for (let x = xLimits.from-1; x <= xLimits.to+1; x++) {
        const thisPointStr = pointToStr({x,y,z});
        let nearbyActive = 0;
        for (let zDelta = -1; zDelta <= 1; zDelta++)
        for (let yDelta = -1; yDelta <= 1; yDelta++)
        for (let xDelta = -1; xDelta <= 1; xDelta++) {
            if (zDelta === 0 && yDelta === 0 && xDelta ===0) {
                continue;
            }
            const checkedPointStr = pointToStr({x:x+xDelta,y:y+yDelta,z:z+zDelta});
            nearbyActive += Number(!!state[checkedPointStr]);
        }
        if ((!!state[thisPointStr] && (nearbyActive === 2 || nearbyActive === 3)) || (!state[thisPointStr] && nearbyActive === 3)){
            newState[thisPointStr] = true;
            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            minZ = Math.min(minZ, z);
            maxX = Math.max(maxX, x);
            maxY = Math.max(maxY, y);
            maxZ = Math.max(maxZ, z);
        }
        // console.log(`nearby active for (${thisPointStr}) = ${nearbyActive}`);
    }

    return {
        state: newState,
        xLimits: {from: minX, to: maxX},
        yLimits: {from: minY, to: maxY},
        zLimits: {from: minZ, to: maxZ},
    }
}

function parseInitialState(stateStr: string): SpaceState {
    const lines = stateStr.split('\n');
    const xLimits = {from: 0, to: lines[0].length - 1};
    const yLimits = {from: 0, to: lines.length - 1};
    const zLimits = {from: 0, to: 0};
    const z = 0;

    const state: {[key:string]: boolean} = {};

    for (let x = xLimits.from; x <= xLimits.to; x++)
    for (let y = yLimits.from; y <= yLimits.to; y++) {
        state[pointToStr({x,y,z})] = lines[y][x] === '#';
    }

    return {
        state, xLimits, yLimits, zLimits
    };
}

function pointToStr(pnt: Point): string {
    return `${pnt.z};${pnt.y};${pnt.x}`;
}

function strToPoint(str: string): Point {
    const [x,y,z] = str.split(';').map(s => +s);
    return {z,y,x};
}