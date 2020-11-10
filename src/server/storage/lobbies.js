import { LOBBIES } from "../../config/actions/lobbies";
import { LOBBY } from "../../config/actions/lobby";
import { getComplexObjectFromRedis, setComplexObjectToRedis } from "storage";
import { clearPlayerFromGame } from "storage/game";
import Response from "models/response";

export const getLobbies = async () => {
  return (await getComplexObjectFromRedis("lobbies")) ?? {};
};

export const getLobby = async (id) => {
  const lobbies = (await getComplexObjectFromRedis("lobbies")) ?? {};
  const lobby = lobbies?.[id];
  if (!lobby) {
    return null;
  } else {
    return lobby;
  }
};

export const pushLobby = async (lobby, socketId) => {
  const lobbies = (await getComplexObjectFromRedis("lobbies")) ?? {};

  const alreadyOnLobby = playerIsOnLobbyBySocketId(lobbies, socketId);
  if (alreadyOnLobby) {
    return Response.error(LOBBIES.ADD, "You already have an active lobby !");
  }

  if (!lobby?.name || !isLobbyNameValid(lobby?.name)) {
    return Response.error(LOBBIES.ADD, "Invalid lobby name !");
  }

  if (!lobby?.maxPlayer || !isMaxPlayerValid(lobby?.maxPlayer)) {
    return Response.error(LOBBIES.ADD, "Invalid max players !");
  }

  const nameTaken = isLobbyNameTaken(lobbies, lobby.name);
  if (nameTaken) {
    return Response.error(LOBBIES.ADD, "lobbyName is not available !");
  }

  lobbies[lobby.id] = lobby;
  await setComplexObjectToRedis("lobbies", lobbies);
  return Response.success(LOBBIES.ADD, lobby);
};

export const popLobby = async (lobbyId, ownerId) => {
  const lobbies = (await getComplexObjectFromRedis("lobbies")) ?? {};

  const lobby = lobbies?.[lobbyId];
  if (!lobby) {
    return Response.error(LOBBIES.DELETE, "Lobby doesn't exists!");
  }

  const owner = isOwner(lobby, ownerId);
  if (!owner) {
    return Response.error(
      LOBBIES.DELETE,
      "You are not the owner of this lobby!",
    );
  }

  delete lobbies[lobbyId];
  await setComplexObjectToRedis("lobbies", lobbies);
  /* Payload needed? */
  return Response.success(LOBBIES.DELETE, {});
};

export const joinLobby = async (player, lobbyId) => {
  const lobbies = (await getComplexObjectFromRedis("lobbies")) ?? {};

  const alreadyOnLobby = playerIsOnLobbyByPlayerId(lobbies, player.id);
  if (alreadyOnLobby) {
    return Response.error(LOBBY.SUBSCRIBE, "You already are in another lobby!");
  }

  const lobby = lobbies?.[lobbyId];
  if (!lobby) {
    return Response.error(LOBBY.SUBSCRIBE, "Lobby doesn't exists!");
  }

  const lobbyOpen = isLobbyOpen(lobby);
  if (!lobbyOpen) {
    return Response.error(LOBBY.SUBSCRIBE, "The lobby is in game!");
  }

  const lobbyFull = isLobbyFull(lobby);
  if (lobbyFull) {
    return Response.error(LOBBY.SUBSCRIBE, "The lobby is full!");
  }

  lobby.players.push({
    ready: false,
    player: player,
  });
  lobbies[lobbyId] = lobby;
  await setComplexObjectToRedis("lobbies", lobbies);

  return Response.success(LOBBY.SUBSCRIBE, lobby);
};

