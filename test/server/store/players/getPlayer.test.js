import redismock from "redis-mock";
import { getPlayer, pushPlayer } from "storage/players";
import { quitRedis, setRedis, deleteKeyFromRedis } from "storage";

beforeAll(() => {
  setRedis(redismock.createClient());
});

afterAll(() => {
  quitRedis();
});

beforeEach(() => {
  deleteKeyFromRedis("players");
});

test("getPlayer() should return undefined", async () => {
  expect(await getPlayer("56")).toEqual(undefined);
});

test("getPlayer() should return a Player", async () => {
  const player = {
    id: "1",
    name: "test",
    socketId: "si1",
  };

  await pushPlayer(player);
  expect(await getPlayer("1")).toEqual(player);
});

test("getPlayer() should return null", async () => {
  expect(await getPlayer("2")).toBe(undefined);
});
