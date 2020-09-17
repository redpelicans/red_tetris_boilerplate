import { createEvent, bindEvent } from "helpers/socket";
import * as piece from "socket/piece";
import * as player from "socket/player";
import * as players from "socket/players";
import * as lobbies from "socket/lobbies";
import { LOBBIES } from "./../../config/actions/lobbies";
import { getPlayers, popPlayer, getPlayerId } from "store/players";
import { getComplexObjectFromRedis } from "store";
import { logerror, loginfo } from "utils/log";
import socketIO from "socket.io";

const handlers = Object.values({
  ...piece,
  ...player,
  ...players,
  ...lobbies,
});

const runSocketIo = (httpServer) => {
  const io = socketIO(httpServer);

  io.on("connection", async (socket) => {
    loginfo("A new user has connected!");

    /* Test on connection */
    const players = await getComplexObjectFromRedis("players");
    socket.emit("players:publish", { players });

    const lobbies = await getComplexObjectFromRedis("lobbies");
    socket.emit(LOBBIES.PUBLISH, { lobbies });

    /* Test on disconnect */
    socket.on("disconnect", async (reason) => {
      loginfo(socket.id, "disconnect with reason", reason);
      if (reason === "io server disconnect") {
        /* the disconnection was initiated by the server, you need to reconnect manually */
        socket.connect();
      }
      /* else the socket will automatically try to reconnect */
      console.log(socket.id);
      const playerId = await getPlayerId(socket.id);
      console.log("I got playerId", playerId);
      await popPlayer(playerId);

      /* const players = getPlayers(); */
      const players = await getComplexObjectFromRedis("players");
      socket.emit("players:publish", { players });
      socket.broadcast.emit("players:publish", { players });
    });

    /* Test on reconnect */
    socket.on("reconnect", (attemptNumber) => {
      loginfo(socket.id, "tried to reconnect... attemptNumber:", attemptNumber);
    });

    handlers.forEach((handler) => {
      bindEvent(socket, handler);
    });
  });

  loginfo("Sockets have been initialized!");
  return { httpServer, io };
};

export default runSocketIo;