export const kickedFromLobby = async (ownerId, playerId, lobbyId) => {
  const lobbies = (await getComplexObjectFromRedis("lobbies")) ?? {};

  const lobby = lobbies?.[lobbyId];
  if (!lobby) {
    return Response.error(LOBBY.KICK, "Lobby doesn't exists!");
  }

  if (ownerId === playerId) {
    return Response.error(LOBBY.KICK, "You cannot kick yourself!");
  }

  const owner = isOwner(lobby, ownerId);
  if (!owner) {
    return Response.error(LOBBY.KICK, "You need to be the owner of the Lobby!");
  }

  const playerIsInLobby = isOnLobby(lobby, playerId);
  if (!playerIsInLobby) {
    return Response.error(LOBBY.KICK, "The player is not in your Lobby!");
  }

  const playerEl = getPlayer(lobby.players, playerId);
  const socketId = playerEl.player.socketId;
  const newPlayers = deletePlayerFromPlayers(lobby.players, playerId);

  lobby.players = newPlayers;
  lobbies[lobbyId] = lobby;
  await setComplexObjectToRedis("lobbies", lobbies);

  return Response.success(LOBBY.KICK, { socketId });
};

export const leaveLobby = async (playerId, lobbyId) => {
  const lobbies = (await getComplexObjectFromRedis("lobbies")) ?? {};

  const lobby = lobbies?.[lobbyId];
  if (!lobby) {
    return Response.error(LOBBY.UNSUBSCRIBE, "Lobby doesn't exists!");
  }

  const lastPlayer = isLastPlayerInLobby(lobby);
  if (lastPlayer) {
    const response = await popLobby(lobbyId, playerId);
    if (response.type === "success") {
      return Response.success(LOBBY.UNSUBSCRIBE, {});
    } else {
      /* Something to handle? */
      return Response.error(
        LOBBY.UNSUBSCRIBE,
        "You are the last player but not the owner there is a problem!",
      );
    }
  }

  const owner = isOwner(lobby, playerId);
  if (owner) {
    const nextOwner = getNextOwner(lobby.players, playerId);
    lobby.owner = nextOwner.player;
  }

  const newPlayers = deletePlayerFromPlayers(lobby.players, playerId);

  lobby.players = newPlayers;
  lobbies[lobbyId] = lobby;
  await setComplexObjectToRedis("lobbies", lobbies);

  return Response.success(LOBBY.UNSUBSCRIBE, {});
};

export const readyLobby = async (playerId, lobbyId) => {
  const lobbies = (await getComplexObjectFromRedis("lobbies")) ?? {};

  const lobby = lobbies?.[lobbyId];
  if (!lobby) {
    return Response.error(LOBBY.READY, "Lobby doesn't exists!");
  }

  const onLobby = playerIsOnLobbyByPlayerId(lobbies, playerId);
  if (!onLobby) {
    return Response.error(LOBBY.READY, "You are not in this lobby!");
  }

  const owner = isOwner(lobby, playerId);
  if (owner) {
    return Response.error(LOBBY.READY, "You are the owner!");
  }

  lobby.players = setPlayerReady(lobby.players, playerId);
  lobbies[lobbyId] = lobby;
  await setComplexObjectToRedis("lobbies", lobbies);

  return Response.success(LOBBY.READY, {});
};

export const startGame = async (playerId, lobbyId) => {
  const lobbies = (await getComplexObjectFromRedis("lobbies")) ?? {};

  const lobby = lobbies?.[lobbyId];
  if (!lobby) {
    return Response.error(LOBBY.START, "Lobby doesn't exists!");
  }

  const owner = isOwner(lobby, playerId);
  if (!owner) {
    return Response.error(LOBBY.START, "You are not the owner!");
  }

  const nbPlayers = countPlayers(lobby);
  if (nbPlayers < 2) {
    return Response.error(LOBBY.START, "You need to be at least 2 players!");
  }

  const ready = isLobbyReady(lobby, playerId);
  if (!ready) {
    return Response.error(LOBBY.START, "All the players need to be ready!");
  }

  const newPlayers = setAllPlayersReady(lobbies[lobbyId].players);
  lobbies[lobbyId].players = newPlayers;
  lobbies[lobbyId].isPlaying = true;
  await setComplexObjectToRedis("lobbies", lobbies);

  return Response.success(LOBBY.START, {});
};

