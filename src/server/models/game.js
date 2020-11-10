import Piece from "models/piece";

const createPieces = () => {
  const pieces = [];
  for (let i = 0; i < 5; i++) {
    pieces.push(new Piece());
  }
  return pieces;
};

const createPlayers = (players) => {
  const newPlayers = [];
  players.forEach((element) => {
    newPlayers.push({
      player: element.player,
      score: 0,
      loser: false,
      board: [],
    });
  });
  return newPlayers;
};

export default class Game {
  constructor({ name, lobbyId, players }) {
    this.id = lobbyId;
    this.name = name;
    this.over = false;
    this.players = createPlayers(players);
    this.pieces = createPieces();
  }
}
