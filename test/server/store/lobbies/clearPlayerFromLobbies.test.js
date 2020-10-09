import runRedis from "../../../../src/server/store";
import {
  quitRedis,
  deleteKeyFromRedis,
  setComplexObjectToRedis,
} from "../../../../src/server/store";

import { clearPlayerFromLobbies } from "store/lobbies";

test("clearPlayerFromLobbies() should return lobbyId and get success from leaveLobby", async () => {
  runRedis();

  const lobbies = {
    1: {
      id: "1",
      name: "test",
      owner: { id: "2" },
      maxPlayer: 4,
      players: [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }],
    },
    2: {
      id: "2",
      name: "test2",
      owner: { id: "5" },
      maxPlayer: 4,
      players: [{ id: "5" }],
    },
  };
  await setComplexObjectToRedis("lobbies", lobbies);

  expect(await clearPlayerFromLobbies("1")).toEqual("1");

  await deleteKeyFromRedis("lobbies");
  quitRedis();
});

test("clearPlayerFromLobbies() should return null and get error from leaveLobby", async () => {
  runRedis();

  const lobbies = {
    1: {
      id: "1",
      name: "test",
      owner: { id: "2" },
      maxPlayer: 4,
      players: [{ id: "12" }],
    },
    2: {
      id: "2",
      name: "test2",
      owner: { id: "5" },
      maxPlayer: 4,
      players: [{ id: "5" }],
    },
  };
  await setComplexObjectToRedis("lobbies", lobbies);

  expect(await clearPlayerFromLobbies("12")).toEqual(null);

  await deleteKeyFromRedis("lobbies");
  quitRedis();
});

test("clearPlayerFromLobbies() should return null", async () => {
  runRedis();

  const lobbies = {
    1: {
      id: "1",
      name: "test",
      owner: { id: "2" },
      maxPlayer: 4,
      players: [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }],
    },
    2: {
      id: "2",
      name: "test2",
      owner: { id: "5" },
      maxPlayer: 4,
      players: [{ id: "5" }],
    },
  };
  await setComplexObjectToRedis("lobbies", lobbies);

  expect(await clearPlayerFromLobbies("12")).toEqual(null);

  await deleteKeyFromRedis("lobbies");
  quitRedis();
});

test("clearPlayerFromLobby() should return null no lobbies", async () => {
  runRedis();

  expect(await clearPlayerFromLobbies("6")).toEqual(null);

  await deleteKeyFromRedis("lobbies");
  quitRedis();
});
