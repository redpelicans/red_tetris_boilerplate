import { randomRangeNumber } from "helpers/common";

test("randomRangeNumber() should be in range [2, 10]", () => {
  const randomNb = randomRangeNumber(2, 10);

  expect(randomNb).toBeWithinRange(2, 10);
});

test("randomRangeNumber() should be in range [-10, 10]", () => {
  const randomNb = randomRangeNumber(-10, 10);

  expect(randomNb).toBeWithinRange(-10, 10);
});

test("randomRangeNumber() should be in range [-10, -5]", () => {
  const randomNb = randomRangeNumber(-10, -5);

  expect(randomNb).toBeWithinRange(-10, -5);
});

test("randomRangeNumber() should be equal to 0", () => {
  const randomNb = randomRangeNumber(0, 0);

  expect(randomNb).toEqual(0);
});
