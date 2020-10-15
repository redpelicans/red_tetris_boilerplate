import * as Grid from "../grid";
import { CURRENT_PIECE } from "constants/tetris";

function lateralMove(grid, piece) {
  const newGrid = Grid.write(grid, piece, CURRENT_PIECE);
  return newGrid;
}

export default lateralMove;
