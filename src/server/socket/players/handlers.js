import Player from "models/player";
import Response from "models/response";
import { logerror, loginfo } from "utils/log";
import { getPlayers } from "service/players";
import { PLAYERS } from "./../../../config/actions/players";

export const handlerGetPlayers = async (socket) => {
  const response = getPlayers();
  loginfo(response);
  socket.emit(PLAYERS.RESPONSE, { response });
};
