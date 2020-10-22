import redismock from "redis-mock";
import { quitRedis, setRedis, deleteKeyFromRedis } from "storage";
import Response from "models/response";
import { LOBBIES } from "../../../../src/config/actions/lobbies";
import { popLobby, pushLobby } from "storage/lobbies";
import { lobby1mock, lobby2mock } from "../../mocks";

beforeAll(() => {
  setRedis(redismock.createClient());
});

afterAll(() => {
  quitRedis();
});

beforeEach(() => {
  deleteKeyFromRedis("lobbies");
});

describe("popLobby function", () => {
  test("Should return a Success response", async () => {
    await pushLobby(lobby1mock, lobby1mock.owner.socketId);
    expect(await popLobby(lobby1mock.id, lobby1mock.owner.id)).toEqual(
      Response.success(LOBBIES.DELETE, {}),
    );
  });

  test("No lobbies : should return an Error response `lobby doesn't exists`", async () => {
    expect(await popLobby(lobby1mock.id, lobby1mock.owner.id)).toEqual(
      Response.error(LOBBIES.DELETE, "Lobby doesn't exists!"),
    );
  });

  test("No lobby : should return an Error response `lobby doesn't exists`", async () => {
    await pushLobby(lobby1mock, lobby1mock.owner.socketId);
    expect(await popLobby(lobby2mock.id, lobby2mock.owner.id)).toEqual(
      Response.error(LOBBIES.DELETE, "Lobby doesn't exists!"),
    );
  });

  test("Should return an Error response `You are not the owner`", async () => {
    await pushLobby(lobby1mock, lobby1mock.owner.socketId);
    expect(await popLobby(lobby1mock.id, lobby2mock.owner.id)).toEqual(
      Response.error(LOBBIES.DELETE, "You are not the owner of this lobby!"),
    );
  });
});
