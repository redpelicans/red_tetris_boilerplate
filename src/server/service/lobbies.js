import Lobby from "models/lobby";

const lobbies = [];

export const getLobbies = () => {
  return lobbies;
};

export const pushLobby = (lobby) => {
  lobbies.push(lobby);
};

export const popLobby = (lobbyId, ownerId) => {
  var res = false;
  res = lobbies.filter(function (el) {
    if (el.id === lobbyId && el.owner.id == ownerId) {
      const index = lobbies.indexOf(el);
      lobbies.splice(index, 1);
      return true;
    }
  });
  if (res) return true;
  else return false;
  // const lobby = lobbies.filter(function (el) {
  //   return el.id === id;
  // });
  // lobbies.pop(lobby);
};

export const joinLobby = (player, id) => {
  const lobby = lobbies.filter(function (el) {
    return el.id === id;
  });
  lobby.players.push(player);
};
