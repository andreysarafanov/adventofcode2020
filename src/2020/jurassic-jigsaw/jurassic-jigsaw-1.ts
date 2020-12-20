export function getNonPassingBorderCounts(input: string) {
    const bordersById = parseInput(input);
    let result = new Array<{id: number, value: number, matchesByBorder: number[]}>()
    for (let [idStr, borders] of Object.entries(bordersById)) {
        const id = +idStr;
        const resultLine = {id, value: 0, matchesByBorder: new Array<number>()};
        for (let border of borders) {
            const matches = Object.entries(bordersById).filter(([key, values]) => {
                return key !== idStr && (values.indexOf(border) !== -1 || values.indexOf(reverse(border))) !== -1
            }).length;
            if (matches === 0) {
                resultLine.value += 1;
            }
            resultLine.matchesByBorder.push(matches);

        }
        result.push(resultLine);
    }
    result = result.sort((a, b) => a.value - b.value);
    return result;
}

function reverse(str: string): string {
    return str.split('').reverse().join('');
}

function parseInput(input: string): {[id: number]: string[]} {
    const result:{[id: number]: string[]} = {};
    const tiles = input.split('\n\n').map(parseTile);
    tiles.forEach(t => result[t.id] = t.borderLines);
    return result;
}

function parseTile(tileStr: string): {id: number, borderLines: string[]} {
    const [idStr, tile] = tileStr.split(':\n');
    const id = +idStr.substr(5);

    const borderLines = new Array<string>();
    const lines = tile.split('\n');
    borderLines.push(lines[0]);
    borderLines.push(lines[lines.length - 1]);

    const leftLine = new Array<string>();
    const rightLine = new Array<string>();
    for (let line of lines) {
        leftLine.push(line[0]);
        rightLine.push(line[line.length - 1]);
    }
    borderLines.push(leftLine.join(''));
    borderLines.push(rightLine.join(''));
    return {id, borderLines};
}