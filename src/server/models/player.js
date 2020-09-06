import { PIECES, COLORS } from "../config/constants";
import { create } from "..";

class Player {
  constructor(props) {
    this.id = props.id;
    this.name = props.name;
    this.socketId = props.socketId;
  }
}

export default Player;
