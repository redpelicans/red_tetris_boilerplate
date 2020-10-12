import runServer, { killServer } from "run";
import socketIOClient from "socket.io-client";
import {
  quitRedis,
  setComplexObjectToRedis,
  setRedis,
  deleteKeyFromRedis,
} from "storage";
import { getPlayerId } from "../../../src/server/storage/players";
import runHttpServer, { quitHttpServer } from "httpserver";
import runSocketIo, { quitSocketIo } from "socket";
import redismock from "redis-mock";

let socketClient;

beforeAll((done) => {
  runHttpServer().then((httpServer) => runSocketIo(httpServer));
  setRedis(redismock.createClient());
  socketClient = socketIOClient("http://0.0.0.0:3004");
  done();
});

afterAll(async (done) => {
  quitRedis();
  socketClient.close();
  await quitSocketIo();
  await quitHttpServer();
  done();
});

beforeEach(() => {
  // socketClient = socketIOClient("http://0.0.0.0:3004");
  // deleteKeyFromRedis("lobbies");
  // deleteKeyFromRedis("players");
});

afterEach(() => {
  // socketClient.close();
});

describe("Socket tests", () => {
  test("Should create a player", (done) => {
    socketClient.on("player:response", (response) => {
      expect(response.type).toBe("success");
      done();
    });
    socketClient.emit("player:create", "nico");
  });

  test("Should get lobbies", (done) => {
    socketClient.on("lobbies:publish", (response) => {
      // expect(response).toBe(null);
      done();
    });
    socketClient.emit("lobbies:subscribe");
  });

  test("Should create lobby", (done) => {
    socketClient.on("lobbies:response", (response) => {
      expect(response.type).toBe("success");
      done();
    });
    socketClient.emit("lobbies:add", {
      hash: "hash",
      name: "name",
      maxPlayer: 4,
      owner: { name: "nico" },
    });
  });

  test("Should join lobby", async (done) => {
    socketClient.on("lobby:response", (response) => {
      // expect(response.type).toBe("success");
      done();
    });
    const playerId = await getPlayerId(socketClient.id);
    socketClient.emit("lobby:subscribe", {
      playerId: playerId,
      lobbyId: "12",
    });
  });

  test("Should send message", (done) => {
    // socketClient.on("lobbies:publish", (response) => {
    // expect(response).toBe(null);
    // done();
    // });
    socketClient.emit("message:send");
    done();
  });

  test("Should get new pieces", (done) => {
    socketClient.on("piece:send", (response) => {
      expect(response.length).toEqual(3);
      done();
    });
    socketClient.emit("piece:get", { nb: 3 });
  });
});
