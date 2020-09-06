import Player from "models/player";
import Response from "models/response";
import { logerror, loginfo } from "utils/log";
import { PLAYERS } from "./../../../config/actions/players";

export const handlerGetPlayers = async (socket) => {
  const response = ["here should be all the players"];
  loginfo(response);
  socket.emit(PLAYERS.RES, { response });
};
