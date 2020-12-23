type State = {numbers: number[], current: number};
function nextState(state: State): State {
    const {current, numbers} = state;
    const currentIndex = numbers.indexOf(current);

    console.log(`cups: ${numbers.map((v, i) => i === currentIndex ? `(${v})` : `${v}`).join(' ')}`);

    const toRemove = [
        numbers[(currentIndex + 1) % numbers.length],
        numbers[(currentIndex + 2) % numbers.length],
        numbers[(currentIndex + 3) % numbers.length]
    ];

    console.log(`pick up: ${toRemove.join(' ')}`);
    let result = [...numbers];
    result = result.filter(v => toRemove.indexOf(v) === -1);

    let possibleDestinations = [
        current - 1 <= 0 ? numbers.length + current - 1 : current - 1,
        current - 2 <= 0 ? numbers.length + current - 2 : current - 2,
        current - 3 <= 0 ? numbers.length + current - 3 : current - 3,
        current - 4 <= 0 ? numbers.length + current - 4 : current - 4,
    ];
    const destination = possibleDestinations.filter(d => toRemove.indexOf(d) === -1)[0];

    console.log(`destination: ${destination}`);

    const indexOfDestination = result.indexOf(destination);
    result.splice(indexOfDestination + 1, 0, ...toRemove);

    const newIndexOfCurrent = result.indexOf(current);
    const indexOfNewCurrent = (newIndexOfCurrent + 1) % result.length;
    return {
        current: result[indexOfNewCurrent],
        numbers: result
    };
}

let state: State = {
    current: 3,
    numbers: [3,2,6,5,1,9,4,7,8]
};

for (let i = 0; i < 100; i++) {
    state = nextState(state);
}

console.log(JSON.stringify(state));