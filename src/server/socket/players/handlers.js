import Player from "models/player";
import Response from "models/response";
import { logerror, loginfo } from "utils/log";
import { players } from "store";
import { PLAYERS } from "./../../../config/actions/players";

export const handlerGetPlayers = async (socket) => {
  const response = players;
  loginfo(response);
  socket.emit(PLAYERS.RES, { response });
};
