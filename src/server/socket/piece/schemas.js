import Joi from "joi";

export const validationGetPiece = {
  nb: Joi.number().required().description("The number of pieces needed"),
};
