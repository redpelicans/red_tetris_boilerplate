import { createEvent } from "socket/helpers/socket";
import {
  validationStartGame,
  validationSendBoard,
  validationSendPenalty,
  validationSendScore,
  validationSendLose,
} from "socket/game/schemas";
import {
  handlerStartGame,
  handlerSendBoard,
  handlerSendPenalty,
  handlerSendScore,
  handlerSendLose,
} from "socket/game/handlers";
import { GAME } from "./../../../config/actions/game";

export const startGame = createEvent(
  GAME.START,
  validationStartGame,
  handlerStartGame,
);

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
