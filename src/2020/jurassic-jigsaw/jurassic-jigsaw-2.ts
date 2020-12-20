type Border = {
    top: string;
    right: string;
    bottom: string;
    left: string;
}
type Tile = {
    id: number;
    border: Border;
    image: string[];
}

export function calculateWaterRoughnessByImage(input: string) {
    const inputTiles = parseInput(input);
    const variations = buildAllTileVariations(inputTiles);
    const size = Math.sqrt(inputTiles.length);
    const field: Tile[][] = [];
    for (let i = 0; i < size; i++) {
        field.push([]);
        for (let j = 0; j < size; j++) {
            if (i === 0 && j === 0) {
                field[i][j] = findTopLeftTile(variations);
            } else if (i === 0) {
                const tileToTheLeft = field[i][j - 1];
                const neighbors = variations.filter(t => t.id !== tileToTheLeft.id && t.border.left === tileToTheLeft.border.right);
                if (neighbors.length !== 1) {
                    throw 'multiple possible neighbors';
                }
                field[i][j] = neighbors[0];
            } else {
                const tileToTheTop = field[i - 1][j];
                const neighbors = variations.filter(t => t.id !== tileToTheTop.id && t.border.top === tileToTheTop.border.bottom);
                if (neighbors.length !== 1) {
                    throw 'multiple possible neighbors';
                }
                field[i][j] = neighbors[0];
            }
        }
    }

    const imagePartSize = field[0][0].image.length;
    const assebledImage: string[] = [];
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < imagePartSize; j++) {
            let line = field[i].map(tile => tile.image[j]).reduce((sum, line) => `${sum}${line}`, '');
            assebledImage.push(line);
        }
    }

    const allAssembledImageVariations = getAllImageVariations(assebledImage);
    // allAssembledImageVariations.forEach(printImage);

    const allAssembledImageVariationsWithMonster = allAssembledImageVariations.map(highlightMonstersOnImage);
    // allAssembledImageVariationsWithMonster.forEach(printImage);

    const roughnessPerImage = allAssembledImageVariationsWithMonster.map(calculateWaterRoughness);
    const minRoughness = roughnessPerImage.sort((a, b) => a - b)[0];
    return minRoughness;
}

function calculateWaterRoughness(image: string[]): number {
    return image.reduce((sum, line) => sum + line.split('').filter(c => c === '#').length, 0);
}

function highlightMonstersOnImage(image: string[]): string[] {
    const pointsToHighlight = new Set<string>();
    const imageSize = image.length;
    for (let i = 0; i < imageSize - 2; i++) {
        for (let j = 18; j < imageSize - 1; j++) {
            if (image[i][j] === '#') {
                const otherPatternPoints = allLowerMonsterPatternPoints(i, j);
                if (!otherPatternPoints.some(({iMonster, jMonster}) => image[iMonster][jMonster] === '.')) {
                    pointsToHighlight.add(`${i}_${j}`);
                    otherPatternPoints.forEach(({iMonster, jMonster}) => pointsToHighlight.add(`${iMonster}_${jMonster}`));
                }
            }
        }
    }

    const newImage: string[] = [];
    for (let i = 0; i < imageSize; i++) {
        const line = new Array<string>();
        for (let j = 0; j < imageSize; j++) {
            if (pointsToHighlight.has(`${i}_${j}`)) {
                line.push('O');
            } else {
                line.push(image[i][j]);
            }
        }
        newImage.push(line.join(''));
    }

    return newImage;
}

function allLowerMonsterPatternPoints(i: number, j: number): {iMonster: number, jMonster: number}[] {
    return [
        {iMonster: i+1, jMonster: j+1},
        {iMonster: i+1, jMonster: j},
        {iMonster: i+1, jMonster: j-1},
        {iMonster: i+1, jMonster: j-6},
        {iMonster: i+1, jMonster: j-7},
        {iMonster: i+1, jMonster: j-12},
        {iMonster: i+1, jMonster: j-13},
        {iMonster: i+1, jMonster: j-18},
        {iMonster: i+2, jMonster: j-2},
        {iMonster: i+2, jMonster: j-5},
        {iMonster: i+2, jMonster: j-8},
        {iMonster: i+2, jMonster: j-11},
        {iMonster: i+2, jMonster: j-14},
        {iMonster: i+2, jMonster: j-17},
    ]
}

