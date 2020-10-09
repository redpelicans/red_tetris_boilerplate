import { getPlayer, pushPlayer } from "store/players";
import {
  quitRedis,
  deleteKeyFromRedis,
  setComplexObjectToRedis,
} from "../../../../src/server/store";
import runRedis from "../../../../src/server/store";

test("getPlayer() should return undefined", async () => {
  runRedis();

  expect(await getPlayer("56")).toEqual(undefined);

  quitRedis();
});

test("getPlayer() should return a Player", async () => {
  runRedis();

  const player = {
    id: "1",
    name: "test",
    socketId: "si1",
  };

  await pushPlayer(player);
  expect(await getPlayer("1")).toEqual(player);

  deleteKeyFromRedis("players");
  quitRedis();
});

test("getPlayer() should return null", async () => {
  runRedis();

  expect(await getPlayer("2")).toBe(undefined);

  deleteKeyFromRedis("players");
  quitRedis();
});
