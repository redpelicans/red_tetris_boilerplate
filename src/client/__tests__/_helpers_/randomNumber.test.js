import { expectCt } from "helmet";
import { randomNumber } from "../../helpers/common";

test("randomNumber() should be in range [0, 10]", () => {
  const randomNb = randomNumber(10);

  expect(randomNb).toBeGreaterThanOrEqual(0);
  expect(randomNb).toBeLessThanOrEqual(10);
});

test("randomNumber() should be equal to 0", () => {
  const randomNb = randomNumber(0);

  expect(randomNb).toEqual(0);
});
