import redismock from "redis-mock";
import { setRedis, quitRedis, deleteKeyFromRedis } from "storage";
import Response from "models/response";
import { LOBBIES } from "../../../../src/config/actions/lobbies";
import { pushLobby } from "storage/lobbies";
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

describe("pushLobby function", () => {
  test("Should return a Success response", async () => {
    expect(await pushLobby(lobby1mock, lobby1mock.owner.socketId)).toEqual(
      Response.success(LOBBIES.ADD, lobby1mock),
    );
  });

  test("Should return an Error `already on another lobby` response", async () => {
    expect(await pushLobby(lobby1mock, lobby1mock.owner.socketId)).toEqual(
      Response.success(LOBBIES.ADD, lobby1mock),
    );

    expect(await pushLobby(lobby2mock, lobby1mock.owner.socketId)).toEqual(
      Response.error(LOBBIES.ADD, "You already have an active lobby !"),
    );
  });

  test("Should return an Error `lobbyName not available` response", async () => {
    expect(await pushLobby(lobby1mock, lobby1mock.owner.socketId)).toEqual(
      Response.success(LOBBIES.ADD, lobby1mock),
    );

    expect(await pushLobby(lobby1mock, lobby2mock.owner.socketId)).toEqual(
      Response.error(LOBBIES.ADD, "lobbyName is not available!"),
    );
  });
});
