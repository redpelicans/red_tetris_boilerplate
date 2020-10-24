import * as Grid from "../grid";
import { SHADOW_PIECE } from "constants/tetris";

function getNewPiece(grid, piece) {
  const maxY = grid.length;
  const newPiece = { ...piece };

  let hardDropCoord = piece.coord;

  for (let row = piece.coord.y; row < maxY; row++) {
    if (Grid.Check.canPutLayer(grid, newPiece)) {
      hardDropCoord = newPiece.coord;
      newPiece.coord = { ...newPiece.coord, y: newPiece.coord.y + 1 };
    } else {
      newPiece.coord = hardDropCoord;
      return newPiece;
    }
  }
  return piece;
}

function shadow(grid, piece) {
  const cleanGrid = Grid.clear(grid);
  const shadowPiece = getNewPiece(cleanGrid, piece);
  const newGrid = Grid.write(grid, shadowPiece, SHADOW_PIECE);

  return newGrid;
}

export { getNewPiece };
export default shadow;
