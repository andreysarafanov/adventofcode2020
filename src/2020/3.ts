import { calculateTreeEncounters, Step } from "./toboggan-trajectory/tree-encounters";

const input = `......#..##..#...#...#.###.....
#..#............#..........#...
..........#....#..........#....
....#..#.#..........#..#.....#.
#.......#...#......#........###
#####........#.#....##..##..#..
......#.#..#..#..##.#..#.##....
.#..#.#..............##....##..
..##......#....#........#...###
...#....#.#....#.#..#......#..#
..................#.....#.....#
#.#...#...#....#............#.#
.#...#.....#...##........#.....
...#....#........#..#....#..###
#...##.....##.#.#...........#.#
.###........#.#.#.........#....
...#.............###.....#.#..#
.####.#..#....#.....#.........#
.#.#........#.#.....#.....#....
.#.......#................##.##
...#.#..#...###.....#....#..##.
...#....##..#............##...#
#...#............######...#.##.
.........#........#.#...#..##..
.....###..#.#.....##.#.#......#
..#.#...#.#..#.#.##..#.....#.#.
..#......#.#....#...#..........
..#...#.....#.#...##.....#.....
.##...........####........##...
....#............#.#...........
.....####.........#.##....###..
#..#..#.#..............#.#.....
...#.#........#.........#......
......#.#.#...#.....#....#.....
........#.#...#####..#..#......
.....#.#....#....#...........##
.#...#.........#.......##......
.#.##..##......#...............
...#.....#.......#.#.#.........
.........#..#...#...#.#.##....#
.#......##....#..#.........#...
....#.....#........#.........##
......#...........##...........
.....#..............###.#....#.
........#..#...#..#..#..#..#.#.
.#.....#.##.#..#..#.#.....#....
...#....#...#.#.....##.#...#..#
#..#......#..#.###...........#.
.##...##.#........#.#......#.#.
...#.#..#.#.......#..###...##..
#.......#.#....#..........#....
.#.....#..#.#.#..#..#........#.
.#...#......#.#...#.##.....#.##
...######..#.#....#.........##.
#.#.......................#....
..#..##...#...#.#..##.......#..
.##..#.......##......##.#..#...
#.#....##.......#..#...........
..#...#............#..#........
........#.#.........#...#..#..#
.#...###...............##...#..
...........#.....#....#....###.
#..#....##..#................##
...#.#..#..##......#....##....#
...#.##...#....#..#....#.......
#...##..##.#.........#...#....#
.##........###.#..........#....
..#..#..#...#.##..#.#......#...
.......##..#....###.##.....#..#
#....#...#.#.....#..###....##..
.#.......#.........#....#.#..#.
.........#.......#.#.......#...
..........#...##..#...#....#.##
..#........#.......#...........
#....#.....##......#....#.#...#
......#.....#....#.....#..#....
.#....##...#...##..............
..#....#......#...#....#...#...
#....###...##..#.#....##......#
..#.......#.........#..#......#
...#...#.##.......#....##..#...
..#.#...#.##..#..#..#...#.#...#
.#.........###....#....#.....#.
.#.##.#..##..#...........#....#
....##..#..##.#.......#....#..#
....#..#.........##..#......#.#
..........#.#.#....##.#......##
.##...#....###...#..........#..
#..#.....#..#.#.#.#..#......#.#
......#....#......##.#......#.#
...#.....#.......#....#.......#
.#.#................#..........
......#..#..#...............##.
##......#...#.####....#.#.#....
...#..##............#....#.....
..#..#.#...#..................#
.##.#.#..##.###.....#..#.......
..#...#.#...#......#..#........
.###..........##...###..##..#..
#.#...#........#.......##......
..##...#........#....##...##...
.......#.##.....#.#.##..#..##..
........#............#....##...
...#.#.#..#.........#.#.......#
..#..##.##...#.##...#....#...#.
.....##.#...##............##...
.#...#.###....#.......#...#...#
.......#######.#....#.....#.#..
......#.......#............##..
.....#...........#......#.....#
........#....#.##.#............
.#........#.......##.#.#....#..
#.....#..####.#................
.....#.......................##
.#.....#..##.#..##........#.#.#
#...##....#..##................
......##.###..........#.....#..
.#........#...#..............##
..#..........###.........#.....
....#.....##....#..#..#.#.#....
....#.......#.##...#.####.#....
#........#............#.##.....
..#......##.....#..#...#.......
..#......###...#.##......#..#..
#..#..#............#..#.###....
...##.........#..##...#..#.#...
..#.###..#.##.#........#..#....
......#..###.#........#........
.#....#.#..#.....#..#..#.......
#.....##.##...#...###.#.#..#.#.
.#....#..#.........#..#....###.
......##.####...#....#........#
##..#........#..#..##...#......
#.........#.........#...#..#.#.
..........#...................#
###....#....#....#......###...#
#....##........#..###.#..#.....
.#......#.....#.#.........#..#.
...#.......##.....#.........###
..............#........#.....##
....#.#..#.....###.#....##.....
.........#..##.#....#.#........
...#....#.......#.#.#..#.#....#
...........#...#..........#.#..
#.................##........###
####..#.#..#...#.....###.......
..#.#......##.#.......#........
.......##........#..#.....#..#.
...#..#......#..#.#.......###..
#....#...##..#.#.#.#.........#.
....#....#....#.#..#..........#
...###........#.#.###......##..
................#.....#.#...##.
..#..#.###...........#...###.#.
.........................#..#.#
#...#..#..##.###.....##.##.#...
...#..................#.#....#.
......#..##.#.......#.......#..
.##....#.#................#....
.#...#..#.#.#....##....#.......
.##......#.....#..........#....
..#...........#..##.........#..
....#.#...........#..........##
....#.#.#...........#.#........
......#.....#..#....##....##...
............##...##......#.#.##
#.#.....#..#....#..#...#.#...#.
.#...###..#..#.......#.......#.
.....#..#.##.....#....#...#....
##.....#..##.......##..#.#.#..#
....#.#......##....#.....#..###
.#...#.#......#.##...#..##.....
.#...#...#......##..#..#...#.#.
.#.........#....##...###...##..
###.....#......####.....#.#....
.....#..##.##................#.
.#.................#...#..##.#.
....#....#..#.......#.....#....
.##....#..#..#.....###.#..#..#.
#.#.......#.....##...#.....#...
#.#........#.#.###...#....#....
.#.....#.....##.#...#..#.......
..###.#............#...##.###..
.....#.....#..#..##............
.#.#..#.#..##..#....#...##.....
.#...........#..#.......#...#.#
#.#.#.#.....##....#............
...#.................#.#......#
.....##.............#...#.#....
.##......#.#....#..........#.#.
.#.##.......##...#...#.....#.#.
#...#.#........#......##....#.#
#....##....#....#...#..#..#.#.#
......#..........#...#.....#..#
#..#....#....#..##.#..#.#...#..
......#..#.#....#.....#.#..#..#
...#.#...###........#.#......##
..#............................
...#.#..##...##...#...#......##
...#.####......#.........#....#
.#...#.#...##....#......#.#....
.#.....##..##.#................
.#...............#.............
......#.....#...#..##..##......
...#..##.......#.......#..#.#.#
......##.....#..#.....#...#.#.#
........##........#.#........##
.#....#.....###..#.......#...#.
#...#....#.........#.......#...
...##..#........#####.#........
###..#....#.#..#...#.####......
..#..........#.#.............#.
#......#.#....#.#.#....#.##....
.#.#.#.............#....#...#..
......#.....#.#...#..###.#..#..
.....#..#............#...#...##
..#......###..#........#.#.....
#..##......#.#.#.#...........#.
#..#...##.##.....#....#..#.....
...##.#..........#.#....#...#..
.#.#.#.#..#.#...#......#.......
....#......###.#...............
.........#...#....#...#.#....#.
##.#.........#...##............
........#..........#.#...#.....
..#........#....#.......#......
#..#...............#..#...##.#.
#........#.....##.#..#....#...#
..##....#....#.#...........##..
....#.#.........#..#.....#..#..
.......##....#.#.#....###.#....
......#....#.#...#..#.........#
.....##..#....#.#......#.#.#...
#.##..##.#.......#..#...##.#.##
........#.#..#...##.#.#..#.....
#..#......#......#...#.#..#....
.....#......#.#....##....##....
....#.##...##..#..........##.#.
.#....#.......#.........#......
.#.......#.#...#...............
....#.##.......#.##..#.##..#...
#..#.......#.....#..#..........
..#.##.......#....#.#..##..#...
.#.....#...##.#.#..#...#.......
.......#.........#......#.#....
#.##.....##.......#....#.......
##.#.#.........##..#.....#....#
....#.#.#.#....#..#..##.......#
#...#...........#.#............
...#...#.#..#..##..............
......#.......#.........#..#.#.
#.....##.#....#...#..#.........
#...#..###.##..###...##.....#..
#....#.#.#...#.#..........#....
................#.#....#.....##
#.##..............####.....#.##
................#.....#........
#...#..#......#.....#......#...
.........##...........#...#...#
#.#....#...##.....#.....#..#..#
.....#...##..##.............#..
....###.#.......#.........#...#
..#.......#......#..#...#.#....
#.#....#......#.##....#.##.#...
.#.#...#.......#.#...#.##..#...
..........#......#.....#.......
........#...#.....#...##...#.#.
.....##....#.##..#........#.##.
..........##.....#..#........#.
.#....#..#.......#.##..........
.#..#..#...#...#........#.##...
.#...#.##.......#...#........#.
.....#....#.............#..#...
...#....##...#...#.....##......
#.#####.........##...#.....#...
......#.......#....#.....#..#..
..#..............#.#..#..#.....
....#.................#...#....
###.#..##.#....#...#.#......#.#
..##......#.#........#.#...##..
.....#...#...#..#.#..#..##..#..
.##...#......#...#...##.#...#..
.......###.#...........##.##...
.#.##..#.#.###.......#..##...#.
..#....#.......#..##......#....
.#....#.#..#..#.#.#....#...#...
..........##....#....#.#.......
.....#.......#.#..###.#.###....
.#.#....#.##..#.#..#.....#.#.#.
....#.....#.#.#............#...
.###....#...##......##..###..#.
...#.#..#.....#...#....##..#...
.#.#....#..........#...##.....#
#.....##...#........#.#..##..#.
.......#....#.#..........#...#.
.........#..#.#.###.........##.
..................#.#....#....#
....#....#.#..#.......###.##.##
....#...#.................#....
...#..#####.......#.#..##.##...
##.#....#...............#..#...
....#..........#...........#.#.
..##.#.##.#..#.#....#..........
.....#....#....##.#....#....#.#
.......#..##.....###...#....#.#
.#.......#..#.#.#...........#..
.#...........##.#.##....#.#....
....#.#....#.#.#......##.......
.........##......#.#.....###...
........#.#...#.##.....#.##.##.
##.#..##.#.........#....#......
.#.#.#....#..........#.#....#..
....###.........#.#.#..........
#..#....##.....#...............
#.##....#.#...#.....#......#.#.
............#.##........#......
.....#.#.....##..##............
.##..........#.......#......#..
...##..##......#.....#..#....##
.##.##...#.................##..
#....#.#........#..#....#..##.#
....##..##......#....###.#.#..#
.....#....#..#..#...##...#...#.`;

const steps: Step[] = [
    {x: 1, y: 1},
    {x: 3, y: 1},
    {x: 5, y: 1},
    {x: 7, y: 1},
    {x: 1, y: 2},
];
const results = steps.map(s => calculateTreeEncounters(input, s));
console.log(results);