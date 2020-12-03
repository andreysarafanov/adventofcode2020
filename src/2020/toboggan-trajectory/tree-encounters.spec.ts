import { calculateTreeEncounters } from "./tree-encounters";

describe("tree encounters", () => {
    it.each`
      input                     | step              | expectedResult
      ${`..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`}             | ${{x: 3, y: 1}}   | ${7}
    `("should be calculated correctly", ({ input, step, expectedResult }) => {
      const realResult = calculateTreeEncounters(input, step);
      expect(realResult).toEqual(expectedResult);
    });
  });
  