import { createEvent } from "helpers/socket";
import { validationAddLobby } from "socket/lobbies/schemas";
import { handlerAddLobby } from "socket/lobbies/handlers";
import { LOBBIES } from "./../../../config/actions/lobbies";

export const addLobby = createEvent(
  LOBBIES.ADD,
  validationAddLobby,
  handlerAddLobby,
);
