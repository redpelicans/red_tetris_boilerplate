import { getLobby, pushLobby } from "store/lobbies";
import runRedis from "../../../../src/server/store";
import {
  quitRedis,
  deleteKeyFromRedis,
  setComplexObjectToRedis,
} from "../../../../src/server/store";

test("getLobby() should return undefined", async () => {
  runRedis();

  expect(await getLobby("56")).toEqual(undefined);

  quitRedis();
});

test("getLobby() should return a Lobby", async () => {
  runRedis();

  const lobby = {
    id: "1",
    name: "test",
    owner: {},
    players: [{}],
  };

  await pushLobby(lobby, "testSocketId");
  expect(await getLobby("1")).toEqual(lobby);

  deleteKeyFromRedis("lobbies");
  quitRedis();
});

test("getLobby() should return null", async () => {
  runRedis();

  const lobby = {
    id: "1",
    name: "test",
    owner: {},
    players: [{}],
  };

  await pushLobby(lobby, "testSocketId");
  expect(await getLobby("2")).toBe(undefined);

  deleteKeyFromRedis("lobbies");
  quitRedis();
});
