type GameState = {
    lastTurn: number;
    lastNumber: number;
    allNumbersAndTheirTurns: Map<number, number[]>
};

export function getNthNumber(input: number[], n: number) {
    const map = new Map<number, number[]>();
    input.forEach((n, i) => map.set(n, [i+1]));
    const state: GameState = {
        lastTurn: input.length,
        lastNumber: input[input.length - 1],
        allNumbersAndTheirTurns: map
    };
    while(state.lastTurn < n) {
        modifyGameState(state);
        if (state.lastTurn % 100000 === 0) {
            console.log(state.lastTurn);
        }
    }
    return state.lastNumber;
}

function modifyGameState(state: GameState): void {
    const {allNumbersAndTheirTurns, lastNumber, lastTurn} = state;
    const thisTurn = lastTurn + 1;
    const turnsWithLastNumber = allNumbersAndTheirTurns.get(lastNumber);
    let numberToAdd = 0;
    if (!turnsWithLastNumber) {
        throw 'shit happens exception';
    }
    if (turnsWithLastNumber.length > 1) {
        numberToAdd = turnsWithLastNumber[0] - turnsWithLastNumber[1];
    }

    const turnsWithNewNumber = allNumbersAndTheirTurns.get(numberToAdd);
    if (!!turnsWithNewNumber) {
        allNumbersAndTheirTurns.set(numberToAdd, [thisTurn, turnsWithNewNumber[0]])
    } else {
        allNumbersAndTheirTurns.set(numberToAdd, [thisTurn]);
    }
    state.lastNumber = numberToAdd;
    state.lastTurn += 1;
}