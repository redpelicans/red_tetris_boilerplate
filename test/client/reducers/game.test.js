import reducer, { initialState } from "reducers/game";
import * as actions from "actions/game";

describe("Game reducer", () => {
  test("SET_PLAYER_IS_ALIVE", () => {
    const action = {
      type: actions.SET_PLAYER_IS_ALIVE,
      alive: false,
    };
    const { alive } = reducer(initialState, action);

    expect(alive).toEqual(false);
  });

  test("SET_GAME", () => {
    const action = {
      type: actions.SET_GAME,
      game: true,
    };
    const { game } = reducer(initialState, action);

    expect(game).toEqual(true);
  });

  test("SET_SCORE", () => {
    const action = {
      type: actions.SET_SCORE,
      playerId: "spiderman",
      score: 42,
    };
    const { game } = reducer(
      {
        ...initialState,
        game: { players: [{ player: { id: "spiderman" }, score: 0 }] },
      },
      action,
    );

    expect(game).toEqual({
      players: [{ player: { id: "spiderman" }, score: 42 }],
    });
  });

  test("SET_BOARD", () => {
    const action = {
      type: actions.SET_BOARD,
      playerId: "spiderman",
      board: ["...", "..."],
    };
    const { game } = reducer(
      {
        ...initialState,
        game: {
          players: [{ player: { id: "spiderman" }, board: [] }],
        },
      },
      action,
    );

    expect(game).toEqual({
      players: [{ player: { id: "spiderman" }, board: ["...", "..."] }],
    });
  });

  test("SET_LOSER", () => {
    const action = {
      type: actions.SET_LOSER,
      playerId: "spiderman",
    };
    const { game } = reducer(
      {
        ...initialState,
        game: {
          players: [{ player: { id: "spiderman" }, loser: false }],
        },
      },
      action,
    );

    expect(game).toEqual({
      players: [{ player: { id: "spiderman" }, loser: true }],
    });
  });

  test("SET_WINNER", () => {
    const action = {
      type: actions.SET_WINNER,
      winner: "spiderman",
    };
    const { winner } = reducer(initialState, action);

    expect(winner).toEqual("spiderman");
  });

  test("SET_PENALTY", () => {
    const action = {
      type: actions.SET_PENALTY,
      nbLinePenalty: 2,
    };
    const { penalty } = reducer(initialState, action);

    expect(penalty).toEqual(2);
  });

  test("SET_NEXT_PIECES", () => {
    const action = {
      type: actions.SET_NEXT_PIECES,
      pieces: [1, 2, 3],
    };
    const { nextPieces } = reducer(initialState, action);

    expect(nextPieces).toEqual([1, 2, 3]);
  });

  test("default", () => {
    const state = reducer(initialState, "NOT_VALID");
    expect(state).toEqual(initialState);
  });

  test("null value", () => {
    expect(reducer(null, actions.SET_SCORE)).toBeNull();
  });

  test("Type Error", () => {
    expect(() => reducer(null, null)).toThrow(TypeError);
    expect(() => reducer(initialState, null)).toThrow(TypeError);
  });
});
