import * as Grid from "../grid";
import { CURRENT_PIECE } from "constants/tetris";

function lateralMove(grid, piece) {
  const newGrid = Grid.write(grid, piece, CURRENT_PIECE);
  return newGrid;
}

function getNewPiece(piece, direction) {
  const newPiece = {
    ...piece,
    coord: { ...piece.coord, x: piece.coord.x + direction },
  };

  return newPiece;
}

export { getNewPiece };
export default lateralMove;
