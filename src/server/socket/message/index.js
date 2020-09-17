import { createEvent } from "helpers/socket";
import { validationSendMessage } from "socket/message/schemas";
import { handlerSendMessage } from "socket/message/handlers";

export const getPlayers = createEvent(
  "message:send",
  validationSendMessage,
  handlerSendMessage,
);
