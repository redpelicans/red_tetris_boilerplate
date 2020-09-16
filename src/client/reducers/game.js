import {
  FETCH_PIECES,
  PULL_CURRENT_PIECE_FROM_NEXT_PIECES,
  UPDATE_GRID,
  UPDATE_CURRENT_PIECE,
  SET_PLAYER_IS_ALIVE,
} from "actions/game";
import { deepCopy } from "helpers/functional";

export const initialState = {
  nextPieces: [],
  grid: [],
  alive: true,
  currentPiece: {
    id: null,
    shape: [],
    color: "",
    padding: { x: 0, y: 0 },
    coord: { x: 0, y: 0 },
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
    default:
      return state;
  }
}
