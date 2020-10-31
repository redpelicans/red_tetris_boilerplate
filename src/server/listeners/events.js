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
    board: "onBoardChange",
    penalty: "onPenalty",
    score: "onScoreChange",
    lose: "onLose",
    winner: "onWinner",
  },
};
