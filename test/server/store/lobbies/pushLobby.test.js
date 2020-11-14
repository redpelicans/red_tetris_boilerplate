import redismock from "redis-mock";
import { setRedis, quitRedis, deleteKeyFromRedis } from "storage";
import Response from "models/response";
import { LOBBIES } from "../../../../src/config/actions/lobbies";
import { pushLobby } from "storage/lobbies";
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

describe("pushLobby function", () => {
  test("Should return a Success response", async () => {
    expect(await pushLobby(lobby1mock, lobby1mock.owner.socketId)).toEqual(
      Response.success(LOBBIES.ADD, lobby1mock),
    );
  });

  test("Should return `already on another lobby` response", async () => {
    expect(await pushLobby(lobby1mock, lobby1mock.owner.socketId)).toEqual(
      Response.success(LOBBIES.ADD, lobby1mock),
    );

    expect(await pushLobby(lobby2mock, lobby1mock.owner.socketId)).toEqual(
      Response.error(LOBBIES.ADD, "You already have an active lobby !"),
    );
  });

  test("Should return an Error `Invalid lobby name` response", async () => {
    const lobby = deepCopy(lobby1mock);
    lobby.name = "lo bby1";

    expect(await pushLobby(lobby, lobby.owner.socketId)).toEqual(
      Response.error(LOBBIES.ADD, "Invalid lobby name !"),
    );

    lobby.name = "lo";
    expect(await pushLobby(lobby, lobby.owner.socketId)).toEqual(
      Response.error(LOBBIES.ADD, "Invalid lobby name !"),
    );

    lobby.name = "lobby1lobby1lobby1a";
    expect(await pushLobby(lobby, lobby.owner.socketId)).toEqual(
      Response.error(LOBBIES.ADD, "Invalid lobby name !"),
    );
  });

  test("Should return an Error `Invalid max players` response", async () => {
    const lobby = deepCopy(lobby1mock);
    lobby.maxPlayer = 0;

    expect(await pushLobby(lobby, lobby.owner.socketId)).toEqual(
      Response.error(LOBBIES.ADD, "Invalid max players !"),
    );

    lobby.maxPlayer = 1;
    expect(await pushLobby(lobby, lobby.owner.socketId)).toEqual(
      Response.error(LOBBIES.ADD, "Invalid max players !"),
    );

    lobby.maxPlayer = 18;
    expect(await pushLobby(lobby, lobby.owner.socketId)).toEqual(
      Response.error(LOBBIES.ADD, "Invalid max players !"),
    );
  });

  test("Should return an Error `lobbyName not available` response", async () => {
    expect(await pushLobby(lobby1mock, lobby1mock.owner.socketId)).toEqual(
      Response.success(LOBBIES.ADD, lobby1mock),
    );

    expect(await pushLobby(lobby1mock, lobby2mock.owner.socketId)).toEqual(
      Response.error(LOBBIES.ADD, "lobbyName is not available !"),
    );
  });
});
