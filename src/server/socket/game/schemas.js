import Joi from "joi";

export const validationSendBoard = {
  lobbyId: Joi.string().required().description("The id of the lobby"),
  boardGame: Joi.array().required().description("The boardGame of the player"),
};

export const validationSendPenalty = {
  lobbyId: Joi.string().required().description("The id of the lobby"),
  nbLinePenalty: Joi.number().required().description("The nb of penalty lines"),
};

export const validationSendScore = {
  lobbyId: Joi.string().required().description("The id of the lobby"),
  score: Joi.number().required().description("The score of the player"),
};

export const validationSendLose = {
  lobbyId: Joi.string().required().description("The id of the lobby"),
};
