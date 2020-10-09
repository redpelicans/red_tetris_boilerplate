import { isValid } from "../../../src/server/store/players";

test("isValid() should be true", () => {
  expect(isValid("pseudo")).toBe(true);
  expect(isValid("pseudo123")).toBe(true);
});

test("isValid() should be false", () => {
  expect(isValid("")).toBe(false);
  // expect(isValid(null)).toBe(false);
  // expect(isValid(undefined)).toBe(false);
  expect(isValid([])).toBe(false);
  expect(isValid({})).toBe(false);
  // expect(isValid("123")).toBe(false);
  expect(isValid("pseudopseudopseuso")).toBe(false);
});
