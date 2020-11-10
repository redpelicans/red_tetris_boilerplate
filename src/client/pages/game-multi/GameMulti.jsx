import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import TetrisGrid from "components/tetris/Grid";
import { useTetrisGame, useGameBoard, useNextPiecesMulti } from "hooks";
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
import Modal from "components/modals/Modal";
import { socket, setupSocketGame } from "store/middleware/sockets";
import ScatteringGrid from "components/tetris/ScatteringGrid";
import { deepCopy } from "helpers/functional";

export default function GameMulti() {
  const { state: stateStore, dispatch: dispatchStore } = React.useContext(
    StoreContext,
  );
  const { state, dispatch } = React.useContext(GameContext);

  React.useEffect(() => {
    setupSocketGame(dispatch);
    dispatch(setGame(deepCopy(stateStore.game)));
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

  const scoreRef = React.useRef(null);
  const [score, setScore] = React.useState(0);
  const addScore = React.useCallback(
    (value) => {
      setScore((oldScore) => {
        const newScore = oldScore + value;
        if (state.game.id) {
          clearTimeout(scoreRef.current);
          scoreRef.current = setTimeout(() => {
            socket.emit(GAME.SEND_SCORE, {
              gameId: state.game.id,
              playerId: stateStore.player.id,
              score: newScore,
            });
          }, 300);
        }
        return newScore;
      });
    },
    [state.game.id],
  );

  const { nextPieces, pullNextPiece, setNextPieces } = useNextPiecesMulti(
    state.game.id,
    stateStore.game.pieces,
  );

  React.useEffect(() => {
    if (state.nextPieces && state.nextPieces.length > 0) {
      setNextPieces((old) => [...old, ...state.nextPieces]);
    }
  }, [state.nextPieces]);

  const { grid, piece, ...methods } = useGameBoard(
    10,
    20,
    gameOver,
    pullNextPiece,
    addScore,
    addRemovedLines,
  );

  const boardRef = React.useRef(null);

  React.useEffect(() => {
    if (state.game.id) {
      clearTimeout(boardRef.current);
      boardRef.current = setTimeout(() => {
        socket.emit(GAME.SEND_BOARD, {
          gameId: state.game.id,
          playerId: stateStore.player.id,
          boardGame: grid,
        });
      }, 300);
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
      // dispatch(setGame({}));
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
      {Object.keys(state.winner).length != 0 && (
        <Modal className="create-modal">
          <Winner winner={state.winner} game={state.game} />
        </Modal>
      )}

      <h2 className="text-3xl font-bold">Red Tetris</h2>
      <FlexBox direction="row" className="space-x-8">
        <FlexBox direction="col" className="items-center space-y-4">
          <NextPieces nextPieces={nextPieces} />
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

const Winner = ({ winner, game }) => (
  <FlexBox direction="col">
    <h2 className="text-2xl font-bold space-y-4">And the winner is:</h2>

    <h3 className="text-center text-xl font-semibold">{winner.player.name}</h3>

    <div>
      <h3 className="text-lg font-semibold">SCORE</h3>
      <span className="flex justify-center">{winner.score}</span>
    </div>

    <Link
      to="/rooms"
      className="self-center p-2 bg-red-500 rounded w-full text-center text-white font-semibold"
    >
      Back to rooms
    </Link>
  </FlexBox>
);
