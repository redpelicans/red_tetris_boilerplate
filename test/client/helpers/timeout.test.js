import { timeout } from "client/helpers/common";

test("the data is peanut butter", () =>
  expect(timeout(50)).resolves.toBeUndefined());
