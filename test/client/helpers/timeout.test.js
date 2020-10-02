import { timeout } from "helpers/common";

test("the data is peanut butter", () =>
  expect(timeout(50)).resolves.toBeUndefined());
