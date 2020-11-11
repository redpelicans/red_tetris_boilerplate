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
