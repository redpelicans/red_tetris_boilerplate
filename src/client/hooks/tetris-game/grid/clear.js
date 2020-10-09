import { FREE } from "constants/tetris";
import * as Check from "./checks";

function isOverridable(element) {
  return Check.isPartOfPiece(element) || Check.isPartOfShadowPiece(element);
}

function clear(grid) {
  return grid.map((row) => row.map((col) => (isOverridable(col) ? FREE : col)));
}

export default clear;
