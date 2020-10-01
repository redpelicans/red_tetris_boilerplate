import { isEmpty } from "client/helpers/common";

test("isEmpty() on empty array to be true", () => {
  expect(isEmpty([])).toBe(true);
});

test("isEmpty() on null to be true", () => {
  expect(isEmpty(null)).toBe(true);
});

test("isEmpty() on 'Hello World !' to be false", () => {
  expect(isEmpty("Hello World !")).toBe(false);
});

test("isEmpty() on filled array to be false", () => {
  expect(isEmpty([1, 2, 3])).toBe(false);
});
