import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import TetrisGrid from "components/tetris/Grid";
import { useTetrisGame } from "hooks";
import { Link } from "react-router-dom";
import NextPieces from "./NextPieces";
// import { GameContext } from "store";

export default function Game() {
  const { tetrisGrid, ...tetris } = useTetrisGame(10, 20);

  return (
    <FlexBox
      direction="col"
      width={"full"}
      height={"full"}
      className="justify-center items-center"
    >
      <Link to="/">Retour accueil</Link>
      <FlexBox direction="row" className="mt-4">
        <FlexBox
          direction="col"
          width={64}
          className="justify-center align-center"
        >
          <TetrisGrid grid={tetrisGrid} />
          <button onClick={() => tetris.movePiece("DOWN")}>go down</button>
        </FlexBox>
        <NextPieces />
      </FlexBox>
    </FlexBox>
  );
}
