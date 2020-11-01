import redismock from "redis-mock";
import { setRedis, quitRedis, deleteKeyFromRedis } from "storage";
import Response from "models/response";
import { LOBBY } from "../../../../src/config/actions/lobby";
import { startGame, pushLobby } from "storage/lobbies";
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

describe("startGame function", () => {
  test("Should return a Success response", async () => {
    const lobby = deepCopy(lobby1mock);
    lobby.players[1].ready = true;
    await pushLobby(lobby, lobby.owner.socketId);

    expect(await startGame(lobby.players[0].player.id, lobby.id)).toEqual(
      Response.success(LOBBY.START, {}),
    );
  });

  test("Should return an Error response `You need to be at least 2 players!`", async () => {
    const lobby = deepCopy(lobby1mock);
    lobby.players.pop();
    await pushLobby(lobby, lobby.owner.socketId);

    expect(await startGame(lobby.players[0].player.id, lobby.id)).toEqual(
      Response.error(LOBBY.START, "You need to be at least 2 players!"),
    );
  });

  test("Should return an Error response `All the players need to be ready!`", async () => {
    await pushLobby(lobby1mock, lobby1mock.owner.socketId);

    expect(
      await startGame(lobby1mock.players[0].player.id, lobby1mock.id),
    ).toEqual(Response.error(LOBBY.START, "All the players need to be ready!"));
  });

  test("No lobbies : should return an Error response `Lobby doesn't exists!`", async () => {
    expect(
      await startGame(lobby1mock.players[0].player.id, lobby1mock.id),
    ).toEqual(Response.error(LOBBY.START, "Lobby doesn't exists!"));
  });

  test("No lobby : should return an Error response `Lobby doesn't exists!`", async () => {
    await pushLobby(lobby1mock, lobby1mock.owner.socketId);

    expect(
      await startGame(lobby1mock.players[0].player.id, lobby2mock.id),
    ).toEqual(Response.error(LOBBY.START, "Lobby doesn't exists!"));
  });

  test("Should return an Error response `You are not the owner!`", async () => {
    await pushLobby(lobby1mock, lobby1mock.owner.socketId);

    expect(
      await startGame(lobby1mock.players[1].player.id, lobby1mock.id),
    ).toEqual(Response.error(LOBBY.START, "You are not the owner!"));
  });
});
