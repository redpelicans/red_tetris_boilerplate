import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import TetrisGrid from "components/tetris/Grid";
import { useTetrisGame } from "hooks";
import { Link } from "react-router-dom";
import { GameContext } from "store";
import NextPieces from "./NextPieces";

import useEventListener from "hooks/useEventListener";
import useThrottle from "hooks/useThrottle";
import { DEFAULT_REPEAT_TIMEOUT } from "hooks/tetris-game/constants";
import AudioTheme from "./AudioTheme";

export default function Game() {
  const { state, dispatch } = React.useContext(GameContext);
  const { movePiece } = useTetrisGame(10, 20);

  // Add keyboard event
  const throttledMove = useThrottle(movePiece, DEFAULT_REPEAT_TIMEOUT);
  useEventListener("keydown", throttledMove);

  return (
    <FlexBox
      direction="col"
      width={"full"}
      height={"full"}
      className="justify-center items-center"
    >
      <AudioTheme alive={state.alive} speedRate={state.speedRate} />
      <Link
        to="/"
        className="font-semibold border-2 p-2 mb-2 border-red-300 rounded"
      >
        Retour accueil
      </Link>
      <h1 className="font-bold">{state.alive ? "Still alive" : "GAME OVER"}</h1>
      <FlexBox direction="row" className="mt-4">
        <FlexBox
          direction="col"
          width={64}
          className="justify-center align-center"
        >
          <TetrisGrid grid={state.grid} rowHeight={6} colHeight={6} />
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
