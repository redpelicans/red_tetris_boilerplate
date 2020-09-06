import Lobby from "models/lobby";

const lobbies = [];

export const pushLobby = (lobby) => {
  lobbies.push(lobby);
};

export const getLobbies = () => {
  return lobbies;
};
