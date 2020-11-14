export default {
  lobbies: {
    change: "onLobbiesChange",
    subscribe: "onLobbiesSubscribe",
  },
  lobby: {
    change: "onLobbyChange",
    kicked: "onLobbyKicked",
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
    join: "onJoinRoom",
  },
  game: {
    started: "onGameStarted",
    score: "onScoreChange",
    board: "onBoardChange",
    penalty: "onPenalty",
    lose: "onLose",
    winner: "onWinner",
  },
  piece: {
    send: "onNewPieces",
  },
};
