import redismock from "redis-mock";
import { popPlayer } from "storage/players";
import {
  quitRedis,
  setRedis,
  deleteKeyFromRedis,
  setComplexObjectToRedis,
  getComplexObjectFromRedis,
} from "storage";

beforeAll(() => {
  setRedis(redismock.createClient());
});

afterAll(() => {
  quitRedis();
});

beforeEach(() => {
  deleteKeyFromRedis("players");
});

test("popPlayer() should pop", async () => {
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
});

test("popPlayer() should return null", async () => {
  expect(await popPlayer("1")).toEqual(null);
});
