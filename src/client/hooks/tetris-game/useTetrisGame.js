import React from "react";
import { GameContext } from "store";
import { MOVE_LEFT, MOVE_RIGHT } from "constants/tetris";
import useGravity from "./useGravity";

/*
 ** This hook manage the env around the game
 **   events, gravity...
 */
function useTetrisGame(methods) {
  const { state } = React.useContext(GameContext);

  const gravityInterval = useGravity();
  React.useEffect(() => {
    const gravityTimer = setInterval(methods.moveDown, gravityInterval);

    return () => {
      clearInterval(gravityTimer);
    };
  }, [gravityInterval]);

  function movePiece(action) {
    if (!state.alive) {
      return;
    }

    switch (action.code) {
      case "ArrowDown":
        return methods.moveDown();
      case "ArrowLeft":
        return methods.moveLateral(MOVE_LEFT);
      case "ArrowRight":
        return methods.moveLateral(MOVE_RIGHT);
      case "ArrowUp":
        return methods.rotation();
      case "Space":
        return methods.dropDown();
      default:
        return;
    }
  }

  return { movePiece };
}

export default useTetrisGame;
