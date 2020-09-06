import { createEvent, bindEvent } from "../../helpers/socket";
import { validationGetPiece } from "./schemas";
import { handlerGetPiece } from "./handlers";
import PIECE from "../../../../config/actions/piece";

export const sendPiece = createEvent(
  PIECE.GET,
  validationGetPiece,
  handlerGetPiece,
);
