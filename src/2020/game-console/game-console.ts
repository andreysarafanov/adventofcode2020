type Operation = 
    {type: "nop", offset: 1} |
    {type: "acc", offset: 1, accDelta: number} |
    {type: "jmp", offset: number};

type GameState = {
    operations: Operation[];
    currentOffset: number;
    visitedOperations: Map<number,number>;
    accumulator: number;
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
    if (op === 'nop') return {type: "nop", offset: 1};
    if (op === 'acc') return {type: "acc", offset: 1, accDelta: +param};
    if (op === 'jmp') return {type: "jmp", offset: +param};
    throw "unknown operation";
}