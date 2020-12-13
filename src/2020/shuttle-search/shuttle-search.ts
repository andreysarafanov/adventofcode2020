export function getNearestBusIdMultipliedByMinutesToWait(input: string): number {
    const [line1, line2] = input.split('\n');
    const busIds = line2.split(',').filter(id => id !== "x").map(id => +id);
    const initialWait = +line1;
    let delta = 0;
    while(true) {
        delta++;
        for (let id of busIds) {
            if ((initialWait + delta) % id === 0) {
                return delta * id;
            }
        }
    }
}