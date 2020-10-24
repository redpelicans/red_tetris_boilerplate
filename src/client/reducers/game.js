import {
  SET_PLAYER_IS_ALIVE,
  SET_SCORE,
  INCREASE_ROWS_REMOVED,
} from "actions/game";
import { pipe } from "helpers/functional";
import { lowerOrEqualThan, divideBy } from "helpers/currying";

export const initialState = {
  alive: true,
  level: 0,
  rowsRemoved: 0,
  score: 0,
  speedRate: 1.0,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_PLAYER_IS_ALIVE:
      return {
        ...state,
        alive: action.alive,
      };
    case SET_SCORE:
      return {
        ...state,
        score: state.score + action.score,
      };
    case INCREASE_ROWS_REMOVED:
      const newRowsRemoved = state.rowsRemoved + action.increment;
      const newLevel = pipe(
        divideBy(10),
        Math.floor,
        lowerOrEqualThan(10),
      )(newRowsRemoved);

      return {
        ...state,
        rowsRemoved: newRowsRemoved,
        level: newLevel,
        speedRate: 1.0 + newLevel * 0.05,
      };
    default:
      return state;
  }
}
