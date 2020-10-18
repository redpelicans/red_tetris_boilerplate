import * as Grid from "../grid";
import { getNewPiece } from "./shadow";

// import { CURRENT_PIECE } from "constants/tetris";

function hardDrop(grid, piece) {
  // const initialY = piece.coord.y;

  // const cleanGrid = Grid.clear(grid);

  // const newPiece = getNewPiece(cleanGrid, piece);

  const newGrid = Grid.write(grid, piece, piece.color);

  // const [gridAfterBind, additionalScore, nbRowsRemoved] = Grid.bind(
  //   newGrid,
  //   piece,
  // );
  // const score = (newPiece.coord.y - initialY) * 2 + additionalScore;
  // return [gridAfterBind, score, nbRowsRemoved];
  return newGrid;
}

export { getNewPiece };
export default hardDrop;
