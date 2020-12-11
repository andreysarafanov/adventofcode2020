type AreaState = {
    areaState: string;
    width: number;
    height: number;
}

type SeatState = "." | "L" | "#";

const Floor: string = ".";
const EmptySeat: string = "L";
const OccupiedSeat: string = "#";
const Outside: string = "!";

export function getStableNumberOfOccupiedSeats(input: string) {
    let state = parseArea(input);
    
    while(true) {
        const newState = nextAreaState(state);
        
        if (newState.areaState === state.areaState) {
            return newState.areaState.split('#').length - 1;
        }
        state = newState;
    }
}

export function getStableNumberOfOccupiedSeatsBasedOnVisibility(input: string) {
    let state = parseArea(input);
    // printState(state);
    while(true) {
        const newState = nextAreaStateBasedOnVisibility(state);
        // printState(newState);
        if (newState.areaState === state.areaState) {
            return newState.areaState.split('#').length - 1;
        }
        state = newState;
    }
}

function printState(state: AreaState) {
    console.log('=====================================')
    for (let line = 0; line < state.height; line++) {
        console.log(state.areaState.slice(line * state.width, line * state.width + state.width));
    }
    console.log('=====================================')
}

function getAt(state: AreaState, x: number, y:number): string {
    if (x < 0 || x >= state.width || y < 0 || y > state.height) {
        return Outside;
    } else {
        return state.areaState[y*state.width + x];
    }
}

function countVisibleOccupiedSeats(state: AreaState, x: number, y:number): number {
    let result = 0;
    const steps: {dx: number, dy:number}[] = [
        {dx: -1, dy: -1},
        {dx: -1, dy: 0},
        {dx: -1, dy: 1},
        {dx: 0, dy: -1},
        {dx: 0, dy: 1},
        {dx: 1, dy: -1},
        {dx: 1, dy: 0},
        {dx: 1, dy: 1},
    ]
    for (let {dx, dy} of steps) {
        let posToCheck = {x: x+dx, y: y+dy};
        while(true) {
            const seat = getAt(state, posToCheck.x, posToCheck.y);
            if (seat === OccupiedSeat) {
                result++;
                break;
            } else if (seat === Outside || seat === EmptySeat) {
                break;
            } else {
                posToCheck = {
                    x: posToCheck.x + dx,
                    y: posToCheck.y + dy,
                }
            }
        }
    }
    return result;
}

function countNearbyOccupiedSeats(state: AreaState, x: number, y:number): number {
    return Number(getAt(state, x-1, y-1) === OccupiedSeat)
        + Number(getAt(state, x-1, y) === OccupiedSeat)
        + Number(getAt(state, x-1, y+1) === OccupiedSeat)
        + Number(getAt(state, x, y-1) === OccupiedSeat)
        + Number(getAt(state, x, y+1) === OccupiedSeat)
        + Number(getAt(state, x+1, y-1) === OccupiedSeat)
        + Number(getAt(state, x+1, y) === OccupiedSeat)
        + Number(getAt(state, x+1, y+1) === OccupiedSeat);
}

function nextAreaStateBasedOnVisibility(state: AreaState): AreaState {
    const result = new Array<string>(state.width * state.height);
    for (let y = 0; y < state.height; y++) {
        const line = new Array<number>();
        for (let x = 0; x < state.width; x++) {
            const seat = getAt(state, x, y);
            const nearbyOccupied = countVisibleOccupiedSeats(state, x, y);
            if (seat === EmptySeat && nearbyOccupied === 0) {
                result[y*state.width + x] = OccupiedSeat;
            } else if (seat === OccupiedSeat && nearbyOccupied >= 5) {
                result[y*state.width + x] = EmptySeat;
            } else {
                result[y*state.width + x] = seat;
            }
            line.push(nearbyOccupied);
        }
        // console.log(line.join(''))
    }
    return {
        ...state,
        areaState: result.join(''),
    };
}

function nextAreaState(state: AreaState): AreaState {
    const result = new Array<string>(state.width * state.height);
    for (let x = 0; x < state.width; x++) {
        for (let y = 0; y < state.height; y++) {
            const seat = getAt(state, x, y);
            const nearbyOccupied = countNearbyOccupiedSeats(state, x, y);
            if (seat === EmptySeat && nearbyOccupied === 0) {
                result[y*state.width + x] = OccupiedSeat;
            } else if (seat === OccupiedSeat && nearbyOccupied >= 4) {
                result[y*state.width + x] = EmptySeat;
            } else {
                result[y*state.width + x] = seat;
            }
        }
    }
    return {
        ...state,
        areaState: result.join(''),
    };
}

function parseArea(input: string): AreaState {
    const lines = input.split('\n');
    return {
        areaState: lines.join(''),
        height: lines.length,
        width: lines[0].length
    };
}