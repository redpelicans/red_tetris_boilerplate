import Joi from "joi";

export const validationAddLobby = {
  hash: Joi.string().required().description("The hash of the lobby"),
  name: Joi.string().required().description("The name of the lobby"),
  maxPlayer: Joi.number()
    .required()
    .description("The maximum number of players"),
  owner: Joi.object().required().description("The owner of the lobby"),
};

export const validationDeleteLobby = {
  id: Joi.string().required().description("The id of the lobby"),
};

export const validationGetLobbies = {};
