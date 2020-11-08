import Joi from "joi";

export const validationGetPiece = {
  nbPieces: Joi.number().required().description("The number of pieces needed"),
  gameId: Joi.string().required().description("The id of the game"),
};
