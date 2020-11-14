import runRedis, { redisClient } from "storage";
import { quitRedis } from "storage";

beforeAll((done) => {
  runRedis().then(() => done());
});

afterAll(() => {
  quitRedis();
});

test("redisClient shoud be connected", async () => {
  expect(redisClient.connected).toEqual(true);
});
