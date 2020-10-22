import redismock from "redis-mock";
import socketIOClient from "socket.io-client";
import { setRedis, quitRedis, deleteKeyFromRedis } from "storage";
import { getPlayerId, getPlayer } from "../../../src/server/storage/players";
import {
  getLobbyIdByPlayerId,
  getLobbies,
} from "../../../src/server/storage/lobbies";
import runHttpServer, { quitHttpServer } from "httpserver";
import runSocketIo, { quitSocketIo } from "socket";
import { promiseTimeout } from "utils/promise";
import { lobby1mock, lobby2mock } from "../mocks";

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
      socketClient.off("player:response");
      done();
    });
    socketClient.emit("player:create", { name: "player1" });
  });

  test("Should subscribe to lobbies", (done) => {
    socketClient.on("lobbies:publish", (response) => {
      socketClient.off("lobbies:publish");
      done();
    });
    socketClient.on("players:publish", (response) => {
      socketClient.off("players:publish");

      done();
    });
    socketClient.emit("lobbies:subscribe");
  });

  test("Should fail to join lobby", async (done) => {
    socketClient.on("lobby:response", (response) => {
      expect(response.type).toEqual("error");
      socketClient.off("lobby:response");
      done();
    });
    const playerId = await getPlayerId(socketClient.id);
    socketClient.emit("lobby:subscribe", {
      playerId: playerId,
      lobbyId: "2",
    });
  });

  test("Should create lobby", async (done) => {
    socketClient.on("lobbies:response", (response) => {
      expect(response.type).toBe("success");
      socketClient.off("lobbies:response");
      done();
    });
    const playerId = await getPlayerId(socketClient.id);
    const player = await getPlayer(playerId);

    socketClient.emit("lobbies:add", {
      hash: "hash",
      name: "lobby1",
      maxPlayer: 4,
      owner: player,
    });
  });

  test("Should subscribe to lobby", async (done) => {
    socketClient.on("lobby:response", (response) => {
      expect(response.type).toBe("success");
      socketClient.off("lobby:response");
      done();
    });

    const playerId = await getPlayerId(socketClient.id);
    const lobbies = await getLobbies();
    const lobbyId = Object.keys(lobbies)[0];

    socketClient.emit("lobby:subscribe", {
      playerId: playerId,
      lobbyId: lobbyId,
    });
  });

  test("Should leave lobby and lobby should be deleted", async (done) => {
    socketClient.on("lobby:response", (response) => {
      expect(response.type).toBe("success");
      socketClient.off("lobby:response");
      done();
    });

    const playerId = await getPlayerId(socketClient.id);
    const lobbies = await getLobbies();
    const lobbyId = Object.keys(lobbies)[0];

    socketClient.emit("lobby:unsubscribe", {
      playerId: playerId,
      lobbyId: lobbyId,
    });
  });

  test("Should create, join and then delete lobby", async (done) => {
    socketClient.on("lobbies:response", async (response) => {
      if (response.action == "lobbies:delete") {
        expect(response.type).toBe("success");
        expect(response.payload).toEqual({});
        expect(await getLobbies()).toEqual({});

        socketClient.off("lobbies:response");
        done();
      }
      if ((response.action = "lobbies:add")) {
        subscribeToLobby();
      }
    });

    socketClient.on("lobby:response", (response) => {
      if (response.action == "lobby:subscribe") {
        deleteLobby();
        socketClient.off("lobby:response");
      }
    });

    const playerId = await getPlayerId(socketClient.id);
    const player = await getPlayer(playerId);
    socketClient.emit("lobbies:add", {
      hash: "hash",
      name: "lobby1",
      maxPlayer: 4,
      owner: player,
    });

    const subscribeToLobby = async () => {
      const playerId = await getPlayerId(socketClient.id);
      const lobbies = await getLobbies();
      const lobbyId = Object.keys(lobbies)[0];

      socketClient.emit("lobby:subscribe", {
        playerId: playerId,
        lobbyId: lobbyId,
      });
    };

    const deleteLobby = async () => {
      const playerId = await getPlayerId(socketClient.id);
      const lobbies = await getLobbies();
      const lobbyId = Object.keys(lobbies)[0];
      socketClient.emit("lobbies:delete", {
        ownerId: playerId,
        lobbyId: lobbyId,
      });
    };
  });

  test("Should send message", (done) => {
    socketClient.on("message:publish", (response) => {
      expect(response.message).toEqual("message");
      socketClient.off("message:publish");
      done();
    });
    socketClient.emit("message:send", {
      message: "message",
      player: { name: "player1" },
    });
  });

  test("Should get new pieces", (done) => {
    socketClient.on("piece:send", (response) => {
      expect(response.length).toEqual(3);
      socketClient.off("piece:send");
      done();
    });
    socketClient.emit("piece:get", { nb: 3 });
  });

  test("Should create, join and then lobby should be deleted on disconnect", async (done) => {
    socketClient.on("lobbies:response", async (response) => {
      if ((response.action = "lobbies:add")) {
        subscribeToLobby();
        socketClient.off("lobbies:response");
      }
    });

    socketClient.on("lobby:response", async (response) => {
      if (response.action == "lobby:subscribe") {
        disconnectClient();
        socketClient.off("lobby:response");
      }
    });

    const playerId = await getPlayerId(socketClient.id);
    const player = await getPlayer(playerId);
    socketClient.emit("lobbies:add", {
      hash: "hash",
      name: "lobby1",
      maxPlayer: 4,
      owner: player,
    });

    const subscribeToLobby = async () => {
      const playerId = await getPlayerId(socketClient.id);
      const lobbies = await getLobbies();
      const lobbyId = Object.keys(lobbies)[0];

      socketClient.emit("lobby:subscribe", {
        playerId: playerId,
        lobbyId: lobbyId,
      });
    };

    const disconnectClient = async () => {
      socketClient.disconnect();
      setTimeout(async () => {
        expect(await getLobbies()).toEqual({});
        done();
      }, 500);
    };
  });
});
