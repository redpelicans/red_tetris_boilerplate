import { nanoid } from "nanoid";
export default class Lobby {
  constructor({ hash, name, maxPlayer, players, owner }) {
    this.id = nanoid();
    this.hash = hash;
    this.name = name;
    this.maxPlayer = maxPlayer;
    this.players = players;
    this.owner = owner;
  }
}
