import Joi from "joi";

export const validationGetPiece = {
  piece: Joi.number().required().description("The index of the piece"),
  color: Joi.number()
    .optional()
    .description("The index of the color of the piece"),
};
