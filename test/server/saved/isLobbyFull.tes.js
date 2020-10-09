import { isLobbyFull } from "../../../src/server/store/lobbies";

test("isLobbyFull() should be false", () => {
  const lobby = {
    maxPlayer: 4,
    players: [{ name: "player1" }, { name: "player2" }],
  };

  expect(isLobbyFull(lobby)).toBe(false);
});

test("isLobbyFull() should be true", () => {
  const lobby = {
    maxPlayer: 4,
    players: [
      { name: "player1" },
      { name: "player2" },
      { name: "player2" },
      { name: "player2" },
    ],
  };

  expect(isLobbyFull(lobby)).toBe(true);
});
