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
    board: "onBoardChange",
    penalty: "onPenalty",
    score: "onScoreChange",
    lose: "onLose",
    winner: "onWinner",
  },
};
