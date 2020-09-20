import { createEvent } from "helpers/socket";
import {
  validationCreatePlayer,
  validationDeletePlayer,
} from "socket/player/schemas";
import {
  handlerCreatePlayer,
  handlerDeletePlayer,
} from "socket/player/handlers";
import { PLAYER } from "./../../../config/actions/player";

export const createPlayer = createEvent(
  PLAYER.CREATE,
  validationCreatePlayer,
  handlerCreatePlayer,
);

export const deletePlayer = createEvent(
  PLAYER.DELETE,
  validationDeletePlayer,
  handlerDeletePlayer,
);
