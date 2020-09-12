import { createEvent } from "helpers/socket";
import { validationGetPlayers } from "socket/players/schemas";
import { handlerGetPlayers } from "socket/players/handlers";

export const getPlayers = createEvent(
  "players:get",
  validationGetPlayers,
  handlerGetPlayers,
);
