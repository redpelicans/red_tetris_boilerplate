import React from "react";
import FlexBox from "components/flexbox/FlexBox";
// import { timeout } from "helpers/common";
// import { pushNewPiece } from "actions/game";
import MOCK_TETROMINOES from "mocks/Tetrominoes";

const NextPieces = React.memo(({ nextPieces }) => (
  <FlexBox direction="col">
    <h1 className="font-bold">Next Pieces</h1>
    {nextPieces[0] && <Previsualisation nextPiece={nextPieces[0]} size={4} />}
    {nextPieces[1] && <Previsualisation nextPiece={nextPieces[1]} size={2} />}
  </FlexBox>
));

export default NextPieces;

const Previsualisation = React.memo(({ nextPiece, size }) => {
  const piece = React.useMemo(
    () =>
      nextPiece.shape.map((row) =>
        row.map((col) => (col === 1 ? nextPiece.color : col)),
      ),
    [nextPiece],
  );

  return (
    <FlexBox direction="col" className="items-center mb-4">
      {piece.map((row, rowIdx) => (
        <FlexBox key={`next-piece-row-${rowIdx}`} direction="row" height={size}>
          {row.map((col, colIdx) => (
            <FlexBox
              key={`next-piece-row${rowIdx}-col-${colIdx}`}
              direction="col"
              width={size}
              className={col === 0 ? "" : `tetromino-${col}`}
            />
          ))}
        </FlexBox>
      ))}
    </FlexBox>
  );
});

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

  // await timeout(500);
  return ret;
}
