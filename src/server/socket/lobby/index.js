import { createEvent } from "socket/helpers/socket";
import {
  validationSubscribeLobby,
  validationUnsubscribeLobby,
  validationReadyLobby,
} from "socket/lobby/schemas";
import {
  handlerSubscribeLobby,
  handlerUnsubscribeLobby,
  handlerReadyLobby,
} from "socket/lobby/handlers";
import { LOBBY } from "./../../../config/actions/lobby";

export const subscribeLobby = createEvent(
  LOBBY.SUBSCRIBE,
  validationSubscribeLobby,
  handlerSubscribeLobby,
);

export const unsubscribeLobby = createEvent(
  LOBBY.UNSUBSCRIBE,
  validationUnsubscribeLobby,
  handlerUnsubscribeLobby,
);

export const readyLobby = createEvent(
  LOBBY.READY,
  validationReadyLobby,
  handlerReadyLobby,
);
