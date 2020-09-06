import { createEvent } from "helpers/socket";
import { validationGetPiece } from "socket/piece/schemas";
import { handlerGetPiece } from "socket/piece/handlers";
import { PIECE } from "./../../../config/actions/piece";

export const getPiece = createEvent(
  PIECE.GET,
  validationGetPiece,
  handlerGetPiece,
);
