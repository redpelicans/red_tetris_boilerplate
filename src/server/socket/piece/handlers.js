import Piece from "models/piece";
import eventEmitter from "listeners";
import event from "listeners/events";

export const handlerGetPiece = async (socket, { gameId, nbPieces }) => {
  const pieces = [];
  for (let i = 0; i < nbPieces; i++) {
    pieces.push(new Piece());
  }

  eventEmitter.emit(event.piece.send, {
    pieces,
    gameId,
  });
};
