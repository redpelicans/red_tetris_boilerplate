import redismock from "redis-mock";
import { getLobbies, pushLobby } from "storage/lobbies";
import { quitRedis, setRedis, deleteKeyFromRedis } from "storage";
import { lobby1mock } from "../../mocks";

beforeAll(() => {
  setRedis(redismock.createClient());
});

afterAll(() => {
  deleteKeyFromRedis("lobbies");
  quitRedis();
});

describe("getLobbies function", () => {
  test("No lobbies, should return {}", async () => {
    expect(await getLobbies()).toEqual({});
  });

  test("lobby1 added, should return lobbies with a lobby", async () => {
    await pushLobby(lobby1mock, lobby1mock.owner.socketId);
    const lobbies = {};
    lobbies[lobby1mock.id] = lobby1mock;

    expect(await getLobbies(lobby1mock.id)).toEqual(lobbies);
  });
});
