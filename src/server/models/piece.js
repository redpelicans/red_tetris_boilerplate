import TETROMINOES from "./../../config/models/piece";

const randomNumber = () =>
  Math.floor(Math.random() * Math.floor(TETROMINOES.length));

export default class Piece {
  constructor() {
    const random = randomNumber();
    this.shape = TETROMINOES[random].shape;
    this.color = TETROMINOES[random].color;
    this.padding = TETROMINOES[random].padding;
    this.dim = TETROMINOES[random].dim;
  }
}
