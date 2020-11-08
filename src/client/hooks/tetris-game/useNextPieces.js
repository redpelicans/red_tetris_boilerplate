import React from "react";
import { PIECE } from "../../../config/actions/piece";
import { socket } from "store/middleware/sockets";

// MOCK

import MOCK_TETROMINOES from "mocks/Tetrominoes";

const lengthMockTetrominoes = MOCK_TETROMINOES.length;
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function fetchFromMock(n) {
  const ret = [];
  for (let i = 0; i < n; i++) {
    ret.push(MOCK_TETROMINOES[getRandomInt(lengthMockTetrominoes)]);
  }

  return ret;
}

// END OF MOCK

function useNextPieces(gameId) {
  const [nextPieces, setNextPieces] = React.useState(() => fetchFromMock(3));

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

  return { nextPieces, pullNextPiece, setNextPieces };
}

export default useNextPieces;
