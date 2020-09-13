export const INIT_NEXT_PIECES = "INIT_NEXT_PIECES";
export const FETCH_PIECE = "FETCH_PIECE";
export const PULL_CURRENT_PIECE_FROM_NEXT_PIECES =
  "PULL_CURRENT_PIECE_FROM_NEXT_PIECES";

export const initNextPieces = (initPieces) => ({
  type: INIT_NEXT_PIECES,
  nextPieces: initPieces,
});

export const pushNewPiece = (newPiece) => ({
  type: FETCH_PIECE,
  newPiece,
});

export const updateCurrentPiece = () => ({
  type: PULL_CURRENT_PIECE_FROM_NEXT_PIECES,
});
