import React from "react";
import { GameContext } from "store";
import { MOVE_LEFT, MOVE_RIGHT } from "constants/tetris";
import useGravity from "./useGravity";

/*
 ** This hook manage the env around the game
 **   events, gravity...
 */
function useTetrisGame(methods, nextPieces) {
  const { state } = React.useContext(GameContext);

  const gravityInterval = useGravity();
  React.useEffect(() => {
    if (!state.alive) {
      return;
    }

    const gravityTimer = setInterval(() => {
      const manuallyTriggered = false;
      methods.moveDown(manuallyTriggered);
    }, gravityInterval);

    return () => clearInterval(gravityTimer);
  }, [gravityInterval, state.alive, nextPieces]);

  const movePiece = React.useCallback(
    (action) => {
      if (!state.alive) {
        return;
      }
      const manuallyTriggered = true;

      switch (action.code) {
        case "ArrowDown":
          return methods.moveDown(manuallyTriggered);
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
    },
    [nextPieces],
  );

  return { movePiece };
}

export default useTetrisGame;
