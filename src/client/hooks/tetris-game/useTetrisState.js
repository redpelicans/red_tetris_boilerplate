import React from "react";
import * as Piece from "./pieces";
import { GameContext } from "store";
import {
  pullCurrentPiece,
  updateCurrentPiece,
  setPlayerIsAlive,
  addScore,
  inscreaseRowsRemoved,
} from "actions/game";

function useTetrisState(setGrid) {
  const { dispatch } = React.useContext(GameContext);

  const updateStateAfterMove = React.useCallback((newObj) => {
    const [newGrid, newPiece] = newObj;
    const newGridWithShadow = Piece.shadow(newGrid, newPiece);
    setGrid(newGridWithShadow);
    dispatch(updateCurrentPiece(newPiece));
  }, []);

  const updateStateAfterBind = React.useCallback((newObj) => {
    const [newGrid, score, nbRowsRemoved] = newObj;
    setGrid(newGrid);
    dispatch(pullCurrentPiece());
    dispatch(addScore(score));
    dispatch(inscreaseRowsRemoved(nbRowsRemoved));
  }, []);

  const setGameOver = React.useCallback((newGrid) => {
    if (newGrid) {
      setGrid(newGrid);
    }
    dispatch(setPlayerIsAlive(false));
  }, []);

  return { updateStateAfterMove, updateStateAfterBind, setGameOver };
}

export default useTetrisState;
