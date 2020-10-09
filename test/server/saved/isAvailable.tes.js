import { isAvailable } from "../../../src/server/store/players";

test("isAvailable() should be false", () => {
  const players = {
    1: {
      name: "salut",
    },
    2: {
      name: "pseudo",
    },
    3: {
      name: "pseudo123",
    },
    4: {
      name: "bonjour",
    },
  };

  expect(isAvailable(players, "pseudo")).toBe(false);
  expect(isAvailable(players, "pseudo123")).toBe(false);
});

test("isAvailable() should be true", () => {
  const players = {
    1: {
      name: "salut",
    },
    2: {
      name: "pseudo",
    },
    3: {
      name: "pseudo123",
    },
    4: {
      name: "bonjour",
    },
  };

  expect(isAvailable(players, "")).toBe(true);
  expect(isAvailable(players, null)).toBe(true);
  expect(isAvailable(players, [])).toBe(true);
  expect(isAvailable(players, {})).toBe(true);
  expect(isAvailable(players, "123")).toBe(true);
  expect(isAvailable(players, "pseudopseudopseuso")).toBe(true);
});
