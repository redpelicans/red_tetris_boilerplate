export default {
  lobbies: {
    change: "onLobbiesChange",
    subscribe: "onLobbiesSubscribe",
  },
  lobby: {
    change: "onLobbyChange",
    leaver: "onLobbyLeaver",
  },
  players: {
    change: "onPlayersChange",
  },
  player: {
    disconnect: "onPlayerDisconnect",
  },
  message: {
    new: "onNewMessage",
  },
  room: {
    clear: "onClearRoom",
  },
  game: {
    started: "onGameStarted",
    score: "onScoreChange",
    board: "onBoardChange",
    penalty: "onPenalty",
    lose: "onLose",
    winner: "onWinner",
  },
};
