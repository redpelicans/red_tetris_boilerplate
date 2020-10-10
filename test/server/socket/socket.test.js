import SocketMock from "socket.io-mock";
import { bindEvent } from "socket/helpers/socket";
import runRedis from "storage";

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

let socket;

beforeAll((done) => {
  runRedis();
  socket = new SocketMock();

  handlers.forEach((handler) => {
    bindEvent(socket, handler);
  });
  done();
});

describe("basic socket.io example", () => {
  test("Should create a player", (done) => {
    socket.socketClient.on("player:response", (message) => {
      expect(message.type).toBe("success");
      done();
    });
    socket.socketClient.emit("player:create", "nico");
  });
  //   test("Should create a player", (done) => {
  //     socket.socketClient.on("player:response", (message) => {
  //       expect(message.type).toBe("error");
  //       done();
  //     });
  //     socket.socketClient.emit("player:create", "nico");
  //   });
  test("Should get new pieces", (done) => {
    socket.socketClient.on("piece:send", (message) => {
      expect(message.length).toEqual(3);
      done();
    });
    socket.socketClient.emit("piece:get", { nb: 3 });
  });
});
