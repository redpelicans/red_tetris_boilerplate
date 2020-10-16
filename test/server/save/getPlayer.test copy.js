import { getPlayer, pushPlayer } from "storage/players";
import {
  quitRedis,
  deleteKeyFromRedis,
  setComplexObjectToRedis,
} from "storage";
import runRedis from "storage";

test("getPlayer() should return undefined", async () => {
  await runRedis();

  expect(await getPlayer("56")).toEqual(undefined);

  quitRedis();
});

test("getPlayer() should return a Player", async () => {
  await runRedis();

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
  await runRedis();

  expect(await getPlayer("2")).toBe(undefined);

  deleteKeyFromRedis("players");
  quitRedis();
});
