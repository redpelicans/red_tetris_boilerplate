import redismock from "redis-mock";
import { getPlayers, pushPlayer } from "storage/players";
import { quitRedis, setRedis, deleteKeyFromRedis } from "storage";
import Player from "models/player";
import { player1mock } from "../../mocks";

beforeAll(() => {
  setRedis(redismock.createClient());
});

afterAll(() => {
  deleteKeyFromRedis("players");
  quitRedis();
});

describe("getPlayers function", () => {
  test("No players, should return {}", async () => {
    expect(await getPlayers("1")).toEqual({});
  });

  test("player1 added, should return players with player1", async () => {
    const player = new Player(player1mock);
    await pushPlayer(player);

    const players = {};
    players[player.id] = player;
    expect(await getPlayers(player.id)).toEqual(players);
  });
});
