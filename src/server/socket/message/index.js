import { createEvent } from "helpers/socket";
import { validationSendMessage } from "socket/message/schemas";
import { handlerSendMessage } from "socket/message/handlers";
import { MESSAGE } from "../../../config/actions/message";

export const getPlayers = createEvent(
  MESSAGE.SEND,
  validationSendMessage,
  handlerSendMessage,
);
