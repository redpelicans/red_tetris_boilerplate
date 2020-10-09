import { isLobbyNameTaken } from "../../../src/server/store/lobbies";

test("isLobbyNameTaken() should be true", () => {
  const lobbies = {
    1: {
      name: "lobby1",
    },
    2: {
      name: "lobby2",
    },
    3: {
      name: "lobby3",
    },
    4: {
      name: "lobby4",
    },
  };

  expect(isLobbyNameTaken(lobbies, "lobby1")).toBe(true);
  expect(isLobbyNameTaken(lobbies, "lobby4")).toBe(true);
});

test("isLobbyNameTaken() should be false", () => {
  const lobbies = {
    1: {
      name: "lobby1",
    },
    2: {
      name: "lobby2",
    },
    3: {
      name: "lobby3",
    },
    4: {
      name: "lobby4",
    },
  };

  expect(isLobbyNameTaken(lobbies, "")).toBe(false);
  expect(isLobbyNameTaken(lobbies, null)).toBe(false);
  expect(isLobbyNameTaken(lobbies, [])).toBe(false);
  expect(isLobbyNameTaken(lobbies, {})).toBe(false);
  expect(isLobbyNameTaken(lobbies, "123")).toBe(false);
  expect(isLobbyNameTaken(lobbies, "pseudopseudopseuso")).toBe(false);
});
