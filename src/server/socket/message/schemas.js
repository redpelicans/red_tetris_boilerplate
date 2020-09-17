import Joi from "joi";

export const validationSendMessage = {
  message: Joi.string().required().description("The message"),
  sender: Joi.string().required().description("The sender"),
};
