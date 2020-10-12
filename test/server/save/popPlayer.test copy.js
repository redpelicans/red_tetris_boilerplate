import { popPlayer } from "storage/players";
import {
  quitRedis,
  deleteKeyFromRedis,
  setComplexObjectToRedis,
  getComplexObjectFromRedis,
} from "storage";
import runRedis from "storage";
import Response from "models/response";
import { PLAYER } from "../../../../src/config/actions/player";

test("popPlayer() should pop", async () => {
  await runRedis();

  const players = {
    7: {
      id: "7",
      name: "test7",
      socketId: "si7",
    },
    8: {
      id: "8",
      name: "test8",
      socketId: "si8",
    },
  };
  await setComplexObjectToRedis("players", players);
  await popPlayer("8");

  const playersFinal = await getComplexObjectFromRedis("players");

  expect(playersFinal["8"]).toEqual(undefined);

  await deleteKeyFromRedis("players");
  quitRedis();
});

test("popPlayer() should return null", async () => {
  await runRedis();

  expect(await popPlayer("1")).toEqual(null);

  await deleteKeyFromRedis("players");
  quitRedis();
});
