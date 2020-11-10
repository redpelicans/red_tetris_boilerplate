import { createEvent } from "socket/helpers/socket";
import {
  validationSubscribeLobby,
  validationUnsubscribeLobby,
  validationKickLobby,
  validationReadyLobby,
  validationStartGame,
} from "socket/lobby/schemas";
import {
  handlerSubscribeLobby,
  handlerUnsubscribeLobby,
  handlerKickLobby,
  handlerReadyLobby,
  handlerStartGame,
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

export const kickLobby = createEvent(
  LOBBY.KICK,
  validationKickLobby,
  handlerKickLobby,
);

export const readyLobby = createEvent(
  LOBBY.READY,
  validationReadyLobby,
  handlerReadyLobby,
);

export const startGame = createEvent(
  LOBBY.START,
  validationStartGame,
  handlerStartGame,
);
