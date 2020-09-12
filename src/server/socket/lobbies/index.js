import { createEvent } from "helpers/socket";
import {
  validationAddLobby,
  validationDeleteLobby,
  validationSubscribeLobbies,
  validationUnsubscribeLobbies,
} from "socket/lobbies/schemas";
import {
  handlerAddLobby,
  handlerDeleteLobby,
  handlerSubscribeLobbies,
  handlerUnsubscribeLobbies,
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

export const subscribeLobbies = createEvent(
  LOBBIES.SUBSCRIBE,
  validationSubscribeLobbies,
  handlerSubscribeLobbies,
);

export const unsuscribeLobbies = createEvent(
  LOBBIES.UNSUBSCRIBE,
  validationUnsubscribeLobbies,
  handlerUnsubscribeLobbies,
);
