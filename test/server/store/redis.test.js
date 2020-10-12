import { getLobby, pushLobby } from "storage/lobbies";
import runRedis, { redisClient } from "storage";
import { quitRedis, deleteKeyFromRedis } from "storage";

beforeAll((done) => {
  runRedis().then(() => done());
});

afterAll(() => {
  quitRedis();
});

test("redisClient shoud be connected", async () => {
  expect(redisClient.connected).toEqual(true);
});
