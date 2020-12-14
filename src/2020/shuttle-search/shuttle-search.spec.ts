import { part2, part2_V2 } from "./shuttle-search";

describe("shuttle search", () => {
    it.each`
      input                     | expectedResult
      ${'17,x,13,19'}           | ${3417}
      ${'67,7,59,61'}           | ${754018}
      ${'67,x,7,59,61'}         | ${779210}
      ${'67,7,x,59,61'}         | ${1261476}
      ${'1789,37,47,1889'}      | ${1202161486}
    `("should calculate the first correct time", ({ input, expectedResult }) => {
      const realResult = part2_V2(input);
      expect(realResult).toEqual(expectedResult);
    });
});