const initialDeck1=[25, 37, 35, 16, 9, 26, 17, 5, 47, 32, 11, 43, 40, 15, 7, 19, 36, 20, 50, 3, 21, 34, 44, 18, 22];

const initialDeck2=[12, 1, 27, 41, 4, 39, 13, 29, 38, 2, 33, 28, 10, 6, 24, 31, 42, 8, 23, 45, 46, 48, 49, 30, 14];

const {finalSum, wonBy} = solveGame({
    deck1: [...initialDeck1],
    deck2: [...initialDeck2],
    alreadySeenCombinations: new Set<string>(),
    wasRecursive: false
});

console.log(finalSum);

type WonBy = "player1" | "player2"
type Game = {
    deck1: number[],
    deck2: number[],
    alreadySeenCombinations: Set<string>,
    wasRecursive: boolean
};

function solveGame(game: Game): {wonBy: WonBy, finalSum: number} {
    while (true) {
        if (game.wasRecursive) {
            return {wonBy: "player1", finalSum: calculateSum(game.deck1)};
        } else if (game.deck1.length === 0) {
            return {wonBy: "player2", finalSum: calculateSum(game.deck2)};
        } else if (game.deck2.length === 0) {
            return {wonBy: "player1", finalSum: calculateSum(game.deck1)};
        }
        nextGameState(game);
    }
}

function nextGameState(game: Game): void {
    const {deck1, deck2} = game;
    const gameState = `${deck1.join(',')}|${deck2.join(',')}}`;
    if (game.alreadySeenCombinations.has(gameState)) {
        game.wasRecursive = true;
    } else {
        game.alreadySeenCombinations.add(gameState);
    }

    let wonBy: WonBy;

    if (deck1.length - 1 < deck1[0] || deck2.length - 1 < deck2[0]) {
        wonBy = deck1[0] > deck2[0] ? "player1" : "player2";
    } else {
        const nestedGame: Game = {
            deck1: deck1.slice(1, deck1[0] + 1),
            deck2: deck2.slice(1, deck2[0] + 1),
            alreadySeenCombinations: new Set<string>(),
            wasRecursive: false
        };
        const gameResult = solveGame(nestedGame);
        wonBy = gameResult.wonBy;
    }

    const {loserDeck, winnerDeck} = wonBy === "player1"
            ? {loserDeck: deck2, winnerDeck: deck1}
            : {loserDeck: deck1, winnerDeck: deck2};
        winnerDeck.push(winnerDeck[0]);
        winnerDeck.push(loserDeck[0]);
        winnerDeck.shift();
        loserDeck.shift();
}

function calculateSum(deck: number[]): number {
    return deck.map((v, i) => (deck.length - i)*v).reduce((a,b) => a + b, 0);
}