export {
  default as insertion,
  forceInsertion,
  getNewPiece as getNewInsertedPiece,
} from "./insertion";
export {
  default as lateralMove,
  getNewPiece as getNewLateralMovedPiece,
} from "./lateralMove";
export {
  default as rotation,
  getNewPiece as getNewRotatePiece,
} from "./rotation";
export {
  default as softDrop,
  getNewPiece as getNewDownMovedPiece,
} from "./softDrop";
export {
  default as hardDrop,
  getNewPiece as getNewDropPiece,
} from "./hardDrop";
export { default as shadow, getNewPiece as getNewShadowPiece } from "./shadow";
