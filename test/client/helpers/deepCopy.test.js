import { deepCopy } from "helpers/functional";

describe("Immutability principle", () => {
  const refObject = {
    a: 1,
    b: 2,
    c: 3,
    deep: { ab: 11, bb: 21, cb: 31 },
    none: null,
    arr: [42, 42],
  };
  const copyArray = deepCopy(refObject);
  Reflect.deleteProperty(copyArray, "deep");

  test("Copy of array has muted", () => {
    const expected = { a: 1, b: 2, c: 3, none: null, arr: [42, 42] };
    expect(copyArray).toEqual(expected);
  });

  test("Origin of array has not muted", () => {
    const expected = {
      a: 1,
      b: 2,
      c: 3,
      deep: { ab: 11, bb: 21, cb: 31 },
      none: null,
      arr: [42, 42],
    };
    expect(refObject).toEqual(expected);
  });
});
