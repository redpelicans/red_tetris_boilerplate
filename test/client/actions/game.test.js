import * as actions from "actions/game";

describe("Game actions", () => {
  test("setPlayerIsAlive", () => {
    expect(actions.setPlayerIsAlive(true)).toEqual({
      type: actions.SET_PLAYER_IS_ALIVE,
      alive: true,
    });
  });

  test("setGame", () => {
    expect(actions.setGame({ test: "OK" })).toEqual({
      type: actions.SET_GAME,
      game: { test: "OK" },
    });
  });

  test("setScore", () => {
    expect(actions.setScore({ score: 42, playerId: "Thor" })).toEqual({
      type: actions.SET_SCORE,
      score: 42,
      playerId: "Thor",
    });
  });

  test("setBoard", () => {
    expect(actions.setBoard({ boardGame: [1, 1], playerId: "Thor" })).toEqual({
      type: actions.SET_BOARD,
      board: [1, 1],
      playerId: "Thor",
    });
  });

  test("setLoser", () => {
    expect(actions.setLoser({ playerId: "Thor" })).toEqual({
      type: actions.SET_LOSER,
      playerId: "Thor",
    });
  });

  test("setWinner", () => {
    expect(actions.setWinner({ winner: "Thor" })).toEqual({
      type: actions.SET_WINNER,
      winner: "Thor",
    });
  });

  test("setPenalty", () => {
    expect(actions.setPenalty({ nbLinePenalty: 2, playerId: "Thor" })).toEqual({
      type: actions.SET_PENALTY,
      nbLinePenalty: 2,
      playerId: "Thor",
    });
  });

  test("setNextPieces", () => {
    expect(actions.setNextPieces([1, 2, 3])).toEqual({
      type: actions.SET_NEXT_PIECES,
      pieces: [1, 2, 3],
    });
  });
});
