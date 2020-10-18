import React from "react";

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

function useNextPieces() {
  const [nextPieces, setNextPieces] = React.useState(() => fetchFromMock(3));

  function pullNextPiece() {
    const nextPiece = nextPieces[0];
    const fetchedPiece = fetchFromMock(1);

    setNextPieces((oldPieces) => [
      ...oldPieces.filter((_, idx) => idx !== 0),
      ...fetchedPiece,
    ]);

    return nextPiece;
  }

  return { nextPieces, pullNextPiece };
}

export default useNextPieces;
