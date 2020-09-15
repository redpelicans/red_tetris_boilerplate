export const FETCH_PIECES = "FETCH_PIECES";
export const PULL_CURRENT_PIECE_FROM_NEXT_PIECES =
  "PULL_CURRENT_PIECE_FROM_NEXT_PIECES";

export const pushNewPiece = (newPieces) => ({
  type: FETCH_PIECES,
  newPieces,
});

export const updateCurrentPiece = () => ({
  type: PULL_CURRENT_PIECE_FROM_NEXT_PIECES,
});
