import runRedis from "../../../../src/server/store";
import {
  quitRedis,
  deleteKeyFromRedis,
  setComplexObjectToRedis,
  getComplexObjectFromRedis,
} from "../../../../src/server/store";
import Response from "models/response";
import { LOBBY } from "../../../../src/config/actions/lobby";

import { leaveLobby } from "store/lobbies";

test("leaveLobby() should return a Success response", async () => {
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

  expect(await leaveLobby("1", "1")).toEqual(
    Response.success(LOBBY.UNSUBSCRIBE, {}),
  );

  await deleteKeyFromRedis("lobbies");
  quitRedis();
});

test("leaveLobby() should return an Error response `Lobby doesn't exists`", async () => {
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

  expect(await leaveLobby("1", "3")).toEqual(
    Response.error(LOBBY.UNSUBSCRIBE, "Lobby doesn't exists!"),
  );

  await deleteKeyFromRedis("lobbies");
  quitRedis();
});

test("leaveLobby() should return a Success response and remove lobby", async () => {
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
      owner: { socketId: "dd", id: "5" },
      maxPlayer: 4,
      players: [{ socketId: "dd", id: "5" }],
    },
  };
  await setComplexObjectToRedis("lobbies", lobbies);

  expect(await leaveLobby("5", "2")).toEqual(
    Response.success(LOBBY.UNSUBSCRIBE, {}),
  );

  await deleteKeyFromRedis("lobbies");
  quitRedis();
});

test("leaveLobby() should return an Error response `last but not owner`", async () => {
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
      owner: { socketId: "dd", id: "2" },
      maxPlayer: 4,
      players: [{ socketId: "dd", id: "5" }],
    },
  };
  await setComplexObjectToRedis("lobbies", lobbies);

  expect(await leaveLobby("5", "2")).toEqual(
    Response.error(
      LOBBY.UNSUBSCRIBE,
      "You are the last player but not the owner there is a problem!",
    ),
  );

  await deleteKeyFromRedis("lobbies");
  quitRedis();
});

test("leaveLobby() should return a Success response and change owner", async () => {
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
      owner: { socketId: "ddw", id: "6" },
      maxPlayer: 4,
      players: [
        { socketId: "ddw", id: "6" },
        { socketId: "ddq", id: "5" },
        { socketId: "dda", id: "7" },
      ],
    },
  };
  await setComplexObjectToRedis("lobbies", lobbies);

  expect(await leaveLobby("6", "2")).toEqual(
    Response.success(LOBBY.UNSUBSCRIBE, {}),
  );

  const lobbiesFinal = await getComplexObjectFromRedis("lobbies", lobbies);
  expect(lobbiesFinal[2].owner.id).toEqual("5");

  await deleteKeyFromRedis("lobbies");
  quitRedis();
});

test("leaveLobby() should return Error response `lobby doesn't exists` no lobbies", async () => {
  runRedis();

  const player = {
    id: "123",
    name: "123",
    socketId: "testSocketId2",
  };

  expect(await leaveLobby("6", "2")).toEqual(
    Response.error(LOBBY.UNSUBSCRIBE, "Lobby doesn't exists!"),
  );

  await deleteKeyFromRedis("lobbies");
  quitRedis();
});
