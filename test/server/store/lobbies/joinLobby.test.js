import redismock from "redis-mock";
import { setRedis, quitRedis, deleteKeyFromRedis } from "storage";
import Response from "models/response";
import { LOBBY } from "../../../../src/config/actions/lobby";
import { joinLobby, pushLobby } from "storage/lobbies";
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

describe("joinLobby function", () => {
  test("Should return a Success response", async () => {
    await pushLobby(lobby1mock, lobby1mock.owner.socketId);

    const lobby = deepCopy(lobby1mock);
    lobby.players.push(playerObject3mock);

    expect(await joinLobby(playerObject3mock, lobby1mock.id)).toEqual(
      Response.success(LOBBY.SUBSCRIBE, lobby),
    );
  });

  test("Should return an Error response `you already are in another lobby`", async () => {
    await pushLobby(lobby1mock, lobby1mock.owner.socketId);
    await pushLobby(lobby2mock, lobby2mock.owner.socketId);

    expect(await joinLobby(playerObject3mock, lobby1mock.id)).toEqual(
      Response.error(LOBBY.SUBSCRIBE, "You already are in another lobby!"),
    );
  });

  test("No lobbies : should return an Error response `Lobby doesn't exists!`", async () => {
    expect(await joinLobby(playerObject3mock, lobby1mock.id)).toEqual(
      Response.error(LOBBY.SUBSCRIBE, "Lobby doesn't exists!"),
    );
  });

  test("No lobby : should return an Error response `Lobby doesn't exists!`", async () => {
    await pushLobby(lobby1mock, lobby1mock.owner.socketId);
    expect(await joinLobby(playerObject3mock, lobby2mock.id)).toEqual(
      Response.error(LOBBY.SUBSCRIBE, "Lobby doesn't exists!"),
    );
  });

  test("Should return an Error response `The lobby is full!`", async () => {
    await pushLobby(lobby1mock, lobby1mock.owner.socketId);

    const lobby = deepCopy(lobby1mock);
    lobby.players.push(playerObject3mock);

    expect(await joinLobby(playerObject3mock, lobby1mock.id)).toEqual(
      Response.success(LOBBY.SUBSCRIBE, lobby),
    );

    expect(await joinLobby(playerObject4mock, lobby1mock.id)).toEqual(
      Response.error(LOBBY.SUBSCRIBE, "The lobby is full!"),
    );
  });
});
