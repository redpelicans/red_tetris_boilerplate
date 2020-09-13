import React from "react";
import { GameContext } from "store";
import { putColor, popPiece } from "actions/pieces";

function useCurrentPiece() {
  const { state, dispatch } = React.useContext(GameContext);
  const currentPiece = React.useRef(null);

  const updateCurrentPiece = () => {
    currentPiece.current = state.nextPieces[0];
    dispatch(putColor(currentPiece.current.color));
    dispatch(popPiece());
  };

  return [currentPiece, updateCurrentPiece];
}

export default useCurrentPiece;
