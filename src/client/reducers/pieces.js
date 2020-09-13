import {
  INIT_NEXT_PIECES,
  FETCH_PIECE,
  POP_PIECE,
  PUT_PIECE_COLOR,
} from "actions/pieces";

export const initialState = {
  nextPieces: [],
  currentPieceColor: "",
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case INIT_NEXT_PIECES:
      return { ...state, nextPieces: action.nextPieces };
    case FETCH_PIECE:
      return { ...state, nextPieces: [...state.nextPieces, action.newPiece] };
    case POP_PIECE:
      const newNextPieces = state.nextPieces.filter((_, idx) => idx !== 0);
      return { ...state, nextPieces: newNextPieces };
    case PUT_PIECE_COLOR:
      return { ...state, currentPieceColor: action.pieceColor };
    default:
      return state;
  }
}
