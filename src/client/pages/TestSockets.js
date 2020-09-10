import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://0.0.0.0:3004";
const socket = socketIOClient(ENDPOINT);

function PlayersList(props) {
  const players = props.players;
  const listItems = players.map((player, index) => (
    <li key={player.id}>{"player " + index + " : " + player.name}</li>
  ));
  return <ul>{listItems}</ul>;
}

function deleteLobby(props) {
  console.log(props);
  console.log("I'm asking to delete a Lobby!");
  socket.emit("lobbies:delete", {
    lobbyId: props.lobbyId,
    ownerId: props.playerId,
  });
}

function LobbiesList(props) {
  const lobbies = props.lobbies;
  const listItems = lobbies.map((lobby, index) => (
    <li key={lobby.id}>
      {"lobby " +
        index +
        " / name : " +
        lobby.name +
        " / owner : " +
        lobby.owner.name +
        " / "}
      {
        <button
          onClick={() =>
            deleteLobby({ lobbyId: lobby.id, playerId: props.player.id })
          }
        >
          Delete lobby if owner!
        </button>
      }
    </li>
  ));
  return <ul>{listItems}</ul>;
}

export default function TestSockets() {
  const [piece, setPiece] = useState([]);
  const [playerName, setPlayerName] = useState("player_name");
  const [myPlayer, setMyPlayer] = useState({ name: "", id: "", socketId: "" });
  const [lastLobby, setLastLobby] = useState({
    hash: "",
    name: "",
    maxPlayer: "",
    owner: { name: "" },
  });

  const [lobbyToCreate, setLobbyToCreate] = useState({
    hash: "12345",
    name: "lobby_name",
    maxPlayer: 4,
    owner: myPlayer,
  });
  const [players, setPlayers] = useState([]);
  const [lobbies, setLobbies] = useState([]);

  const handlePlayerName = (e) => {
    setPlayerName(e.target.value);
  };

  const handleLobbyHash = (e) => {
    setLobbyToCreate({ ...lobbyToCreate, hash: e.target.value });
  };

  const handleLobbyName = (e) => {
    setLobbyToCreate({ ...lobbyToCreate, name: e.target.value });
  };

  const handleLobbyMaxPlayers = (e) => {
    setLobbyToCreate({ ...lobbyToCreate, maxPlayer: e.target.value });
  };

  useEffect(() => {
    setLobbyToCreate({ ...lobbyToCreate, owner: myPlayer });
  }, [myPlayer]);

  useEffect(() => {
    socket.on("piece:send", (data) => {
      console.log("I got a piece:send!");
      console.log(data.response);
      setPiece(data.response);
    });

    socket.on("player:response", (data) => {
      console.log("I got a player:response!");
      console.log(data.response);
      setMyPlayer(data.response.payload);
    });

    socket.on("lobbies:response", (data) => {
      console.log("I got a lobby:response!");
      console.log(data.response);
      setLastLobby(data.response.payload);
    });

    socket.on("lobbies:publish", (data) => {
      console.log("I got a lobbies:publish!");
      console.log(data.lobbies);
      setLobbies(data.lobbies);
    });

    socket.on("players:response", (data) => {
      console.log("I got a players:response!");
      console.log(data.response);
      setPlayers(data.response);
    });

    socket.on("players:publish", (data) => {
      console.log("I got a players:publish!");
      console.log(data.players);
      setPlayers(data.players);
    });
  }, []);

  const callForPiece = () => {
    console.log("I'm asking for a new piece!");
    socket.emit("piece:get");
  };

  const callForPlayer = () => {
    console.log("I'm asking for a new player!");
    if (myPlayer.socketId != "")
      socket.emit("player:delete", { socketId: myPlayer.socketId });
    socket.emit("player:create", { name: playerName });
  };

  const callForPlayers = () => {
    console.log("I'm asking for the list of the players!");
    socket.emit("players:get");
  };

  const addLobby = () => {
    console.log("I'm asking to add a Lobby!");
    socket.emit("lobbies:add", lobbyToCreate);
  };

  const getLobbies = () => {
    console.log("I'm asking to get all lobbies!");
    socket.emit("lobbies:get");
  };

  return (
    <div className="h-full">
      <span>DIRTY SOCKET TEST !</span>
      <br />
      <br />
      <button onClick={callForPiece}>Get a piece!</button>
      <br />
      <br />
      <span>
        You got piece [{piece.shape}] with color [{piece.color}], congrats!
      </span>
      <br />
      <br />
      <input
        style={{
          border: "2px solid",
        }}
        name="player name"
        label="player name"
        onChange={handlePlayerName}
        value={playerName}
      />
      <br />
      <button onClick={callForPlayer}>Create a player!</button>
      <br />
      <br />
      <span>
        You created player [{myPlayer.name}] with id [{myPlayer.id}] and
        socketId [{myPlayer.socketId}], congrats!
      </span>
      <br />
      {/* <button onClick={callForPlayers}>Trigger players:get!</button> */}
      <br />
      <span>List of players created and connected : </span>
      <br />
      <PlayersList players={players} />
      <br />
      <input
        style={{
          border: "2px solid",
        }}
        name="lobby hash"
        label="lobby hash"
        onChange={handleLobbyHash}
        value={lobbyToCreate.hash}
      />
      <br />
      <input
        style={{
          border: "2px solid",
        }}
        name="lobby name"
        label="lobby name"
        onChange={handleLobbyName}
        value={lobbyToCreate.name}
      />
      <br />
      <input
        style={{
          border: "2px solid",
        }}
        name="lobby max players"
        label="lobby max players"
        onChange={handleLobbyMaxPlayers}
        value={lobbyToCreate.maxPlayer}
      />
      <br />
      <button onClick={addLobby}>Create a lobby!</button>
      <br />
      <br />
      <span>
        You created lobby [{lastLobby.name}] with id [{lastLobby.id}] and hash [
        {lastLobby.hash}] and maxPlayer [{lastLobby.maxPlayer}] and owner [
        {lastLobby.owner.name}], congrats!
      </span>
      <br />
      {/* <button onClick={getLobbies}>Trigger lobbies:get!</button> */}
      <br />
      <span>List of lobbies : </span>
      <br />
      <LobbiesList lobbies={lobbies} fct={deleteLobby} player={myPlayer} />
      <br />
    </div>
  );
}
