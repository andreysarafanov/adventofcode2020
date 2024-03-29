import { executeUntilOpIsExecutedTwice, fixOperationsAndGetAccumulator } from "./game-console";

describe("game console", () => {
    it.each`
      input                     | expectedResult
      ${`nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`}                        | ${5}
    `("should calculate accumulator before first duplicated op correctly", ({ input, expectedResult }) => {
      const realResult = executeUntilOpIsExecutedTwice(input);
      expect(realResult).toEqual(expectedResult);
    });

    it.each`
      input                     | expectedResult
      ${`nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`}                        | ${8}
    `("should fix operations and get accumulator correctly", ({ input, expectedResult }) => {
      const realResult = fixOperationsAndGetAccumulator(input);
      expect(realResult).toEqual(expectedResult);
    });
  });
  