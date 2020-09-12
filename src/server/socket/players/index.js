import { createEvent } from "helpers/socket";
import { validationGetPlayers } from "socket/players/schemas";
import { handlerGetPlayers } from "socket/players/handlers";
// import { PLAYERS } from "./../../../config/actions/players";

export const getPlayers = createEvent(
  "players:get",
  validationGetPlayers,
  handlerGetPlayers,
);
