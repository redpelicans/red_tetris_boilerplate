import React from "react";
// import * as Grid from "./grid";

function usePiece() {
  const [piece, setPiece] = React.useState({
    id: null,
    shape: [],
    color: "",
    padding: { x: 0, y: 0 },
    coord: { x: 0, y: 0 },
    dim: { height: 0, width: 0 },
  });

  // const pieceId = React.useRef(0);

  // const updatePiece = (newGrid) => setPiece(() => newGrid);
  // const pullCurrentPiece = () => {
  //   // pieceId.current++;
  //   setPiece({ ...deepCopy(state.nextPieces[0]), id: pieceId.current++ })
  // };

  return [piece, setPiece];
}

export default usePiece;
