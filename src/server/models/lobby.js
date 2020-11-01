import { nanoid } from "nanoid";

export default class Lobby {
  constructor({ hash, name, maxPlayer, owner }) {
    this.id = nanoid();
    this.hash = hash;
    this.name = name;
    this.maxPlayer = maxPlayer;
    this.isPlaying = false;
    this.players = [];
    this.owner = owner;
  }
}
