import { bindEvent } from "helpers/socket";
import { logerror, loginfo } from "utils/log";
import socketIO from "socket.io";

import * as piece from "socket/piece";
import * as player from "socket/player";
import * as lobbies from "socket/lobbies";
import * as lobby from "socket/lobby";
import * as message from "socket/message";
import * as disconnect from "socket/disconnect";

const handlers = Object.values({
  ...piece,
  ...player,
  ...lobbies,
  ...lobby,
  ...message,
  ...disconnect,
});

const runSocketIo = (httpServer) => {
  const io = socketIO(httpServer);

  io.on("connection", async (socket) => {
    loginfo("A new socket has connected!");

    /* Test on reconnect */
    socket.on("reconnect", (attemptNumber) => {
      loginfo(socket.id, "tried to reconnect... attemptNumber:", attemptNumber);
    });

    handlers.forEach((handler) => {
      bindEvent(socket, handler);
    });
  });

  loginfo("Sockets have been initialized!");
  return io;
};

export default runSocketIo;
