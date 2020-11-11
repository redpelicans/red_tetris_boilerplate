import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import TetrisGrid from "components/tetris/Grid";
import { Link } from "react-router-dom";
import {
  useTetrisGame,
  useGameBoard,
  useNextPiecesSolo,
  useGameStats,
} from "hooks";
import { GameContext } from "store";
import NextPieces from "components/tetris/NextPieces";
import useEventListener from "hooks/useEventListener";
import useThrottle from "hooks/useThrottle";
import { DEFAULT_REPEAT_TIMEOUT } from "constants/tetris";
import { setPlayerIsAlive } from "actions/game";
import GameOverStats from "./GameOverStats";
import Modal from "components/modals/Modal";
import { useTranslation } from "react-i18next";
import { Score, LinesRemoved, Level, Timer } from "components/tetris/Stats";
import SoundToggler from "components/sound/SoundToggler";

export default function GameSolo() {
  const { t } = useTranslation();
  const { state, dispatch } = React.useContext(GameContext);
  const gameOver = () => {
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

  const { nextPieces, pullNextPiece } = useNextPiecesSolo();
  const { grid, piece, ...methods } = useGameBoard(
    10,
    20,
    gameOver,
    pullNextPiece,
    addScore,
    addRemovedLines,
  );
  const { movePiece } = useTetrisGame(methods, nextPieces, level);

  // Add keyboard event
  const throttledMove = useThrottle(movePiece, DEFAULT_REPEAT_TIMEOUT);
  useEventListener("keydown", throttledMove);

  return (
    <FlexBox direction="col" height="full" className="justify-around">
      <FlexBox className="w-full justify-center">
        <Link to="/" className="text-3xl font-bold hover:text-red-600">
          Red Tetris
        </Link>
      </FlexBox>

      <FlexBox direction="col" className="justify-center items-center">
        {!state.alive && (
          <Modal>
            <GameOverStats
              score={score}
              level={level}
              linesRemoved={linesRemoved}
            />
          </Modal>
        )}
        <SoundToggler
          speedRate={speedRate}
          className="fixed top-0 right-0 z-50 p-1 m-1 cursor-pointer border rounded shadow"
        />

        <FlexBox direction="row" className="space-x-8">
          <FlexBox direction="col" className="items-center space-y-4">
            <h3 className="font-bold text-2xl">{t("pages.game.stats")}</h3>
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

          <NextPieces nextPieces={nextPieces} />
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}
