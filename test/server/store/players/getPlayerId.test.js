import redismock from "redis-mock";
import { getPlayerId } from "storage/players";
import {
  setRedis,
  quitRedis,
  setComplexObjectToRedis,
  deleteKeyFromRedis,
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

test("getPlayerId() should return null", async () => {
  expect(await getPlayerId("56")).toEqual(null);
});

test("getPlayerId() should return a Player", async () => {
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
});
