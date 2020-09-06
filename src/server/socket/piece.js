import { createEvent, bindEvent } from "../helpers/socket";
import { logerror, loginfo } from "../log";
import Piece from "../models/piece";

const Joi = require("joi");

export const sendPiece = createEvent(
  "piece:get",
  {
    piece: Joi.number().required().description("The index of the piece"),
    color: Joi.number()
      .optional()
      .description("The index of the color of the piece"),
  },
  async (socket, { piece, color }) => {
    const response = new Piece();
    loginfo(response);
    socket.emit("piece:send", { response });
  },
);
