import { logerror, loginfo } from "utils/log";
import { getComplexObjectFromRedis } from "store";

export const handlerGetPlayers = async (socket) => {
  const response = await getComplexObjectFromRedis("players");
  socket.emit("players:response", { response });
};
