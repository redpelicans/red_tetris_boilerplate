import { createEvent } from "helpers/socket";
import {
  validationAddLobby,
  validationDeleteLobby,
  validationGetLobbies,
} from "socket/lobbies/schemas";
import {
  handlerAddLobby,
  handlerDeleteLobby,
  handlerGetLobbies,
} from "socket/lobbies/handlers";
import { LOBBIES } from "./../../../config/actions/lobbies";

export const addLobby = createEvent(
  LOBBIES.ADD,
  validationAddLobby,
  handlerAddLobby,
);

export const deleteLobby = createEvent(
  LOBBIES.DELETE,
  validationDeleteLobby,
  handlerDeleteLobby,
);

export const getLobbies = createEvent(
  LOBBIES.GET,
  validationGetLobbies,
  handlerGetLobbies,
);
