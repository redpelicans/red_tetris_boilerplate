import { createEvent } from "helpers/socket";
import {
  validationSendBoard,
  validationSendPenalty,
  validationSendScore,
  validationSendLose,
} from "socket/game/schemas";
import {
  handlerSendBoard,
  handlerSendPenalty,
  handlerSendScore,
  handlerSendLose,
} from "socket/game/handlers";
import { GAME } from "./../../../config/actions/game";

export const sendBoard = createEvent(
  GAME.SEND_BOARD,
  validationSendBoard,
  handlerSendBoard,
);

export const sendPenalty = createEvent(
  GAME.SEND_PENALTY,
  validationSendPenalty,
  handlerSendPenalty,
);

export const sendScore = createEvent(
  GAME.SEND_SCORE,
  validationSendScore,
  handlerSendScore,
);

export const sendLose = createEvent(
  GAME.SEND_LOSE,
  validationSendLose,
  handlerSendLose,
);
