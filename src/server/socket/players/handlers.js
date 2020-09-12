import Player from "models/player";
import Response from "models/response";
import { logerror, loginfo } from "utils/log";
import { getPlayers } from "store/players";
import { getComplexObjectFromRedis } from "store";

// import { PLAYERS } from "./../../../config/actions/players";

export const handlerGetPlayers = async (socket) => {
  const response = await getComplexObjectFromRedis("players");
  // const response = getPlayers();
  loginfo(response);
  socket.emit("players:response", { response });
};
