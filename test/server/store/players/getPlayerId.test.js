import redismock from "redis-mock";
import { getPlayerId, pushPlayer } from "storage/players";
import { setRedis, quitRedis, deleteKeyFromRedis } from "storage";
import Player from "models/player";
import { player1mock } from "../../mocks";

beforeAll(() => {
  setRedis(redismock.createClient());
});

afterAll(() => {
  deleteKeyFromRedis("players");
  quitRedis();
});

describe("getPlayerId function", () => {
  test("No players, should return null", async () => {
    expect(await getPlayerId("1")).toEqual(null);
  });

  test("player1 added should return a Player", async () => {
    const player = new Player(player1mock);

    await pushPlayer(player);
    expect(await getPlayerId(player.socketId)).toEqual(player.id);
  });

  test("player2 not added, should return null", async () => {
    expect(await getPlayerId("2")).toBe(null);
  });
});
