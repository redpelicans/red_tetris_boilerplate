import Joi from "joi";

export const validationAddLobby = {
  name: Joi.string().required().description("The name of the lobby"),
  maxPlayer: Joi.number()
    .required()
    .description("The maximum number of players"),
};
