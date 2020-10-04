import reducer, { initialState } from "reducers/game";
import * as actions from "actions/game";

describe("Game reducer", () => {
  test("FETCH_PIECES", () => {
    const action = {
      type: actions.FETCH_PIECES,
      newPieces: [1, 2],
    };
    const { nextPieces } = reducer(initialState, action);

    expect(nextPieces).toEqual([1, 2]);
  });

  test("PULL_CURRENT_PIECE_FROM_NEXT_PIECES", () => {
    const action = {
      type: actions.PULL_CURRENT_PIECE_FROM_NEXT_PIECES,
      id: 1,
    };
    const { nextPieces, currentPiece } = reducer(
      { ...initialState, nextPieces: [{ id: 1 }, { id: 2 }] },
      action,
    );

    expect(currentPiece).toEqual({ id: 1 });
    expect(nextPieces).toEqual([{ id: 2 }]);
  });

  test("UPDATE_GRID", () => {
    const action = {
      type: actions.UPDATE_GRID,
      newGrid: [
        [1, 2],
        [3, 4],
      ],
    };
    const { grid } = reducer(initialState, action);

    expect(grid).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });

  test("UPDATE_CURRENT_PIECE", () => {
    const action = {
      type: actions.UPDATE_CURRENT_PIECE,
      newPiece: "random",
    };
    const { currentPiece } = reducer(initialState, action);

    expect(currentPiece).toEqual("random");
  });

  test("SET_PLAYER_IS_ALIVE", () => {
    const action = {
      type: actions.SET_PLAYER_IS_ALIVE,
      alive: false,
    };
    const { alive } = reducer(initialState, action);

    expect(alive).toEqual(false);
  });

  test("SET_SCORE", () => {
    const action = {
      type: actions.SET_SCORE,
      score: 42,
    };
    const { score } = reducer(initialState, action);

    expect(score).toEqual(42);
  });

  test("INCREASE_ROWS_REMOVED", () => {
    const action = {
      type: actions.INCREASE_ROWS_REMOVED,
      increment: 2,
    };
    const { rowsRemoved } = reducer(initialState, action);

    expect(rowsRemoved).toEqual(2);
  });

  test("default", () => {
    const state = reducer(initialState, "NOT_VALID");
    expect(state).toEqual(initialState);
  });

  test("null value", () => {
    expect(reducer(null, actions.FETCH_PIECES)).toBeNull();
  });

  test("Type Error", () => {
    expect(() => reducer(null, null)).toThrow(TypeError);
    expect(() => reducer(initialState, null)).toThrow(TypeError);
  });
});
