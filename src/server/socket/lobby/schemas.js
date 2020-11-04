import Joi from "joi";

export const validationunsubscribeLobby = {
  lobbyId: Joi.string().required().description("The id of the lobby"),
  playerId: Joi.string().required().description("The id of the player"),
};

export const validationSubscribeLobby = {
  lobbyId: Joi.string().required().description("The id of the lobby"),
  playerId: Joi.string().required().description("The id of the player"),
};

export const validationReadyLobby = {
  lobbyId: Joi.string().required().description("The id of the lobby"),
  playerId: Joi.string().required().description("The id of the player"),
};

export const validationStartGame = {
  lobbyId: Joi.string().required().description("The id of the lobby"),
  ownerId: Joi.string().required().description("The id of the owner"),
};
