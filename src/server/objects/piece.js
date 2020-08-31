import { PIECES, COLORS } from '../config/constants';

class Piece {
    constructor(props) {
        this.piece = this.randomPiece();
        this.color = this.randomColor();
    }

    randomPiece() {
        return Math.floor(Math.random() * Math.floor(PIECES.length));
    }

    randomColor() {
        return Math.floor(Math.random() * Math.floor(COLORS.length));
    }
}

export default Piece;