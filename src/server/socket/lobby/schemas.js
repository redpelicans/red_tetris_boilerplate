import Joi from "joi";

export const validationJoinLobby = {
  lobbyId: Joi.string().required().description("The id of the lobby"),
  playerId: Joi.string().required().description("The id of the player"),
};
