import { get4dActiveCubesAfterNSteps } from "./conway-cubes/conway-cubes-4d";

const init = `#.......
.#..#..#
....#.#.
.##..#.#
#######.
#...####
###.##..
.##.#.#.`;

console.log(get4dActiveCubesAfterNSteps(init, 6));