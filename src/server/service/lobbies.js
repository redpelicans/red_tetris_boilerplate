import Lobby from "models/lobby";

const lobbies = [];

export const getLobbies = () => {
  return lobbies;
};

export const pushLobby = (lobby) => {
  lobbies.push(lobby);
};

export const popLobby = (id) => {
  lobbies.filter(function (el) {
    if (el.id === id) {
      const index = lobbies.indexOf(el);
      lobbies.splice(index, 1);
    }
  });

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