export const clearPlayerFromLobbies = async (playerId) => {
  const lobbies = (await getComplexObjectFromRedis("lobbies")) ?? {};

  const isOnLobby = playerIsOnLobbyByPlayerId(lobbies, playerId);
  if (isOnLobby) {
    const lobbyId = getLobbyIdByPlayerId(lobbies, playerId);
    const response = await leaveLobby(playerId, lobbyId);
    if (response.type === "success") {
      return lobbyId;
    }
  }
  return null;
};

export const isLobbyPlaying = async (lobbyId) => {
  const lobbies = (await getComplexObjectFromRedis("lobbies")) ?? {};

  const lobby = lobbies?.[lobbyId];
  if (!lobby) {
    return false;
  }
  if (!isLobbyOpen(lobby)) {
    return true;
  }

  return false;
};

export const setLobbyWon = async (lobbyId, winner) => {
  const lobbies = (await getComplexObjectFromRedis("lobbies")) ?? {};

  const lobby = lobbies?.[lobbyId];
  if (!lobby) {
    return null;
  }

  lobby.isPlaying = false;
  const owner = isOwner(lobby, winner.id);

  if (!owner) {
    if (isOnLobby(lobby, winner.id)) {
      lobby.owner = winner;
    }
  }

  lobbies[lobbyId] = lobby;
  await setComplexObjectToRedis("lobbies", lobbies);

  return lobby;
};

const isLobbyNameTaken = (lobbies, name) => {
  const res = Object.keys(lobbies).some((key) => lobbies[key].name === name);
  return res;
};

const isLobbyFull = (lobby) => {
  const maxPlayer = lobby?.maxPlayer;
  const nbPlayers = lobby.players.length;
  return maxPlayer <= nbPlayers;
};

const playerIsOnLobbyBySocketId = (lobbies, socketId) => {
  return Object.keys(lobbies).some((key) =>
    lobbies[key].players.some((el) => el.player.socketId === socketId),
  );
};

const playerIsOnLobbyByPlayerId = (lobbies, playerId) => {
  return Object.keys(lobbies).some((key) =>
    lobbies[key].players.some((el) => el.player.id === playerId),
  );
};

const isOnLobby = (lobby, playerId) => {
  return lobby.players.some((el) => el.player.id === playerId);
};

const isOwner = (lobby, playerId) => {
  return lobby?.owner?.id === playerId;
};

const isLastPlayerInLobby = (lobby) => {
  return lobby?.players.length <= 1;
};

const deletePlayerFromPlayers = (players, playerId) => {
  return players.filter((el) => el.player.id !== playerId);
};

const getNextOwner = (players, playerId) => {
  return players.find((el) => el.player.id !== playerId);
};

const getPlayer = (players, playerId) => {
  return players.find((el) => el.player.id === playerId);
};

export const getLobbyIdByPlayerId = (lobbies, playerId) => {
  const lobbyId = Object.keys(lobbies).find((key) =>
    lobbies[key].players.find((el) => el.player.id === playerId),
  );
  return lobbyId;
};

const setPlayerReady = (players, playerId) => {
  return players.filter((el) => {
    if (el.player.id === playerId) {
      el.ready = !el.ready;
      return el;
    } else {
      return el;
    }
  });
};

const isLobbyReady = (lobby, playerId) => {
  return !lobby.players.some(
    (el) => el.ready !== true && playerId !== el.player.id,
  );
};

const countPlayers = (lobby) => {
  return lobby.players.length;
};

const isLobbyOpen = (lobby) => {
  return !lobby.isPlaying;
};

const isLobbyNameValid = (lobbyName) => {
  return RegExp("^[a-zA-Z0-9_-]{3,16}$").test(lobbyName);
};

const isMaxPlayerValid = (maxPlayer) => {
  return maxPlayer >= 2 && maxPlayer <= 6;
};

const setAllPlayersReady = (players) => {
  return players.map((player) => ({
    ...player,
    ready: false,
  }));
};
