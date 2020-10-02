import { shallowCopy } from "client/helpers/functional";

describe("ShallowCopy", () => {
  let refArray;

  beforeEach(() => {
    refArray = ["Sheldon", "Leonard", "Radjish", "Howard"];
  });

  test("ShallowCopy of array", () => {
    const expected = ["Sheldon", "Leonard", "Radjish", "Howard"];
    const copyArray = shallowCopy(refArray);

    expect(copyArray).toEqual(expected);
  });
});
