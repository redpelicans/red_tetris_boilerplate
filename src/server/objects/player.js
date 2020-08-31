import { PIECES, COLORS } from '../config/constants';

class Player {
    constructor(props) {
        this.id = props.id;
        this.socketId = props.socketId;
        this.name = props.name;
    }
}

export default Player;