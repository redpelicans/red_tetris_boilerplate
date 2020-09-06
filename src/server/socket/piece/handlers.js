import Piece from "models/piece";
import { PIECE } from "./../../../config/actions/piece";

export const handlerGetPiece = async (socket) => {
  const response = new Piece();
  socket.emit(PIECE.SEND, { response });
};
