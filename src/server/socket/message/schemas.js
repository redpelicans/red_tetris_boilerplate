import Joi from "joi";

export const validationSendMessage = {
  message: Joi.string().required().description("The message"),
  sender: Joi.object().required().description("The sender"),
  lobbyId: Joi.string().required().description("The lobbyId"),
};
