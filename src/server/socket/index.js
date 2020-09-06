import { createEvent, bindEvent } from "./../helpers/socket";
import * as piece from "./piece";
import { logerror, loginfo } from "../log";

const handlers = Object.values({
  ...piece,
});

const runSocketIo = (params) => {
  const promise = new Promise((resolve, reject) => {
    const io = require("socket.io")(params.httpServer);

    io.on("connection", (socket) => {
      loginfo("A new user has connected!");
      handlers.forEach((handler) => {
        bindEvent(socket, handler);
      });
    });

    resolve({ ...params, io: io });
  });

  return promise;
};

export default runSocketIo;
