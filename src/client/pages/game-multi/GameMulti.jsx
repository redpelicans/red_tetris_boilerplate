import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import TetrisGrid from "components/tetris/Grid";
import {
  useTetrisGame,
  useGameBoard,
  useNextPiecesMulti,
  useGameStats,
} from "hooks";
import { Link } from "react-router-dom";
import { GameContext } from "store";
import NextPieces from "components/tetris/NextPieces";
import useEventListener from "hooks/useEventListener";
import useThrottle from "hooks/useThrottle";
import { DEFAULT_REPEAT_TIMEOUT } from "constants/tetris";
import { setPlayerIsAlive } from "actions/game";
import { setPenalty, setGame } from "actions/game";
import { setGameStarted } from "actions/store";
import { StoreContext } from "store";
import { GAME } from "../../../config/actions/game";
import Modal from "components/modals/Modal";
import { socket, socketGameOn, socketGameOff } from "store/middleware";
import ScatteringGrid from "components/tetris/ScatteringGrid";
import { deepCopy } from "helpers/functional";
import { useTranslation } from "react-i18next";
import { Score, LinesRemoved, Level, Timer } from "components/tetris/Stats";
import SoundToggler from "components/sound/SoundToggler";
import Crown from "assets/img/crown.png";

export default function GameMulti() {
  const { state: stateStore, dispatch: dispatchStore } = React.useContext(
    StoreContext,
  );
  const { state, dispatch } = React.useContext(GameContext);

  React.useEffect(() => {
    socketGameOn(dispatch);
    dispatch(setGame(deepCopy(stateStore.game)));
    return function unsub() {
      socketGameOff();
    };
  }, []);

  const gameOver = () => {
    socket.emit(GAME.SEND_LOSE, {
      gameId: state.game.id,
      playerId: stateStore.player.id,
    });
    dispatch(setPlayerIsAlive(false));
  };

  const {
    linesRemoved,
    addRemovedLines,
    score,
    addScore,
    level,
    speedRate,
  } = useGameStats();

  const addRemovedLinesWithEmit = (value) => {
    if (value > 1) {
      if (state.game.id) {
        socket.emit(GAME.SEND_PENALTY, {
          gameId: state.game.id,
          playerId: stateStore.player.id,
          nbLinePenalty: value - 1,
        });
      }
    }
    addRemovedLines(value);
  };

  const scoreRef = React.useRef(null);
  React.useEffect(() => {
    if (state.game.id) {
      scoreRef.current = setTimeout(() => {
        socket.emit(GAME.SEND_SCORE, {
          gameId: state.game.id,
          playerId: stateStore.player.id,
          score,
        });
      }, 300);

      return () => clearTimeout(scoreRef.current);
    }
  }, [score]);

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
    addRemovedLinesWithEmit,
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

  const { movePiece } = useTetrisGame(methods, nextPieces, level);

  React.useEffect(() => {
    if (Object.keys(state.winner).length) {
      dispatch(setPlayerIsAlive(false));
      dispatchStore(setGameStarted({}));
    }
  }, [state.winner]);

  // Add keyboard event
  const throttledMove = useThrottle(movePiece, DEFAULT_REPEAT_TIMEOUT);
  useEventListener("keydown", throttledMove);

  return (
    <>
      <Link
        to={{ pathname: "/", state: "forceRefresh" }}
        className="text-3xl font-bold hover:text-red-600 fixed top-0 right-0 left-0 text-center"
      >
        Red Tetris
      </Link>

      <SoundToggler
        speedRate={speedRate}
        className="fixed top-0 right-0 z-50 p-1 m-1 cursor-pointer border rounded shadow bg-white"
      />

      <FlexBox direction="row" height="full" className="justify-around">
        <FlexBox direction="col" className="justify-center items-end w-6/12">
          {Object.keys(state.winner).length !== 0 && (
            <Modal className="create-modal">
              <Leaderboard
                winner={state.winner}
                players={state.game.players.map((player) =>
                  player.player.id === stateStore.player.id
                    ? { ...player, score }
                    : player,
                )}
              />
            </Modal>
          )}

          <FlexBox direction="row" className="space-x-8">
            <FlexBox direction="col" className="items-center space-y-4">
              <NextPieces nextPieces={nextPieces} />
              <Timer />
              <Score score={score} />
              <Level level={level} />
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
          </FlexBox>
        </FlexBox>

        <div className="w-1/12" />
        <ScatteringGrid />
      </FlexBox>
    </>
  );
}

const Leaderboard = ({ winner, players }) => {
  const { t } = useTranslation();
  const playersWithoutWinner = players.filter(
    (player) => player.player.id !== winner.player.id,
  );
  const sortedPlayers = playersWithoutWinner.sort(
    (current, next) => current.score > next.score,
  );

  return (
    <FlexBox direction="col">
      <h2 className="text-2xl font-bold space-y-4">
        {t("pages.game.leaderboard")}:
      </h2>

      <FlexBox direction="row" className="justify-between border-b-2 mb-2">
        <FlexBox direction="row" className="items-center">
          <img src={Crown} className="h-4 w-4 mr-1" />
          <h3 className="font-bold">{winner.player.name}</h3>
        </FlexBox>
        <h3 className="italic">{winner.score}</h3>
      </FlexBox>

      {sortedPlayers.map((player, idx) => (
        <FlexBox
          key={idx}
          direction="row"
          className="justify-between border-b pl-5 mb-2"
        >
          <h3 className="font-bold">{player.player.name}</h3>
          <h3 className="italic">{player.score}</h3>
        </FlexBox>
      ))}

      <Link
        to="/rooms"
        className="self-center p-2 bg-red-500 rounded w-full text-center text-white font-semibold mt-4"
      >
        {t("pages.game.back_to_lobbies")}
      </Link>
    </FlexBox>
  );
};
