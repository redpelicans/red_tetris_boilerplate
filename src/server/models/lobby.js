class Lobby {
  constructor(props) {
    this.id = props.id;
    this.hash = this.hashUrl();
    this.name = props.name;
    this.maxPlayer = props.maxPlayer;
    this.players = props.players;
    this.owner = props.owner; // Object Player
  }

  hashUrl() {
    return this.id;
  }
}

export default Lobby;
