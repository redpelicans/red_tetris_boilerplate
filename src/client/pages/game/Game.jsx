import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import TetrisGrid from "components/tetris/Grid";
import { useTetrisGame } from "hooks";
import { Link } from "react-router-dom";
import { GameContext } from "store";
import NextPieces from "./NextPieces";

export default function Game() {
  const { state, dispatch } = React.useContext(GameContext);
  const tetris = useTetrisGame(10, 20);

  return (
    <FlexBox
      direction="col"
      width={"full"}
      height={"full"}
      className="justify-center items-center"
    >
      <Link to="/">Retour accueil</Link>
      {state.alive ? <h1>Still alive</h1> : <h1>GAME OVER</h1>}
      <FlexBox direction="row" className="mt-4">
        <FlexBox
          direction="col"
          width={64}
          className="justify-center align-center"
        >
          <TetrisGrid grid={state.grid} rowHeight={6} colHeight={6} />
          <button onClick={() => tetris.movePiece("DOWN")}>go down</button>
          <button onClick={() => tetris.movePiece("ROTATE")}>rotation</button>
        </FlexBox>
        <FlexBox direction="col" className="items-center mx-4">
          <Score score={state.score} />
          <NextPieces nextPieces={state.nextPieces} dispatch={dispatch} />
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}

const Score = React.memo(({ score }) => (
  <FlexBox direction="col" className="items-center">
    <h1 className="font-bold">SCORE</h1>
    <span>{score}</span>
  </FlexBox>
));
