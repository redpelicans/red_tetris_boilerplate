import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import TetrisGrid from "components/tetris/Grid";
import { useTetrisGame } from "hooks";
import { Link } from "react-router-dom";
import { GameContext } from "store";
import NextPieces from "./NextPieces";
import TetrisTheme from "assets/music/Tetris_theme.ogg";
import TetrisGameOverTheme from "assets/music/Tetris_game_over.ogg";

import useEventListener from "hooks/useEventListener";
import useThrottle from "hooks/useThrottle";
import { DEFAULT_REPEAT_TIMEOUT } from "hooks/tetris-game/constants";

export default function Game() {
  const { state, dispatch } = React.useContext(GameContext);
  const { movePiece } = useTetrisGame(10, 20);
  const throttledMove = useThrottle(movePiece, DEFAULT_REPEAT_TIMEOUT);
  useEventListener("keydown", throttledMove);

  const audioRef = React.useRef(null);

  React.useEffect(() => {
    if (state.alive) {
      audioRef.current.src = TetrisTheme;
      audioRef.current.volume = 0.2;
      audioRef.current.loop = true;
      audioRef.current.play();
    } else {
      audioRef.current.loop = false;
      audioRef.current.src = TetrisGameOverTheme;
      audioRef.current.playbackRate = 1.0;
      audioRef.current.volume = 1.0;
      audioRef.current.play();
    }

    return () => {
      audioRef.current.src = null;
    };
  }, [state.alive]);

  React.useEffect(() => {
    audioRef.current.playbackRate = state.speedRate;
  }, [state.speedRate]);

  return (
    <FlexBox
      direction="col"
      width={"full"}
      height={"full"}
      className="justify-center items-center"
    >
      <audio ref={audioRef} />
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
