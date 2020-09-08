import { createEvent, bindEvent } from "helpers/socket";
import * as piece from "socket/piece";
import * as player from "socket/player";
import * as players from "socket/players";
import * as lobbies from "socket/lobbies";

import { PLAYERS } from "./../../config/actions/players";
import { LOBBIES } from "./../../config/actions/lobbies";
import { getLobbies } from "service/lobbies";
import { getPlayers, popPlayer } from "service/players";

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

  io.on("connection", (socket) => {
    loginfo("A new user has connected!");

    // Test on connection
    const players = getPlayers();
    socket.emit(PLAYERS.PUBLISH, { players });
    const lobbies = getLobbies();
    socket.emit(LOBBIES.PUBLISH, { lobbies });

    // Test on disconnect
    socket.on("disconnect", (reason) => {
      loginfo(socket.id, "disconnect with reason", reason);
      if (reason === "io server disconnect") {
        // the disconnection was initiated by the server, you need to reconnect manually
        socket.connect();
      }
      // else the socket will automatically try to reconnect

      popPlayer(socket.id);
      const players = getPlayers();
      socket.broadcast.emit(PLAYERS.PUBLISH, { players });
    });

    // Test on reconnect
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
