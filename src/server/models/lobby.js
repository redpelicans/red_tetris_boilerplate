export default class Lobby {
  constructor({ id, hash, name, maxPlayer, players, owner }) {
    this.id = id;
    this.hash = hash;
    this.name = name;
    this.maxPlayer = maxPlayer;
    this.players = players;
    this.owner = owner; // Object Player
  }
}
