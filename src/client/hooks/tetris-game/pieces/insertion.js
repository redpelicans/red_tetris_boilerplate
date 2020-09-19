import * as Grid from "../grid";
import { CURRENT_PIECE } from "../constants";

function insertion(piece, grid, midGrid) {
  const insertPos =
    midGrid - Math.ceil((piece.shape[0].length - piece.padding.x) / 2);
  const newPiece = {
    ...piece,
    coord: { x: insertPos, y: 0 - piece.padding.y },
  };

  if (!Grid.Check.canPutLayer(grid, newPiece)) {
    return null;
  }

  const gridCopy = Grid.write(grid, newPiece, CURRENT_PIECE);
  return [gridCopy, newPiece];
}

export default insertion;
