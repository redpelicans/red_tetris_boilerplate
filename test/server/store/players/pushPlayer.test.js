import redismock from "redis-mock";
import { pushPlayer } from "storage/players";
import {
  quitRedis,
  setComplexObjectToRedis,
  setRedis,
  deleteKeyFromRedis,
} from "storage";
import Response from "models/response";
import Player from "models/player";

import { PLAYER } from "../../../../src/config/actions/player";
import {
  player1mock,
  player2mock,
  playerInvalid1mock,
  playerInvalid2mock,
  playerInvalid3mock,
  playerInvalid4mock,
} from "../../mocks";

beforeAll(() => {
  setRedis(redismock.createClient());
});

afterAll(() => {
  deleteKeyFromRedis("players");
  quitRedis();
});

describe("pushPlayer function", () => {
  test("Should return a Success response", async () => {
    const player = new Player(player1mock);

    expect(await pushPlayer(player)).toEqual(
      Response.success(PLAYER.CREATE, player),
    );
  });

  test("Should return an Error response `Invalid username`", async () => {
    const player1 = new Player(playerInvalid1mock);
    const player2 = new Player(playerInvalid2mock);
    const player3 = new Player(playerInvalid3mock);
    const player4 = new Player(playerInvalid4mock);

    expect(await pushPlayer(player1)).toEqual(
      Response.error(PLAYER.CREATE, "Invalid username!"),
    );

    expect(await pushPlayer(player2)).toEqual(
      Response.error(PLAYER.CREATE, "Invalid username!"),
    );

    expect(await pushPlayer(player3)).toEqual(
      Response.error(PLAYER.CREATE, "Invalid username!"),
    );

    expect(await pushPlayer(player4)).toEqual(
      Response.error(PLAYER.CREATE, "Invalid username!"),
    );
  });

  test("Should return an Error response `Username already exists!`", async () => {
    const player2 = new Player(player2mock);

    expect(await pushPlayer(player2)).toEqual(
      Response.success(PLAYER.CREATE, player2),
    );

    expect(await pushPlayer(player2)).toEqual(
      Response.error(PLAYER.CREATE, "Username already exists!"),
    );
  });
});
