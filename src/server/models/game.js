import { nanoid } from "nanoid";

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
    this.id = nanoid();
    this.lobbyId = lobbyId;
    this.name = name;
    this.over = false;
    this.players = createPlayers(players);
    // this.owner = owner;
  }
}
