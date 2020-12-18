import { evaluate, evaluateWithPrecedence } from "./math-operators";

describe("math operations", () => {
    it.each`
      input                     | expectedResult
      ${`2 * 3 + (4 * 5)`}      | ${26}
      ${`2 * 3`}                | ${6}
      ${`(2 * 3)`}              | ${6}
      ${`3+(2 * 3)`}              | ${9}
      ${`(2 * 3)+3`}              | ${9}
      ${`((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2`}              | ${13632}
    `("are evaluated correctly", ({ input, expectedResult }) => {
      const realResult = evaluate(input);
      expect(realResult).toEqual(expectedResult);
    });

    it.each`
    input                           | expectedResult
    ${`1 + 2 * 3 + 4 * 5 + 6`}      | ${231}
    ${`(1 + 2 * 3 + 4 * 5 + 6)`}      | ${231}
    ${`1 + (2 * 3) + (4 * (5 + 6))`}      | ${51}
  `("are evaluated with precedence correctly", ({ input, expectedResult }) => {
    const realResult = evaluateWithPrecedence(input);
    expect(realResult).toEqual(expectedResult);
  });
  });
  