function printImage(image: string[]) {
    for(let line of image) {
        console.log(line);
    }
    console.log();
    console.log();
}

function findTopLeftTile(tiles: Tile[]): Tile {
    for (let tile of tiles) {
        const topNeighborExists = tiles.some(t => t.id !== tile.id && tile.border.top === t.border.bottom);
        const leftNeighborExists = tiles.some(t => t.id !== tile.id && tile.border.left === t.border.right);
        if (!topNeighborExists && !leftNeighborExists) {
            return tile;
        }
    }
    throw `can't find top left tile`;
}

function buildAllTileVariations(tiles: Tile[]): Tile[] {
    const variations = tiles.map(getAllVariations).reduce((res, arr) => [...res, ...arr], []);
    return variations;
}

function getAllVariations(tile: Tile): Tile[] {
    const flipped = flipTile(tile);
    const r1 = rotateTile(tile);
    const r2 = rotateTile(r1);
    const r3 = rotateTile(r2);

    const f1 = rotateTile(flipped);
    const f2 = rotateTile(f1);
    const f3 = rotateTile(f2);

    return [tile, r1, r2, r3, flipped, f1, f2, f3];
}

function getAllImageVariations(image: string[]): string[][] {
    const flipped = flipImage(image);
    const r1 = rotateImage(image);
    const r2 = rotateImage(r1);
    const r3 = rotateImage(r2);

    const f1 = rotateImage(flipped);
    const f2 = rotateImage(f1);
    const f3 = rotateImage(f2);

    return [image, r1, r2, r3, flipped, f1, f2, f3];
}

function rotateTile(tile: Tile): Tile {
    const newTopBorder = reverse(tile.border.left);
    const newRightBorder = tile.border.top;
    const newBottomBorder = reverse(tile.border.right);
    const newLeftBorder = tile.border.bottom;

    const newImage = rotateImage(tile.image);

    return {
        border: {
            top: newTopBorder,
            right: newRightBorder,
            bottom: newBottomBorder,
            left: newLeftBorder,
        },
        id: tile.id,
        image: newImage
    };
}

function rotateImage(image: string[]): string[] {
    const newImage = new Array<string>();
    for (let i = 0; i < image[0].length; i++) {
        const newLine = image.map(l => l[i]).reverse().join('');
        newImage.push(newLine);
    }
    return newImage;
}

function flipTile(tile: Tile): Tile {
    const newTopBorder = reverse(tile.border.top);
    const newRightBorder = tile.border.left;
    const newBottomBorder = reverse(tile.border.bottom);
    const newLeftBorder = tile.border.right;

    const newImage = flipImage(tile.image);

    return {
        border: {
            top: newTopBorder,
            right: newRightBorder,
            bottom: newBottomBorder,
            left: newLeftBorder,
        },
        id: tile.id,
        image: newImage
    };
}

function flipImage(image: string[]): string[] {
    const newImage = new Array<string>();
    for (let line of image) {
        newImage.push(reverse(line));
    }
    return newImage;
}

function parseInput(input: string): Tile[] {
    const tiles = input.split('\n\n').map(parseTile);
    return tiles;
}

function parseTile(tileStr: string): Tile {
    const [idStr, tile] = tileStr.split(':\n');
    const id = +idStr.substr(5);

    let top: string = "", bottom: string = "";
    let left: string[] = [], right: string[] = [];
    const imageLines = new Array<string>();

    const lines = tile.split('\n');
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (i === 0) {
            top = line;
        } else if (i === lines.length - 1) {
            bottom = line;
        } else {
            imageLines.push(line.substr(1, line.length - 2));
        }
        left.push(line[0]);
        right.push(line[line.length - 1]);
    }
    return {
        id,
        border: {
            top: top,
            bottom: bottom,
            left: left.join(''),
            right: right.join('')
        },
        image: imageLines
    }
}

function reverse(str: string): string {
    return str.split('').reverse().join('');
}