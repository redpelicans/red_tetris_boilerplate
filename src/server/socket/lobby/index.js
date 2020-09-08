import { createEvent } from "helpers/socket";
import {
  validationJoinLobby,
  validationLeaveLobby,
} from "socket/lobby/schemas";
import { handlerJoinLobby, handlerLeaveLobby } from "socket/lobby/handlers";
import { LOBBY } from "./../../../config/actions/lobby";

export const joinLobby = createEvent(
  LOBBY.JOIN,
  validationJoinLobby,
  handlerJoinLobby,
);

export const leaveLobby = createEvent(
  LOBBY.LEAVE,
  validationLeaveLobby,
  handlerLeaveLobby,
);
