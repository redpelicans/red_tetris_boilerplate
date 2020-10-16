import runRedis from "storage";
import {
  quitRedis,
  deleteKeyFromRedis,
  setComplexObjectToRedis,
} from "storage";
import Response from "models/response";
import { LOBBY } from "../../../../src/config/actions/lobby";

import { joinLobby } from "storage/lobbies";

test("joinLobby() should return a Success response", async () => {
  runRedis();

  const lobbies = {
    1: {
      id: "1",
      name: "test",
      owner: {},
      maxPlayer: 4,
      players: [{ socketId: "testSocketId" }],
    },
  };
  await setComplexObjectToRedis("lobbies", lobbies);

  const lobbytest = {
    id: "1",
    name: "test",
    owner: {},
    maxPlayer: 4,
    players: [
      { socketId: "testSocketId" },
      {
        id: "123",
        name: "123",
        socketId: "testSocketId2",
      },
    ],
  };

  const player = {
    id: "123",
    name: "123",
    socketId: "testSocketId2",
  };

  expect(await joinLobby(player, "1")).toEqual(
    Response.success(LOBBY.SUBSCRIBE, lobbytest),
  );

  await deleteKeyFromRedis("lobbies");
  quitRedis();
});

test("joinLobby() should return an Error response `you already are in another lobby`", async () => {
  runRedis();

  const lobbies = {
    1: {
      id: "1",
      name: "test",
      owner: {},
      maxPlayer: 4,
      players: [{ id: "1" }],
    },
    2: {
      id: "2",
      name: "test2",
      owner: {},
      maxPlayer: 4,
      players: [{ id: "123" }],
    },
  };
  await setComplexObjectToRedis("lobbies", lobbies);

  const player = {
    id: "123",
    name: "123",
    socketId: "testSocketId2",
  };

  expect(await joinLobby(player, "1")).toEqual(
    Response.error(LOBBY.SUBSCRIBE, "You already are in another lobby!"),
  );

  await deleteKeyFromRedis("lobbies");
  quitRedis();
});

test("joinLobby() should return an Error response `Lobby doesn't exists!`", async () => {
  runRedis();

  const lobbies = {
    1: {
      id: "1",
      name: "test",
      owner: {},
      maxPlayer: 4,
      players: [{ id: "1" }],
    },
    2: {
      id: "2",
      name: "test2",
      owner: {},
      maxPlayer: 4,
      players: [{ id: "2" }],
    },
  };
  await setComplexObjectToRedis("lobbies", lobbies);

  const player = {
    id: "123",
    name: "123",
    socketId: "testSocketId2",
  };

  expect(await joinLobby(player, "3")).toEqual(
    Response.error(LOBBY.SUBSCRIBE, "Lobby doesn't exists!"),
  );

  await deleteKeyFromRedis("lobbies");
  quitRedis();
});

test("joinLobby() should return an Error response `The lobby is full!`", async () => {
  runRedis();

  const lobbies = {
    1: {
      id: "1",
      name: "test",
      owner: {},
      maxPlayer: 4,
      players: [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }],
    },
    2: {
      id: "2",
      name: "test2",
      owner: {},
      maxPlayer: 4,
      players: [{ id: "5" }],
    },
  };
  await setComplexObjectToRedis("lobbies", lobbies);

  const player = {
    id: "123",
    name: "123",
    socketId: "testSocketId2",
  };

  expect(await joinLobby(player, "1")).toEqual(
    Response.error(LOBBY.SUBSCRIBE, "The lobby is full!"),
  );

  await deleteKeyFromRedis("lobbies");
  quitRedis();
});

test("joinLobby() should return Error response `lobby doesn't exists` no lobbies", async () => {
  runRedis();

  const player = {
    id: "123",
    name: "123",
    socketId: "testSocketId2",
  };

  expect(await joinLobby(player, "1")).toEqual(
    Response.error(LOBBY.SUBSCRIBE, "Lobby doesn't exists!"),
  );

  await deleteKeyFromRedis("lobbies");
  quitRedis();
});
