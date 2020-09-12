import Player from "models/player";
import Response from "models/response";
import { logerror, loginfo } from "utils/log";
import { pushPlayer, getPlayers, popPlayer } from "store/players";
import { PLAYER } from "./../../../config/actions/player";
import { getComplexObjectFromRedis } from "store";

// import { PLAYERS } from "./../../../config/actions/players";

export const handlerCreatePlayer = async (socket, { name }) => {
  const socketId = socket.id;
  const player = new Player({ name, socketId });
  await pushPlayer(player);
  const response = Response.success(PLAYER.CREATE, player);
  loginfo("Player", response.payload.name, "created!");
  socket.emit(PLAYER.RESPONSE, { response });

  // send all players
  const players = await getComplexObjectFromRedis("players");
  // const players = getPlayers();
  loginfo(players);
  socket.broadcast.emit("players:publish", { players });
  socket.emit("players:publish", { players });
};

export const handlerDeletePlayer = async (socket, { socketId }) => {
  await popPlayer(socketId);
  loginfo("Player with socketId", socketId, "deleted!");

  // send all players
  const players = await getComplexObjectFromRedis("players");
  // const players = getPlayers();
  loginfo(players);
  socket.broadcast.emit("players:publish", { players });
  socket.emit("players:publish", { players });
};
