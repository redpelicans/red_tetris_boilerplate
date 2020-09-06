import { createEvent, bindEvent } from "./../helpers/socket";
import * as piece from "./piece";
import { logerror, loginfo } from "../log";
import socketIO from "socket.io";

const handlers = Object.values({
  ...piece,
});

const runSocketIo = (params) => {
  const io = socketIO(params.httpServer);

  io.on("connection", (socket) => {
    loginfo("A new user has connected!");
    handlers.forEach((handler) => {
      bindEvent(socket, handler);
    });
  });

  loginfo("Server launched and ready!");
  return { ...params, io };
};

export default runSocketIo;
