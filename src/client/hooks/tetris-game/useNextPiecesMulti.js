import React from "react";
import {
  PIECE
} from "../../../config/actions/piece";
import {
  socket
} from "store/middleware/sockets";

function useNextPiecesMulti(gameId, pieces) {
  const [nextPieces, setNextPieces] = React.useState(pieces);

  function pullNextPiece() {
    let nextPiece;

    setNextPieces((oldPieces) => {
      nextPiece = oldPieces[0];

      if (oldPieces.length < 3) {
        socket.emit(PIECE.GET, {
          gameId,
          nbPieces: 3,
        });
      }
      return oldPieces.slice(1);
    });

    return nextPiece;
  }

  return {
    nextPieces,
    pullNextPiece,
    setNextPieces
  };
}

export default useNextPiecesMulti;
