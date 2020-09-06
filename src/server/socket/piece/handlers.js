import { logerror, loginfo } from "log";
import Piece from "models/piece";

export const handlerGetPiece = async (socket) => {
  const response = new Piece();
  loginfo(response);
  socket.emit("piece:send", { response });
};
