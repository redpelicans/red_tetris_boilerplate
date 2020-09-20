import React from "react";
import * as Piece from "./pieces";
import { GameContext } from "store";
import {
  pullCurrentPiece,
  updateCurrentPiece,
  updateGrid,
  setPlayerIsAlive,
  addScore,
  increaseSpeedRate,
} from "actions/game";

function useTetrisState() {
  const { dispatch } = React.useContext(GameContext);

  const updateStateAfterMove = React.useCallback((newObj) => {
    const [newGrid, newPiece] = newObj;
    const newGridWithShadow = Piece.shadow(newGrid, newPiece);
    dispatch(updateGrid(newGridWithShadow));
    dispatch(updateCurrentPiece(newPiece));
  }, []);

  const updateStateAfterBind = React.useCallback((newObj) => {
    const [newGrid, score, nbRowsRemoved] = newObj;
    dispatch(updateGrid(newGrid));
    dispatch(pullCurrentPiece());
    dispatch(addScore(score));
    dispatch(increaseSpeedRate(nbRowsRemoved));
  }, []);

  const setGameOver = React.useCallback(() => {
    dispatch(setPlayerIsAlive(false));
  }, []);

  return { updateStateAfterMove, updateStateAfterBind, setGameOver };
}

export default useTetrisState;
