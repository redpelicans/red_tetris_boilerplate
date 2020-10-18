import * as Grid from "../grid";
import { getNewPiece } from "./shadow";

function hardDrop(grid, piece) {
  const newGrid = Grid.write(grid, piece, piece.color);
  return newGrid;
}

export { getNewPiece };
export default hardDrop;
