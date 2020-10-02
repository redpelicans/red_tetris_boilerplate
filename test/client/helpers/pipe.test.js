import { pipe } from "client/helpers/functional";

describe("Pipe function", () => {
  const add = (curryValue) => (value) => value + curryValue;
  const sub = (curryValue) => (value) => value - curryValue;
  const mul = (curryValue) => (value) => value * curryValue;
  const div = (curryValue) => (value) => value / curryValue;

  test("One fn pipe", () => {
    const result = pipe(add(2))(1);
    expect(result).toEqual(3);
  });

  test("Two fn pipe", () => {
    const result = pipe(add(2), sub(1))(1);
    expect(result).toEqual(2);
  });

  test("Three fn pipe", () => {
    const result = pipe(add(2), sub(1), mul(5))(1);
    expect(result).toEqual(10);
  });

  test("Four fn pipe", () => {
    const result = pipe(add(2), sub(1), mul(5), div(2))(1);
    expect(result).toEqual(5);
  });

  test("Null fn in pipe", () => {
    const result = pipe(add(2), () => null, mul(5), div(2))(1);
    expect(result).toEqual(0);
  });

  test("No fn in pipe", () => {
    const result = pipe()(1);
    expect(result).toEqual(1);
  });
});
