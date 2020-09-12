import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import TetrisGrid from "components/tetris/Grid";
import { useTetrisGame } from "hooks";
import { Link } from "react-router-dom";

const MOCK_TETROMINO_I = [
  [0, 0, 0, 0],
  [1, 1, 1, 1],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

export default function Game() {
  const { tetrisGrid, ...tetris } = useTetrisGame(10, 20);

  return (
    <FlexBox
      width={"full"}
      height={"full"}
      className="justify-center items-center"
    >
      <Link to="/">Retour accueil</Link>
      <FlexBox
        direction="col"
        width={64}
        className="justify-center align-center"
      >
        <TetrisGrid grid={tetrisGrid} />
        <button onClick={() => tetris.insertNewPiece(MOCK_TETROMINO_I)}>
          new piece
        </button>
        <button onClick={tetris.movePieceDown}>go down</button>
      </FlexBox>
    </FlexBox>
  );
}
