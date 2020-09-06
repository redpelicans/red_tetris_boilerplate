import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://0.0.0.0:3004";
const socket = socketIOClient(ENDPOINT);

export default function TestSockets() {
  const [piece, setPiece] = useState([]);
  const [playerName, setPlayerName] = useState([]);
  const [player, setPlayer] = useState([]);

  const handlePlayerName = (e) => {
    setPlayerName(e.target.value);
  };

  useEffect(() => {
    socket.on("piece:send", (data) => {
      console.log("I got a new piece!");
      console.log(data.response);
      setPiece(data.response);
    });

    socket.on("player:response", (data) => {
      console.log("I got a new player!");
      console.log(data.response);
      setPlayer(data.response.payload);
    });
  }, []);

  const callForPiece = () => {
    console.log("I'm asking for a new piece!");
    socket.emit("piece:get");
  };

  const callForPlayer = () => {
    console.log("I'm asking for a new player!");
    socket.emit("player:create", { name: playerName });
  };

  const callForPlayers = () => {
    console.log("I'm asking for the list of the players!");
    socket.emit("players:get");
  };

  const addLobby = () => {
    console.log("I'm asking to add a Lobby!");
    socket.emit("lobbies:add", {
      hash: "12345",
      name: "lobby1",
      maxPlayer: 12,
      owner: player,
    });
  };

  const getLobbies = () => {
    console.log("I'm asking to get all lobbies!");
    socket.emit("lobbies:get");
  };

  return (
    <div className="h-full">
      <span>Hello World ! </span>
      <br />
      <span>This is a socket test !</span>
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
        name="player name"
        label="player name"
        onChange={handlePlayerName}
        value={playerName}
      />
      <br />
      <button onClick={callForPlayer}>Get a player!</button>
      <br />
      <br />
      <span>
        You got player [{player.name}] with id [{player.id}] and socketId [
        {player.socketId}], congrats!
      </span>
      <br />
      <br />
      <button onClick={callForPlayers}>Trigger players:get!</button>
      <br />
      <br />
      <button onClick={addLobby}>Trigger lobbies:add!</button>
      <br />
      <br />
      <button onClick={getLobbies}>Trigger lobbies:get!</button>
      <br />
    </div>
  );
}
