import { getActiveCubesAfterNSteps } from "./conway-cubes/conway-cubes";

const init = `#.......
.#..#..#
....#.#.
.##..#.#
#######.
#...####
###.##..
.##.#.#.`;

console.log(getActiveCubesAfterNSteps(init, 6));