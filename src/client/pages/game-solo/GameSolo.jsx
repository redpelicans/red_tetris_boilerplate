import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import TetrisGrid from "components/tetris/Grid";
import { useTetrisGame, useGameBoard, useNextPieces } from "hooks";
import { GameContext } from "store";
import NextPieces from "components/tetris/NextPieces";
import { getElapsedTime } from "helpers/common";
import useEventListener from "hooks/useEventListener";
import useThrottle from "hooks/useThrottle";
import { DEFAULT_REPEAT_TIMEOUT } from "constants/tetris";
import TetrisTheme from "assets/music/Tetris_theme.ogg";
import TetrisGameOverTheme from "assets/music/Tetris_game_over.ogg";
import useAudio from "hooks/useAudio";
import { setPlayerIsAlive } from "actions/game";
import GameOverStats from "./GameOverStats";
import Modal from "components/modals/Modal";

export default function GameSolo() {
  const { state, dispatch } = React.useContext(GameContext);
  const gameOver = () => {
    dispatch(setPlayerIsAlive(false));
  };

  const [linesRemoved, setLinesRemoved] = React.useState(0);
  const addRemovedLines = React.useCallback((value) =>
    setLinesRemoved((oldValue) => oldValue + value),
  );

  const [score, setScore] = React.useState(0);
  const addScore = React.useCallback(
    (value) => setScore((oldScore) => oldScore + value),
    [],
  );
  const { nextPieces, pullNextPiece } = useNextPieces();
  const { grid, piece, ...methods } = useGameBoard(
    10,
    20,
    gameOver,
    pullNextPiece,
    addScore,
    addRemovedLines,
  );
  const { movePiece } = useTetrisGame(methods, nextPieces);

  const options = {
    volume: 0.2,
    loop: true,
    playbackRate: state.speedRate,
  };
  const [toggleMainAudio, setOptions] = useAudio(TetrisTheme, options);
  const [toggleGameOverAudio] = useAudio(TetrisGameOverTheme);

  React.useEffect(() => {
    toggleMainAudio();
    if (state.alive === false) {
      toggleGameOverAudio();
    }
  }, [state.alive]);

  React.useEffect(() => {
    setOptions({ ...options, playbackRate: state.speedRate });
  }, [state.speedRate]);

  // Add keyboard event
  const throttledMove = useThrottle(movePiece, DEFAULT_REPEAT_TIMEOUT);
  useEventListener("keydown", throttledMove);

  return (
    <FlexBox
      direction="col"
      width="full"
      height="full"
      className="justify-center items-center space-y-4"
    >
      {!state.alive && (
        <Modal>
          <GameOverStats
            score={score}
            level={state.level}
            linesRemoved={linesRemoved}
          />
        </Modal>
      )}

      <h2 className="text-3xl font-bold">Red Tetris</h2>
      <FlexBox direction="row" className="space-x-8">
        <FlexBox direction="col" className="items-center space-y-4">
          <h3 className="font-bold text-2xl">Stats</h3>
          <Timer />
          <Score score={score} />
          <Level level={state.level} />
          <LinesRemoved lines={linesRemoved} />
        </FlexBox>

        <FlexBox
          direction="col"
          width={64}
          className="justify-center align-center"
        >
          <TetrisGrid
            grid={grid}
            currentPieceColor={piece.color}
            rowHeight={6}
            colHeight={6}
          />
        </FlexBox>

        <NextPieces nextPieces={nextPieces} />
      </FlexBox>
    </FlexBox>
  );
}

const Score = React.memo(({ score }) => (
  <FlexBox direction="col" className="relative items-center">
    <h1 className="font-bold w-32 text-center text-lg">SCORE</h1>
    <span>{score}</span>
  </FlexBox>
));

const LinesRemoved = React.memo(({ lines }) => <p>{lines} Lines removed</p>);

const Level = React.memo(({ level }) => (
  <h1 className="font-bold text-lg">Level {level}</h1>
));

const Timer = React.memo(() => {
  const { state } = React.useContext(GameContext);
  const startTime = new Date();

  const [elapsedTime, setElapsedTime] = React.useState("00:00");
  React.useEffect(() => {
    const formatTimeUnit = (timeUnit) =>
      timeUnit < 10 ? `0${timeUnit}` : timeUnit;

    const formatElapsedTime = (diffTime) => {
      const minutes = diffTime.getMinutes();
      const seconds = diffTime.getSeconds();

      return `${formatTimeUnit(minutes)}:${formatTimeUnit(seconds)}`;
    };

    const getNewElapsedTime = () => {
      const newElapsedTime = new Date(getElapsedTime(startTime));
      const newElapsedTimeFormatted = formatElapsedTime(newElapsedTime);
      return newElapsedTimeFormatted;
    };

    if (state.alive) {
      const timerInterval = setInterval(
        () => setElapsedTime(getNewElapsedTime()),
        1000,
      );

      return () => clearInterval(timerInterval);
    }
  }, [state.alive]);

  return <p>{elapsedTime}</p>;
});
