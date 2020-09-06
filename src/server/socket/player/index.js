import { createEvent } from "helpers/socket";
import { validationCreatePlayer } from "socket/player/schemas";
import { handlerCreatePlayer } from "socket/player/handlers";
import { PLAYER } from "./../../../config/actions/player";

export const createPlayer = createEvent(
  PLAYER.CREATE,
  validationCreatePlayer,
  handlerCreatePlayer,
);
