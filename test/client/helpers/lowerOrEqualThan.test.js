import { lowerOrEqualThan } from "helpers/currying";

describe("Curried with 10", () => {
  const lowerOrEqualThanTen = lowerOrEqualThan(10);

  test("Equal value", () => {
    expect(lowerOrEqualThanTen(10)).toBe(10);
  });

  test("Greater value", () => {
    expect(lowerOrEqualThanTen(42)).toBe(10);
  });

  test("Lesser value", () => {
    expect(lowerOrEqualThanTen(-2)).toBe(-2);
  });
});
