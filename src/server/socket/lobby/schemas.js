import Joi from "joi";

export const validationunsubscribeLobby = {
  lobbyId: Joi.string().required().description("The id of the lobby"),
  playerId: Joi.string().required().description("The id of the player"),
};

export const validationSubscribeLobby = {
  playerId: Joi.string().required().description("The id of the player"),
  lobbyId: Joi.string().required().description("The id of the lobby"),
};
