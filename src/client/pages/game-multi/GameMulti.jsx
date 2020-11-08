import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import TetrisGrid from "components/tetris/Grid";
import { useTetrisGame, useGameBoard, useNextPieces } from "hooks";
import { Link } from "react-router-dom";
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
import { setPenalty, setGame } from "actions/game";
import { setGameStarted } from "actions/store";
import { StoreContext } from "store";
import { GAME } from "../../../config/actions/game";
import Overlay from "components/overlay/Overlay";
import { socket, setupSocketGame } from "store/middleware/sockets";
import ScatteringGrid from "components/tetris/ScatteringGrid";

export default function GameMulti() {
  const { state: stateStore, dispatch: dispatchStore } = React.useContext(
    StoreContext,
  );
  const { state, dispatch } = React.useContext(GameContext);

  React.useEffect(() => {
    setupSocketGame(dispatch);
    dispatch(setGame(stateStore.game));
  }, []);

  const gameOver = () => {
    socket.emit(GAME.SEND_LOSE, {
      gameId: state.game.id,
      playerId: stateStore.player.id,
    });
    dispatch(setPlayerIsAlive(false));
  };

  const [linesRemoved, setLinesRemoved] = React.useState(0);
  const addRemovedLines = (value) => {
    if (value > 1) {
      if (state.game.id) {
        socket.emit(GAME.SEND_PENALTY, {
          gameId: state.game.id,
          playerId: stateStore.player.id,
          nbLinePenalty: value - 1,
        });
      }
    }
    setLinesRemoved((oldValue) => oldValue + value);
  };

  const [score, setScore] = React.useState(0);
  const addScore = React.useCallback(
    (value) => {
      setScore((oldScore) => {
        const newScore = oldScore + value;
        if (state.game.id) {
          socket.emit(GAME.SEND_SCORE, {
            gameId: state.game.id,
            playerId: stateStore.player.id,
            score: newScore,
          });
        }
        return newScore;
      });
    },
    [state.game.id],
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

  React.useEffect(() => {
    if (state.game.id) {
      socket.emit(GAME.SEND_BOARD, {
        gameId: state.game.id,
        playerId: stateStore.player.id,
        boardGame: grid,
      });
    }
  }, [grid, state.game.id]);

  React.useEffect(() => {
    if (state.penalty > 0) {
      methods.malus(state.penalty);
      dispatch(setPenalty({ nbLinePenalty: 0, playerId: "" }));
    }
  }, [state.penalty]);

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
    if (Object.keys(state.winner).length) {
      dispatch(setPlayerIsAlive(false));
      dispatchStore(setGameStarted({}));
      dispatch(setGame({}));
    }
  }, [state.winner]);

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
      className="justify-center items-center"
    >
      {Object.keys(state.winner).length ? (
        <Overlay isOpen className="create-modal">
          <span>{"WINNER"}</span>
          <br />
          <span>{`name : ${state.winner.player.name}`}</span>
          <br />
          <span>{`score : ${state.winner.score}`}</span>
          <br />
          <Link
            to="/rooms/id"
            className="font-semibold border-2 p-2 mb-2 border-red-300 rounded"
          >
            Back to rooms
          </Link>
        </Overlay>
      ) : null}

      <h1 className="font-bold">{state.alive ? "Still alive" : "GAME OVER"}</h1>
      <FlexBox direction="row" className="mt-4">
        <FlexBox direction="col" className="items-center mx-4">
          <Timer />
          <Score score={score} />
          <Level level={state.level} />
          <LinesRemoved lines={linesRemoved} />
          <NextPieces nextPieces={nextPieces} />
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

        <ScatteringGrid />
      </FlexBox>
    </FlexBox>
  );
}

const Score = React.memo(({ score }) => (
  <FlexBox direction="col" className="relative items-center">
    <h1 className="font-bold w-32 text-center">SCORE</h1>
    <span>{score}</span>
  </FlexBox>
));

const LinesRemoved = React.memo(({ lines }) => <p>{lines} Lines removed</p>);

const Level = React.memo(({ level }) => (
  <h1 className="font-bold">Level {level}</h1>
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
