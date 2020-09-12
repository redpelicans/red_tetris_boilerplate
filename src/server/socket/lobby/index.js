import { createEvent } from "helpers/socket";
import {
  validationSubscribeLobby,
  validationUnsubscribeLobby,
} from "socket/lobby/schemas";
import {
  handlerSubscribeLobby,
  handlerUnsubscribeLobby,
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
