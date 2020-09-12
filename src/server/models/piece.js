import { TETROMINO } from "./../../config/models/piece";

const randomShape = () => {
  return TETROMINO.shape[
    Math.floor(Math.random() * Math.floor(TETROMINO.shape.length))
  ];
};

const randomColor = () => {
  return TETROMINO.color[
    Math.floor(Math.random() * Math.floor(TETROMINO.color.length))
  ];
};

export default class Piece {
  constructor() {
    this.shape = randomShape();
    this.color = randomColor();
  }
}

/* export const Piece = () => ({
    piece: randomShape(),
    color: randomColor(),
  }) */
