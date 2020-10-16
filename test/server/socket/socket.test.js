import redismock from "redis-mock";
import socketIOClient from "socket.io-client";
import { quitRedis, setRedis } from "storage";
import { getPlayerId } from "../../../src/server/storage/players";
import runHttpServer, { quitHttpServer } from "httpserver";
import runSocketIo, { quitSocketIo } from "socket";
import { promiseTimeout } from "utils/promise";

let socketClient;

beforeAll(async (done) => {
  try {
    const httpServer = await promiseTimeout(
      runHttpServer,
      "Failed to run runHttpServer within 5 seconds.",
    );
    runSocketIo(httpServer);
    setRedis(redismock.createClient());
    socketClient = socketIOClient("http://0.0.0.0:3004");
  } catch (error) {
    console.log("Promise rejected:", error);
  }
  done();
});

afterAll(async (done) => {
  quitRedis();
  socketClient.close();
  try {
    await promiseTimeout(
      quitSocketIo,
      "Failed to run quitSocketIo within 5 seconds.",
    );
    await promiseTimeout(
      quitHttpServer,
      "Failed to run quitHttpServer within 5 seconds.",
    );
  } catch (error) {
    console.log("Promise rejected:", error);
  }
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

  test("Should subscribe to lobbies", (done) => {
    socketClient.on("lobbies:publish", (response) => {
      // if (response != null) expect(Object.keys(response)[0]).toBe(null);
      // const key = Object.keys(response)[0];
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

  test("Should fail to join lobby", async (done) => {
    socketClient.on("lobby:response", (response) => {
      expect(response.type).toEqual("error");
      done();
    });
    const playerId = await getPlayerId(socketClient.id);
    socketClient.emit("lobby:subscribe", {
      playerId: playerId,
      lobbyId: "12",
    });
  });

  test("Should send message", (done) => {
    socketClient.on("message:publish", (response) => {
      expect(response.message).toEqual("SALUT");
      done();
    });
    socketClient.emit("message:send", {
      message: "SALUT",
      player: { name: "nico" },
    });
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
