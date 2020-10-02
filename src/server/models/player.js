import { nanoid } from "nanoid";

export default class Player {
  constructor({ name, socketId }) {
    this.id = nanoid();
    this.name = name;
    this.socketId = socketId;
  }
}
