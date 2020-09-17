import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import { timeout } from "helpers/common";
import { pushNewPiece } from "actions/game";
import MOCK_TETROMINOES from "mocks/Tetrominoes";

const NextPieces = React.memo(({ nextPieces, dispatch }) => {
  React.useEffect(() => {
    const fetchInitPieces = async () => {
      const initPieces = await fetchFromMock(4);
      dispatch(pushNewPiece(initPieces));
    };

    fetchInitPieces();
  }, []);

  React.useEffect(() => {
    const fetchNewPiece = async () => {
      const newPiece = await fetchFromMock(1);
      dispatch(pushNewPiece(newPiece));
    };

    if (nextPieces.length === 2) {
      fetchNewPiece();
    }
  }, [nextPieces]);

  return (
    <FlexBox direction="col" className="mx-4">
      <h1>Next Pieces</h1>
      <ol>
        <li>1. {nextPieces[0]?.color}</li>
        <li>2. {nextPieces[1]?.color}</li>
      </ol>
    </FlexBox>
  );
});

export default NextPieces;

// Function for test env
const lengthMockTetrominoes = MOCK_TETROMINOES.length;
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

async function fetchFromMock(n) {
  const ret = [];
  for (let i = 0; i < n; i++) {
    ret.push(MOCK_TETROMINOES[getRandomInt(lengthMockTetrominoes)]);
    // ret.push(MOCK_TETROMINOES[0]);
  }

  await timeout(500);
  return ret;
}
