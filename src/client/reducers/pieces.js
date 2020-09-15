import {
  INIT_NEXT_PIECES,
  FETCH_PIECE,
  PULL_CURRENT_PIECE_FROM_NEXT_PIECES,
} from "actions/pieces";
import { deepCopy } from "helpers/functional";

export const initialState = {
  nextPieces: [],
  currentPiece: {
    shape: [],
    color: "",
    padding: { x: 0, y: 0 },
    coord: { x: 0, y: 0 },
  },
};

// TODO: refactor --> MERGE INIT AND FETCH INTO A SINGLE ACTION
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case INIT_NEXT_PIECES:
      return { ...state, nextPieces: action.nextPieces };
    case FETCH_PIECE:
      return { ...state, nextPieces: [...state.nextPieces, action.newPiece] };
    case PULL_CURRENT_PIECE_FROM_NEXT_PIECES:
      return {
        ...state,
        currentPiece: deepCopy(state.nextPieces[0]),
        nextPieces: state.nextPieces.filter((_, idx) => idx !== 0),
      };
    default:
      return state;
  }
}
