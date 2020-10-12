import runRedis from "storage";
import {
  quitRedis,
  deleteKeyFromRedis,
  setComplexObjectToRedis,
} from "storage";
import Response from "models/response";
import { LOBBIES } from "../../../../src/config/actions/lobbies";
import { popLobby } from "storage/lobbies";

test("popLobby() should return a Success response", async () => {
  runRedis();

  const lobbies = {
    1: {
      id: "1",
      name: "test",
      owner: { id: "ownerId" },
      players: [{ socketId: "testSocketId" }],
    },
  };
  await setComplexObjectToRedis("lobbies", lobbies);

  expect(await popLobby("1", "ownerId")).toEqual(
    Response.success(LOBBIES.DELETE, {}),
  );

  await deleteKeyFromRedis("lobbies");
  quitRedis();
});

test("popLobby() should return an Error response `lobby doesn't exists`", async () => {
  runRedis();

  const lobbies = {
    2: {
      id: "2",
      name: "test",
      owner: { id: "ownerId" },
      players: [{ socketId: "testSocketId" }],
    },
  };
  await setComplexObjectToRedis("lobbies", lobbies);

  expect(await popLobby("1", "ownerId")).toEqual(
    Response.error(LOBBIES.DELETE, "Lobby doesn't exists!"),
  );

  await deleteKeyFromRedis("lobbies");
  quitRedis();
});

test("popLobby() should return an Error response `You are not the owner`", async () => {
  runRedis();

  const lobbies = {
    1: {
      id: "1",
      name: "test",
      owner: { id: "testID" },
      players: [{ socketId: "testSocketId" }],
    },
  };
  await setComplexObjectToRedis("lobbies", lobbies);

  expect(await popLobby("1", "ownerId")).toEqual(
    Response.error(LOBBIES.DELETE, "You are not the owner of this lobby!"),
  );

  await deleteKeyFromRedis("lobbies");
  quitRedis();
});

test("popLobby() should return Error response `lobby doesn't exists` no lobbies", async () => {
  runRedis();

  expect(await popLobby("1", "ownerId")).toEqual(
    Response.error(LOBBIES.DELETE, "Lobby doesn't exists!"),
  );

  await deleteKeyFromRedis("lobbies");
  quitRedis();
});
