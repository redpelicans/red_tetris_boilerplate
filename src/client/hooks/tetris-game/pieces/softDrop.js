import * as Grid from "../grid";
import { CURRENT_PIECE } from "constants/tetris";

function softDrop(grid, piece) {
  const newGrid = Grid.write(grid, piece, CURRENT_PIECE);
  return newGrid;
}

export default softDrop;
