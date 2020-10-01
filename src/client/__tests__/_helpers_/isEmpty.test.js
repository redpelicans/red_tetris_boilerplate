import { isEmpty } from "../../helpers/common";

test("isEmpty() on empty array to be true", () => {
  expect(isEmpty([])).toBe(true);
});

test("isEmpty() on null to be true", () => {
  expect(isEmpty(null)).toBe(true);
});

test("isEmpty() on 'Hello World !' to be false", () => {
  expect(isEmpty("Hello World !")).toBe(false);
});
