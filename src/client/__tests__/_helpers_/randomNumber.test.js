import { expectCt } from "helmet";
import { randomNumber } from "../../helpers/common";
import toBeWithinRange from "../../../jest-custom-matchers/toBeWithinRange";

expect.extend({
  toBeWithinRange,
});

test("randomNumber() should be in range [0, 10]", () => {
  const randomNb = randomNumber(10);

  expect(randomNb).toBeWithinRange(0, 10);
});

test("randomNumber() should be equal to 0", () => {
  const randomNb = randomNumber(0);

  expect(randomNb).toEqual(0);
});
