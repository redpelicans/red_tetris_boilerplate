import { getPlayerId, pushPlayer } from "storage/players";
import {
  quitRedis,
  deleteKeyFromRedis,
  setComplexObjectToRedis,
} from "storage";
import runRedis from "storage";

test("getPlayerId() should return null", async () => {
  await runRedis();

  expect(await getPlayerId("56")).toEqual(null);

  quitRedis();
});

test("getPlayerId() should return a Player", async () => {
  await runRedis();

  const players = {
    2: {
      id: "2",
      name: "test2",
      socketId: "si2",
    },
    3: {
      id: "3",
      name: "test3",
      socketId: "si3",
    },
  };
  await setComplexObjectToRedis("players", players);

  expect(await getPlayerId("si2")).toEqual("2");

  deleteKeyFromRedis("players");
  quitRedis();
});
