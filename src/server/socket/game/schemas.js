import Joi from "joi";

export const validationSendBoard = {
  gameId: Joi.string().required().description("The id of the game"),
  playerId: Joi.string().required().description("The id of the player"),
  boardGame: Joi.array().required().description("The boardGame of the player"),
};

export const validationSendPenalty = {
  gameId: Joi.string().required().description("The id of the game"),
  playerId: Joi.string().required().description("The id of the player"),
  nbLinePenalty: Joi.number().required().description("The nb of penalty lines"),
};

export const validationSendScore = {
  gameId: Joi.string().required().description("The id of the game"),
  playerId: Joi.string().required().description("The id of the player"),
  score: Joi.number().required().description("The score of the player"),
};

export const validationSendLose = {
  gameId: Joi.string().required().description("The id of the game"),
  playerId: Joi.string().required().description("The id of the player"),
};
