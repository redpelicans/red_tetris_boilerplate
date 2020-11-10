import React from "react";
import {
  PIECE
} from "../../../config/actions/piece";
import {
  socket
} from "store/middleware/sockets";

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

function useNextPieces(gameId, pieces) {
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

export function useNextPiecesSolo() {
  const [nextPieces, setNextPieces] = React.useState(() => fetchFromMock(3));

  function pullNextPiece() {
    let nextPiece;

    setNextPieces((oldPieces) => {
      nextPiece = oldPieces[0];
      const fetchedPiece = fetchFromMock(1);
      return [...oldPieces.slice(1), ...fetchedPiece];
    });

    return nextPiece;
  }

  return {
    nextPieces,
    pullNextPiece
  };
}

export default useNextPieces;
