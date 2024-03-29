function getFinalTile(path: string): string {
    let x = 0, y = 0;
    const nw = path.match(/nw/g)?.length ?? 0;
    const ne = path.match(/ne/g)?.length ?? 0;
    const sw = path.match(/sw/g)?.length ?? 0;
    const se = path.match(/se/g)?.length ?? 0;
    x += ne + se - nw - sw;
    y += ne + nw - se - sw;
    const trimmed = path.replace(/(nw|ne|sw|se)/g, '');
    const e = trimmed.match(/e/g)?.length ?? 0;
    const w = trimmed.match(/w/g)?.length ?? 0;
    x += 2 * e - 2 * w;
    return `${x}_${y}`;
}

function initialBlackTiles(lines: string):Set<string> {
    return lines.split('\n').map(getFinalTile).reduce((set, tile) => {
        if(set.has(tile)) {
            set.delete(tile);
        } else {
            set.add(tile);
        }
        return set;
    }, new Set<string>());
}

function nextStep(blackTiles: Set<string>): Set<string> {
    const whiteTilesToProcess = new Set<string>();
    const result = new Set<string>();
    for (let blackTile of blackTiles.values()) {
        const {x, y} = parse(blackTile);
        const allNeighbors = neighbors(x, y);
        const blackNeighborTileCount = allNeighbors.filter(t => blackTiles.has(t)).length;
        if (blackNeighborTileCount === 1 || blackNeighborTileCount === 2) {
            result.add(blackTile);
        }

        allNeighbors.filter(t => !blackTiles.has(t)).forEach(t => whiteTilesToProcess.add(t));
    }

    for (let whiteTile of whiteTilesToProcess.values()) {
        const {x, y} = parse(whiteTile);
        const allNeighbors = neighbors(x, y);
        const blackNeighborTileCount = allNeighbors.filter(t => blackTiles.has(t)).length;
        if (blackNeighborTileCount === 2) {
            result.add(whiteTile);
        }
    }

    return result;
}

function parse(tile: string): {x: number, y: number} {
    const [xStr, yStr] = tile.split('_');
    return {x: +xStr, y: +yStr};
}

function neighbors(x: number, y: number): string[] {
    return [`${x-2}_${y}`, `${x+2}_${y}`, `${x+1}_${y+1}`, `${x+1}_${y-1}`, `${x-1}_${y+1}`, `${x-1}_${y-1}`];
}

