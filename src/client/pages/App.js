import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://0.0.0.0:3004";
const socket = socketIOClient(ENDPOINT);

export default function App() {
  const [piece, setPiece] = useState("");

  useEffect(() => {
    socket.on("piece", (data) => {
      console.log("I got a new piece!");
      console.log(data.response);
      setPiece(data.response);
    });
  }, []);

  const callForPiece = () => {
    console.log("I'm asking for a new piece!");
    socket.emit("getPiece");
  };

  return (
    <div>
      <span>Hello World ! </span>
      <br />
      <span>This is a socket test !</span>
      <br />
      <br />
      <button onClick={callForPiece}>Get a piece!</button>
      <br />
      <br />
      <span>
        You got piece [{piece.piece}] with color [{piece.color}], congrats!
      </span>
    </div>
  );
}
