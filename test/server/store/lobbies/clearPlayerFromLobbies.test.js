import redismock from "redis-mock";
import { setRedis, quitRedis, deleteKeyFromRedis } from "storage";
import { clearPlayerFromLobbies, pushLobby } from "storage/lobbies";
import { lobby1mock, lobby2mock } from "../../mocks";
import { deepCopy } from "helpers/functional";

beforeAll(() => {
  setRedis(redismock.createClient());
});

afterAll(() => {
  quitRedis();
});

beforeEach(() => {
  deleteKeyFromRedis("lobbies");
});

describe("clearPlayerFromLobbies function", () => {
  test("Should clean owner, return lobbyId and get success", async () => {
    await pushLobby(lobby1mock, lobby1mock.owner.socketId);
    await pushLobby(lobby2mock, lobby2mock.owner.socketId);

    expect(await clearPlayerFromLobbies(lobby1mock.owner.id)).toEqual(
      lobby1mock.id,
    );
  });

  test("Should clean player, return lobbyId and get success", async () => {
    await pushLobby(lobby1mock, lobby1mock.owner.socketId);
    await pushLobby(lobby2mock, lobby2mock.owner.socketId);

    expect(
      await clearPlayerFromLobbies(lobby1mock.players[1].player.id),
    ).toEqual(lobby1mock.id);
  });

  test("Should return null and get error from leaveLobby", async () => {
    const lobby = deepCopy(lobby1mock);
    lobby.players = [lobby.players[1]];
    await pushLobby(lobby, lobby1mock.owner.socketId);

    expect(await clearPlayerFromLobbies(lobby.players[0].id)).toBeNull();
  });

  test("No player : should return null", async () => {
    await pushLobby(lobby1mock, lobby1mock.owner.socketId);

    expect(await clearPlayerFromLobbies(lobby2mock.owner.id)).toBeNull();
  });

  test("No lobbies : should return null", async () => {
    expect(await clearPlayerFromLobbies(lobby2mock.owner.id)).toBeNull();
  });
});
