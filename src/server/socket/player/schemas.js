import Joi from "joi";

export const validationCreatePlayer = {
  name: Joi.string().required().description("The name of the player"),
};

export const validationDeletePlayer = {
  socketId: Joi.string().required().description("The socketId of the player"),
};
