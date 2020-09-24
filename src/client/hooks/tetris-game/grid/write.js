import * as Check from "./checks";
import { CURRENT_PIECE } from "../constants";

/*
 ** Write a piece on the Tetris grid.
 ** Type can be one of the following constants:
 **   - CURRENT_PIECE
 **   - SHADOW_PIECE
 */

function write(grid, piece, type) {
  const { shape, padding, coord, dim } = piece;

  const colLength = padding.x + dim.width;
  const rowLength = padding.y + dim.height;

  for (let col = padding.x; col < colLength; col++) {
    for (let row = padding.y; row < rowLength; row++) {
      if (
        Check.isPartOfPiece(shape[row][col]) &&
        grid[coord.y + row][coord.x + col] !== CURRENT_PIECE
      ) {
        grid[coord.y + row][coord.x + col] = type;
      }
    }
  }
  return grid;
}

export default write;
