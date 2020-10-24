import * as Grid from "../grid";
import { CURRENT_PIECE } from "constants/tetris";

function softDrop(grid, piece) {
  const newGrid = Grid.write(grid, piece, CURRENT_PIECE);
  return newGrid;
}

function getNewPiece(piece) {
  const newPiece = {
    ...piece,
    coord: { ...piece.coord, y: piece.coord.y + 1 },
  };

  return newPiece;
}

export { getNewPiece };
export default softDrop;