const inputText = `enwwsenweswweseseswnenewwswseswenw
nwnwneswwnenwnwnwenenwwnesenenwsenenee
eneswwenwneeswneenenw
swwswswwwswswsweeswww
swewnwneeewnewwwswwnwwswswnwww
seswnwenesenwsenenwwenwsenwswnwseswnw
nwswwenwwwswwnwnewswnwnwwwswnee
seswseswseseseseeseseseswnwsesw
swswseswseswswnweneswswseswse
wenwswwswwwswwnwsesewwenwseswwne
nenewswsenenenenenwnenesewswnenenewe
eeneneswswnenwnenenwnwnwnwnwnwswenwnesw
nwsweneeeeweenenwneeseeesenesw
nwnewsesesesesesesewsweseenwsesesese
nenwneenenwneneneswsenenenenewnenwnenewse
wswnwseseneswswswenewswneswenw
wwswsewswswwwnewnwwswswewsewwnw
nwnwnwsenenwnwnwneenwwnwnwswwnwnwenwnw
seenweeswenwwseeeeeesweesese
neswwewnewwwnewseswwwwwnwseswnew
swseseesweenwswnwswswnwsesewseswene
nwsenenenwsenenenesenewneswwnenenenesenene
ewnenwneswsenenwnwsenewsenwwnenwnesesene
sesenenwswsesesweseseswnwsesenesenewe
wwenwnewewswwswwswwsewwenww
neweeseseswswwweenwnenwweeneenew
neseneseneneneneneswnenwswnewnenenenene
wswwwnwewwwnwneswswsewewwweww
swseseswwnwswswswnwnew
eseseesewnwseseseewseneseesesenwsw
swsweswswnesenwswsesw
seeeswnenweenewseeesweeenenewsw
swnwsewesewnenwswneweneswseenwsew
wsesweswnwswswnesweswwwswswswswsww
wseenwnwswneewnwswsweenenwnwswneew
seswnwseeeseseseseseswswneswseesenwsew
nwnwnenwnwwnwsenwenwneneneswnwnwnw
swseeseswswnwswsesesenwsesenwswnwnw
nwsewnwwnwwewwneswnwenenwseneswsw
wwsewswenwwwnweenwnwnenwswswwnw
wneeneeneeeeseenesewneneeswee
wnwenwswneneenwswnenesenwnenwwneswnwse
sewsenwseswsewewswneswnwneseseswseee
wnwwwswnwnwnwwsenwneww
swswnwweseeswneswswswswswnwswswswswswne
neeneneeeneeeswenwnenenwswneneswe
wneeseeeseeseswsenwweeeeseee
nenweesenesenewwwsweswnwnwweswne
senewseswsewswneseesenwsenenwsesenwsw
ewenwnwseeeenwesenwnewswwswe
nwnwnesesewnwnwnewneenwnwnwnwnwswnwne
enwwewnwnesenenenwnwnenenweneseswwswne
nwswnenwswnwwnwseswnwnwewnwwwnenew
wweeswweneseewnewwwewwewse
swseseswswseseneseswneswseswneswseswnwsw
wnwnwnesenwwnwnwnwwsewnwswnenwwnw
sewsenwswsenewneneewnwswwnesw
wswseneeswsenwsesenwwneswnenwewsesesene
nwnwnwwnwnwnwenwsenwwnwenwnww
esenweeswseseenwe
nwnenwwnwnwneweswswwnwsweesewsew
swwswseeseseneseseeswswwswnesesenwwswsw
seseesewseseeeswnwseseenwseesesenwsese
wwnwwwswwwwwnewww
swseenewseneneeeswswnwswsenwswenwsene
swwswwseewnwnenwwnewwnenwsewwnw
nwnwenwswnwnwnenwnwwnenwsenenenwnwwsenw
nwenwwnwnwnwnenwnwneswnwnwnwseenwnwnw
seswnenenewwneeneneesesewenwenwse
nenenenewwnenesee
senwwwwenwwnwwwnesenwnwsenwnwnwnw
senwneswwewwseswwnwswesewnenwwwww
nenenenenenwneneewneeneswneswsewene
swseneswswwswswnwswnewswseseseswswswswswne
wwenwewnwwnwnwnwwwwswneswsewnww
swnwnwwswswseswsenweneseswswswwswsee
wnwswsenwwwswsweswwswswswewwww
neeeswneeeeeeeeneeneeswwenesw
newwwnewwwnwnwsewnwswsew
enwswnwnesenewwneenenwnesw
eneewwneswnwneeneeswe
seseesesesesesesesenwsesenwesewswnenew
wseswswseswnesweswswswsw
seeeeeenweeeeweseenenenewwe
nwsenewsenweswsewwnwenwwenwse
nwwnwnwwnenwwswsewsenenwnwnwewwse
eeneeweeeeeenee
seswneneewswswswswswswswswneswwwwsw
senwnewnwnwenwnwnwnwnwnwnwnwnw
wwsenwnwwenwwwneewwnwswseneswe
nenenenenenwnenenesenewneneewnwseewsw
wsenwswswnwnwnwnwnenwwnwnwwnwneeenw
neeenwsewsesweeeenweneswenenwswwe
nwwnwenwwnwnenweswwenwesenwnwwnw
seneswnwwswwswwswwwwwnewswneswe
eeneeweweeeenee
wneseseweneseeewsesenesenwwwwnwse
swwnweseswneesesenewseseeswswnwwswne
swnwsenwsewseseseswnwseneseswswswswene
swwseswswseseneseswseswseswswneneswnwsw
sesesenweswswsweswsewseseseseswsw
seswnwewwwsewnwwnenwwnwwnwnwnwnw
enweewseeseenweneseseseenweeee
wwwwwwswwwwneswswsww
sweswnwnwsewswsewnwswwwwneseneesw
nwseswnwnenwsewnwenw
nwnesenewnesweenenenwneneneneenewsene
swswnwwswswseswenwswswwswswe
nenwnenwnwnwnwwnwenenwswnesewnenwnwe
swseeseswweswswswseneswswswswswswww
neswnwnenenwnwneneneneneeswnwnenenwneesw
nenwnwesewnwsenenenwnwswwnwnwnesene
seeeseswewnwneseseenwweeeseneesw
swswswnenwswnwneswseswesewnwseswsenwswsw
senesewseseseseseseeswesenwsewsenesese
nwnwnwwnwnwnwnwsenwnewnwnwww
neswneseeseneswwwnewswwwwwwswwsww
nweesesenwesesesenweeeseseeseswse
neneeneswneswneenesenwwnwsenwneswwnene
enewewswnwnweesweswseeeeeenwe
eswseeseneeseseseseeee
sesesewsesewseesenwsesesenwswesenweswse
nwnwswnesweenwswneseeseswneewnenenenwsw
nwseswswswseeewswswwenwne
swneewswnwswswswseswwseeeswswswneswwsw
eneneeseneewneneenenesenwnewnenene
nwsweseswswswswswswswsw
nwnenwnwwwnwseneswnwenwnwswswwweswnee
nenwnwwnwwesenwseswenenwwnesewnww
sesenwseeweeenweseeeeeenwesee
eeswwesewseseeeesewnw
nwenwnwenwnwnwnwswnwwnwewnwnwswswnw
neweswnwsweneneweneeneneswnenesenwsw
seseseswswsesenesewsesese
seeeeeewesenwenenwewsenwseee
eneneweewwneeneneesene
swnwnweeswswsweesenwsewseswswnwswsewse
neneseneswneneneneswneneswneneneenenwnee
nenewnenewwneneneneneeseneneneseneswse
nwswsweeeseeewwnwswnwswnwne
newwnwsewswwwnewwwsewwwewww
wwwwwnwwwwswwenwnwnwnwwesweew
nwneneneseneeeneswswneweseeeneene
enesesenwnwseseewneswswseesweseseene
wwnwenewwwnwnwnwsenwnwwwnenwnwsw
swwwewwweww
wnewwwseeesewsenwnwnwnwswnwewwnw
eswnwnesenwnwnwseseswnwswseseewswsew
swneneseswnenwnenwenenweswneenwnenwne
wwnewnewsewsww
nwwenwnwneseseewwwnesenwswswswnenw
seenwnwswwsenwseswwsewneswseseesee
eseeseeswseeseeesenenewese
eseseseseeseeseseswesesenenwnewesw
neeswnwswsweeewnweesweswnewnwene
newwnwnwneswwwenwwwsewwwsenww
nenwswnwnwnwswnwneseewswnwnwnee
sesewswwswwsewswnwnwnew
sweswswnwnwnweswswsesw
senesenweneneswsewnenwnenenenenenwenee
enwwnwswnwneenwnwnwnwswnwnwseswnw
newswnwnwswewneneneneswwwseneneesene
seswsesesewswneseseseseewswswsenwsese
newnwnenwnenenwsenwseneneneswnwnenwnene
nwnwnenwnwnwnwnwswnwnwnwwwewnweswnw
nwnenwnwnenenwnwwsenenenwnweswnene
nwwnenwnenenesenewseneneneswnwenwnwnenw
nwnwnwnenwnwwnwsenewnenwsenwnwnwnenwnwsw
swsenwswswswswneswswswsweswswswsewswnw
wwswwswsweswnwswwnwewwsewwwew
sewwnenwnwswwwnwwewnwwnwnenwneswnw
ewneeenweneeseeeswenw
nwnwneeswneseewneneneseeeeee
wsweswewswwnewswnwwwnwnwswwesewe
enwnwnwsenwnwnenwneswnwsenenwneswnwnwnw
nenesenewnenwswnewwsesewswsenewsww
wnenenenenenenenenenenenesenwnesesewnene
wswnwwwwnwnwewnwsew
nesenwwswseenwseswnesesesenweseseseese
nwewnenenwswsenwnewnwneneesenwnwwnwnwne
nwnwnwwnwneneswenenwnwnwsenwneswneeswne
seseseseeeseswnwsenwswneseeeewsese
sewnenweswneeswenesenwenwwswwneswnw
wsesesesewsesesesesesesenwseseeeew
seseeeesesesweewewwesewwnew
nwnwswswenwnenenenwnwnenwnwweneswnenwe
neeneneenwneneneneesweswneseneneew
weewwwwwnewwwwwsewewswnw
swseseenweeeeeeee
seseseeseseseneseseeswseee
nwewnwneenenenwnwnwwswsewnwsenenwne
nenwnesenewnenenenenenenenesenenw
seeesweenwsesese
nenwnenwsesenenenenenwwnene
eseneseswnwsewesesenwseseeeeswsese
swseseesweseneswneesesesenwsee
swnenewwswwwwwnwwewnewswwsesw
eswnwsesenwsesenwenwnesesesweswwnwnenw
nesenwneseseswswseseswswseweswneswswsese
eseswsewnwnewenwseneeeseenesw
eneeeneeneweneewneneeneewsee
sewesesewseswseseseseseswnesenwneseswsw
eneesenwneeseenenwwseneeneeee
neweneswnenweeneeseeneewnesenenwe
wsesewswwwwnwenweswnwneneswnww
eswnwenwwweswwsewswswnwsenwwsww
wnewnwwsenenwnwnwnwnesenenwsesewnene
seswnwwwseneswnenewwnwesesewne
eenwesweweeneeeeweeee
neneenewswwseenenwnenenwnwnesenenenene
nwsenwnwsesenwseseseeseswseseseseseswsese
sesenwseswewswswsenweswnwswswseenesese
swsewswsenwswwnwsweenwnwseseseeswwe
seeseswswneseseswwsesenwswsesesenesese
sweneswnenwswswseswseswswseewnwnenwesw
wswseswwnewwwswswswswsewswswnwwenw
seneenweswnwswneeseseeswsesenwesesee
wwenwsewwwwwww
swseswswwseseseseeswsw
wswneneswswnwwseswwwswswewwsewesw
esesweeeesenenenwnwnew
sesesenweseseeseseseeesee
esewseseseseswsesenesewsewswsesesee
swwswwwswwnwwswwsenewneswswsenwwe
seseswsesesesesewsesenesenesesenwseswsenw
senwwwwenwseneswseneewnwnwenewww
seswsenwsweseswseseneeseeseenwseww
seseswwneneswswwwswnwneswswswsewnwswwsw
eweewneeenewwseewewseene
neeneswnenenenenenene
wnenwwwwnenwswwwswsenwwenwweww
wnenwnenenesweeneneenenenwneenwsese
neewsenenesesenweseseswsweswne
neneeneneeeeneesw
eseneswseenwswneesweseeseeesenwnwee
wwsesenwneswneseseneswnwseseneseswsene
wewsenwewwwnwwwwwwwwesene
wsewnwnwwseeswwsw
swwswwswswswwswsweswwsw
eeeseeneswnwseseneseenwesweswnwswswne
eseswwsenenesesewsesesesesese
eseeswesesesesewseenwsesewnwsesesese
newwwwwsewswnwnwneseswwnwswwwwne
nwesenwnwwswwweweewwwneswwsw
eeeeeeeeeweese
eeneewweswweeneenwseseseeswnenw
swewswwwwnwsweswswswneewseswwww
swwswwsweswwswwnesw
seeseseneesewseseswnwswsesweseneseese
swswswewneseseseseseswnwswnesesesenwse
weseeeeeeeee
swswsewseseeswsesw
seseseswnweneswsenenenwwwswswsenweeese
swnenwneswenwnwsenwenenenenenenewswnene
nenewwwwwswweswewewnwwsewnwse
senwewswswnwenwswseneeswswse
eseeeweweeeeenwsweneeeneseee
enwseeeseeneeweseeseeeeswenwe
nwnwsenwnwnwnwsenwnw
swswwswswweewwwsww
seeeeeeewsee
ewwwnwwnwwsenesewneswswswswswseew
nesenwwnwnwseswswnwneswnwnwnwnwnwwnenw
nenwsweseswseewneswwseeenwnenese
wswswswswswswswwswnese
swnenwswswnwswnesenwnwseewseneseenwnene
nwsesenesenwnwswesenwnenenesewwnwnwnw
nenwswswwewnwseswwwswneewnewese
enenenenewwneneesesenenewenenenesew
nwnwsenwsenwnenwnesenenenwwesenwwsenesww
nwsenwswswsesesenesewswsesesesesesenene
eeneweenwenwenwsesesweseeswsenw
seseseswswswswswnwwesweswneswnw
seseswsesesenwseswswsee
nwwnwnewwwwwwwewsewnwswnww
seswnewswnwseneseneswseseeswswsenesewse
sewswneswnwswswswswneweswswswswswswswsw
wenesenenenwnwnwnew
nenwnwnwnwnwwweswwenwnwnwnwswnw
seneneswneneneswnwsenwnesenw
wswswnwsweswnwsesewsenwnenewsewsene
eswnwseeseewseenwe
neenwsweswnenewsenwnwswne
wnwewnwwnwswwnwwseewsenwnesenwnw
nwneneenewsesweseneeneneewsenwnenene
sesewsesenewswseseenwseneswswsesesese
wwwsewwnwwnesenwwnwnesewwwnwnww
seseseseswnewseswnewne
neswsweneeneneeneswenwnenenewneenene
wsesesesesesesenwseeseseeseseneswwne
swwenwnwnwenwsenwwwne
swnenenenenenewnenenwneesenwswnenenenene
wswneseneswenewswswnwswneewenwweswe
nenewseenwsenesenwswwsewwnwewsewnw
wseeseeweneswsenweseneesenenwswwsw
neswswneswsewwswwsewsweeneswwnwsw
sesenwswnwseswseeswswseswneseseseswwswsw
seswneseneswwnwnwnesenwseenw
eesesewsewnwnenenenwnweseswwwnee
wneenewnenenwneneseneesenesenwwwsenese
seseseseseeweseswsesewseseesesenwe
nwenwwenwnwnwwnenwnwnwsenw
eseeeneeseneswewseseeesesenweesw
swsewswswnwsewnene
nwnenwneswnwnwnenenenwnwnenenw
eeeseeewseeeseeesee
swnenwswnwnwnenwnenwnwnwnwnwenwnwenwnesw
eeseseeswwneeeesesesesesenewsee
swnenenenesenenwnesenenwnenesenenenenewne
neewwwwewwesewwswwnwwwne
nwsewnwwswwnwwwwswneneswneswnwnwnew
wswswseeneswwwwsweswswswwnenwesw
nwswewnwsenwswnenweewnwnwenwsw
seeenwweseeeeenenweeesenw
swnwwswswswswwswswneswswneesw
sweseneneswwswswewswwwnenwseneswnese
eneenwewseeeeesenwseeeseseswsee
nwnewnwnwsenwnwwneesenwnwnenewnw
newswswwswwsewsewwnene
eneseswenewwneseneneneneswneneneswnene
nweneeseneeeesesweeneeenwewnee
seswsewnesenenwnenwswwwwnweweswnw
nwneseneswswseseseswnewneswseseseesene
eeewseswweswenwesenwsewswswnenwne
nwnwnwnwwnewnwswnwnwsenwnwnwnewenwnw
seseswswsweswwseswswsweswwsesesenwnesw
neeswnwswswswseswswwneswswswseseswswsesw
swswseeneswswswwswswswnwnwseswenwew
swswswseswsweswswewswnwseseswswswnwnee
nwwwnwnenwneneeeenwswnenw
senenwswnwneewsewswwweneeeeesesw
nwswenwsweseneesesewnwwnwseweenenese
swesenwseeneseeseswswseswseeseenwnwse
wneseweweneneswsenwnenenenenwnenwnew
swswswswswswswswnwswwwwswse
neeseseenwsweneneeesenwweewwew
swswswsweeswewnwwewsweswnenwswswnw
enwwneneswnenenwnwnenenenwwneenenenese
nwwwenwwenwwwnwnwnwnwseswnwwnww
sweswwwsweweswswweswwnwswswnenwese
neseseseseseseseseseseseswsese
nwsesenwneseseseseswseese
swneswnwwwwenwwwe
nwnwnwnwnewnwwwnwnwnenenwsenwsesenwnww
nwwswneseseswsenweswswswneswwswwswswsw
neenwsenenenenenenwswswnenenwsenenene
newnwnwnwnwwnweswwewsewenwwnwnwnwnw`;

let blackTiles = initialBlackTiles(inputText);

console.log(`initialBlackTilesCount: ${initialBlackTiles(inputText).size}`);

for (let i = 0; i < 100; i++) {
    blackTiles = nextStep(blackTiles);
    console.log(`day ${i + 1}: ${blackTiles.size}`);
}

console.log(`after 100 steps: ${blackTiles.size}`);