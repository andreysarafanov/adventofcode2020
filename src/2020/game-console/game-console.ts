type Operation = 
    {type: "nop", param: number, offset: 1} |
    {type: "acc", offset: 1, accDelta: number} |
    {type: "jmp", offset: number};

type GameState = {
    operations: Operation[];
    currentOffset: number;
    visitedOperations: Map<number,number>;
    accumulator: number;
}

export function fixOperationsAndGetAccumulator(input: string): number | "fail" {
    const baseOperations = parseOperations(input);
    for (let i = 0; i < baseOperations.length; i++) {
        const currentOp = baseOperations[i];
        if (currentOp.type === 'acc') {
            continue;
        }
        let newOp: Operation = currentOp;
        if (currentOp.type === 'nop') {
            newOp = {
                type: 'jmp',
                offset: currentOp.param
            };
        } else if (currentOp.type === 'jmp') {
            newOp = {
                type: 'nop',
                offset: 1,
                param: currentOp.offset
            };
        }
        const newOperations: Operation[] = [...baseOperations.slice(0, i), newOp, ...baseOperations.slice(i+1)];
        const thisResult = getFinalAccumulatorOrFail(newOperations);
        if (thisResult !== "fail") {
            return thisResult;
        }
    }
    return "fail";
}

function getFinalAccumulatorOrFail(operations: Operation[]): number|"fail" {
    let state: GameState = {
        accumulator: 0,
        currentOffset: 0,
        operations,
        visitedOperations: new Map<number, number>()
    };

    while (true) {
        if (state.visitedOperations.get(state.currentOffset) || state.currentOffset < 0 || state.currentOffset > operations.length) {
            return "fail";
        }
        if (state.currentOffset === operations.length) {
            return state.accumulator;
        }
        state = nextGameState(state);
    }
}

export function executeUntilOpIsExecutedTwice(input: string): number {
    const operations = parseOperations(input);
    let state: GameState = {
        accumulator: 0,
        currentOffset: 0,
        operations,
        visitedOperations: new Map<number, number>()
    };

    while (!state.visitedOperations.get(state.currentOffset)) {
        state = nextGameState(state);
    }

    return state.accumulator;
}

function nextGameState(state: GameState): GameState {
    const {accumulator, currentOffset, operations, visitedOperations} = state;
    const op = operations[currentOffset];
    let newAcc = accumulator;
    if (op.type === 'acc') {
        newAcc += op.accDelta;
    }
    const newOffset = currentOffset + op.offset;
    const newVisitedOperations = new Map(visitedOperations).set(currentOffset, (visitedOperations.get(currentOffset) || 0) + 1);
    return ({
        accumulator: newAcc,
        currentOffset: newOffset,
        operations: operations,
        visitedOperations: newVisitedOperations
    })
}

function parseOperations(input: string): Operation[] {
    return input.split('\n').map(parseOperation);
}

function parseOperation(input: string): Operation {
    const [op, param] = input.split(' ');
    if (op === 'nop') return {type: "nop", param: +param, offset: 1};
    if (op === 'acc') return {type: "acc", offset: 1, accDelta: +param};
    if (op === 'jmp') return {type: "jmp", offset: +param};
    throw "unknown operation";
}