const deck1=[25, 37, 35, 16, 9, 26, 17, 5, 47, 32, 11, 43, 40, 15, 7, 19, 36, 20, 50, 3, 21, 34, 44, 18, 22];

const deck2=[12, 1, 27, 41, 4, 39, 13, 29, 38, 2, 33, 28, 10, 6, 24, 31, 42, 8, 23, 45, 46, 48, 49, 30, 14];

let i = 0;
let lastWinningDeck: number[] = [];
while(deck1.length > 0 && deck2.length > 0) {
    const {loserDeck, winnerDeck} = deck1[0] > deck2[0]
        ? {loserDeck: deck2, winnerDeck: deck1}
        : {loserDeck: deck1, winnerDeck: deck2};
    winnerDeck.push(winnerDeck[0]);
    winnerDeck.push(loserDeck[0]);
    winnerDeck.shift();
    loserDeck.shift();

    lastWinningDeck = winnerDeck;
    i++;
}

console.log(i);

const result = lastWinningDeck.map((v, i) => (lastWinningDeck.length - i)*v).reduce((a,b) => a + b, 0);
console.log(result);
