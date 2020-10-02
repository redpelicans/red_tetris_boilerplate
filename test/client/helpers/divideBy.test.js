import { divideBy } from "client/helpers/currying";

describe("Curried with 10", () => {
  const divideByTen = divideBy(10);

  test("Value 10", () => {
    expect(divideByTen(10)).toBe(1);
  });

  test("Value 12", () => {
    expect(divideByTen(12)).toBe(1.2);
  });

  test("Value 0", () => {
    expect(divideByTen(0)).toBe(0);
  });

  test("Value 42", () => {
    expect(divideByTen(42)).toBe(4.2);
  });

  test("Value -21", () => {
    expect(divideByTen(-21)).toBe(-2.1);
  });
});
