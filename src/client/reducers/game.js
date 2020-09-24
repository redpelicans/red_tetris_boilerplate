import {
  FETCH_PIECES,
  PULL_CURRENT_PIECE_FROM_NEXT_PIECES,
  UPDATE_GRID,
  UPDATE_CURRENT_PIECE,
  SET_PLAYER_IS_ALIVE,
  SET_SCORE,
  INCREASE_ROWS_REMOVED,
} from "actions/game";
import { deepCopy, pipe } from "helpers/functional";
import { lowerOrEqualThan, divideBy } from "helpers/currying";

export const initialState = {
  nextPieces: [],
  grid: [],
  alive: true,
  level: 0,
  rowsRemoved: 0,
  score: 0,
  speedRate: 1.0,
  currentPiece: {
    id: null,
    shape: [],
    color: "",
    padding: { x: 0, y: 0 },
    coord: { x: 0, y: 0 },
    dim: { height: 0, width: 0 },
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PIECES:
      return {
        ...state,
        nextPieces: [...state.nextPieces, ...action.newPieces],
      };
    case PULL_CURRENT_PIECE_FROM_NEXT_PIECES:
      return {
        ...state,
        currentPiece: { ...deepCopy(state.nextPieces[0]), id: action.id },
        nextPieces: state.nextPieces.filter((_, idx) => idx !== 0),
      };
    case UPDATE_GRID:
      return {
        ...state,
        grid: action.newGrid,
      };
    case UPDATE_CURRENT_PIECE:
      return {
        ...state,
        currentPiece: action.newPiece,
      };
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
