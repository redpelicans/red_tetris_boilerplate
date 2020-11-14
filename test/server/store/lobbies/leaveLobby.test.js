import redismock from "redis-mock";
import { quitRedis, setRedis, deleteKeyFromRedis } from "storage";
import Response from "models/response";
import { LOBBY } from "../../../../src/config/actions/lobby";
import { leaveLobby, pushLobby, getLobbies } from "storage/lobbies";
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

describe("leaveLobby function", () => {
  test("Should return a Success response", async () => {
    await pushLobby(lobby1mock, lobby1mock.owner.socketId);
    await pushLobby(lobby2mock, lobby2mock.owner.socketId);

    expect(
      await leaveLobby(lobby1mock.players[1].player.id, lobby1mock.id),
    ).toEqual(Response.success(LOBBY.UNSUBSCRIBE, {}));
  });

  test("No lobby : Should return an Error `Lobby doesn't exists`", async () => {
    await pushLobby(lobby1mock, lobby1mock.owner.socketId);

    expect(await leaveLobby(lobby2mock.players[1].id, lobby2mock.id)).toEqual(
      Response.error(LOBBY.UNSUBSCRIBE, "Lobby doesn't exists!"),
    );
  });

  test("No lobbies : Should return Error `Lobby doesn't exists`", async () => {
    expect(
      await leaveLobby(lobby1mock.players[1].player.id, lobby1mock.id),
    ).toEqual(Response.error(LOBBY.UNSUBSCRIBE, "Lobby doesn't exists!"));
  });

  test("Should return a Success response 2", async () => {
    await pushLobby(lobby1mock, lobby1mock.owner.socketId);

    expect(await leaveLobby(lobby1mock.owner.id, lobby1mock.id)).toEqual(
      Response.success(LOBBY.UNSUBSCRIBE, {}),
    );

    expect(
      await leaveLobby(lobby1mock.players[1].player.id, lobby1mock.id),
    ).toEqual(Response.success(LOBBY.UNSUBSCRIBE, {}));
  });

  test("Should return an Error response `last but not owner`", async () => {
    const lobby = deepCopy(lobby1mock);
    lobby.players = [lobby.players[1]];
    await pushLobby(lobby, lobby1mock.owner.socketId);

    expect(await leaveLobby(lobby.players[0].id, lobby1mock.id)).toEqual(
      Response.error(
        LOBBY.UNSUBSCRIBE,
        "You are the last player but not the owner there is a problem!",
      ),
    );
  });

  test("Should return a Success response and change owner", async () => {
    const lobby = deepCopy(lobby1mock);
    await pushLobby(lobby, lobby.owner.socketId);

    expect(await leaveLobby(lobby.owner.id, lobby.id)).toEqual(
      Response.success(LOBBY.UNSUBSCRIBE, {}),
    );

    const lobbies = await getLobbies();

    expect(lobbies[lobby.id].owner.id).toEqual(lobby1mock.players[1].player.id);
  });
});
