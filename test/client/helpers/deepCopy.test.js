import { deepCopy } from "client/helpers/functional";

describe("Immutability principle", () => {
  const refObject = { a: 1, b: 2, c: 3, deep: { ab: 11, bb: 21, cb: 31 } };
  const copyArray = deepCopy(refObject);
  Reflect.deleteProperty(copyArray, "deep");

  test("Copy of array has muted", () => {
    const expected = { a: 1, b: 2, c: 3 };
    expect(copyArray).toEqual(expected);
  });

  test("Origin of array has not muted", () => {
    const expected = { a: 1, b: 2, c: 3, deep: { ab: 11, bb: 21, cb: 31 } };
    expect(refObject).toEqual(expected);
  });
});
