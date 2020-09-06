import Joi from "joi";

export const validationCreatePlayer = {
  name: Joi.string().required().description("The name of the player"),
};
