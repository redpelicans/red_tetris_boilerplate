import redismock from "redis-mock";
import { setRedis, quitRedis, deleteKeyFromRedis } from "storage";
import Response from "models/response";
import { LOBBY } from "../../../../src/config/actions/lobby";
import { readyLobby, pushLobby } from "storage/lobbies";
import {
  lobby1mock,
  lobby2mock,
  playerObject3mock,
  playerObject4mock,
} from "../../mocks";
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

describe("readyLobby function", () => {
  test("Should return a Success response", async () => {
    await pushLobby(lobby1mock, lobby1mock.owner.socketId);

    expect(
      await readyLobby(lobby1mock.players[1].player.id, lobby1mock.id),
    ).toEqual(Response.success(LOBBY.READY, {}));
  });

  test("Should return an Error response `You are not in this lobby!`", async () => {
    await pushLobby(lobby1mock, lobby1mock.owner.socketId);

    expect(await readyLobby(playerObject3mock.id, lobby1mock.id)).toEqual(
      Response.error(LOBBY.READY, "You are not in this lobby!"),
    );
  });

  test("No lobbies : should return an Error response `Lobby doesn't exists!`", async () => {
    expect(
      await readyLobby(lobby1mock.players[1].player.id, lobby1mock.id),
    ).toEqual(Response.error(LOBBY.READY, "Lobby doesn't exists!"));
  });

  test("No lobby : should return an Error response `Lobby doesn't exists!`", async () => {
    await pushLobby(lobby1mock, lobby1mock.owner.socketId);

    expect(
      await readyLobby(lobby1mock.players[1].player.id, lobby2mock.id),
    ).toEqual(Response.error(LOBBY.READY, "Lobby doesn't exists!"));
  });

  test("Should return an Error response `You are the owner!`", async () => {
    await pushLobby(lobby1mock, lobby1mock.owner.socketId);

    expect(
      await readyLobby(lobby1mock.players[0].player.id, lobby1mock.id),
    ).toEqual(Response.error(LOBBY.READY, "You are the owner!"));
  });
});
