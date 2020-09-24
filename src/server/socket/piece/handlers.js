import Piece from "models/piece";
import { PIECE } from "../../../config/actions/piece";

export const handlerGetPiece = async (socket, { nb }) => {
  const tab = [];
  for (let i = 0; i < nb; i++) {
    tab.push(new Piece());
  }
  console.log(tab);
  socket.emit(PIECE.SEND, tab);
};
