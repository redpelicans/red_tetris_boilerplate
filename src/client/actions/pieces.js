export const INIT_NEXT_PIECES = "INIT_NEXT_PIECES";
export const FETCH_PIECE = "FETCH_PIECE";
export const POP_PIECE = "POP_PIECE";
export const PUT_PIECE_COLOR = "PUT_PIECE_COLOR";

export const initNextPieces = (initPieces) => ({
  type: INIT_NEXT_PIECES,
  nextPieces: initPieces,
});

export const pushNewPiece = (newPiece) => ({
  type: FETCH_PIECE,
  newPiece,
});

export const popPiece = () => ({
  type: POP_PIECE,
});

export const putColor = (color) => ({
  type: PUT_PIECE_COLOR,
  pieceColor: color,
});
