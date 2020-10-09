import { getLobby, pushLobby } from "store/lobbies";
import runRedis, { quitRedis, deleteKeyFromRedis } from "store";

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
