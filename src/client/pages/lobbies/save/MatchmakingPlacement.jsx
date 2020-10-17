import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import CreateLobby from "./CreateLobby";
import Lobby from "./Lobby";
import Lobbies from "./Lobbies2";
import Players from "./Players";
import Player from "./Player";
import Chat from "./Chat";

export default function ({ title }) {
  const components = [
    { title: "PLAYER", comp: <Player state={state} /> },
    { title: "PLAYERS", comp: <Players state={state} /> },
    { title: "CHAT", comp: <Chat state={state} /> },
    { title: "LOBBIES", comp: <Lobbies state={state} dispatch={dispatch} /> },
    {
      title: "CREATE LOBBY",
      comp: <CreateLobby state={state} dispatch={dispatch} />,
    },
    { title: "LOBBY", comp: <Lobby state={state} dispatch={dispatch} /> },
  ];

  return (
    <FlexBox
      height="6/12"
      width="full"
      className="justify-center items-center sm:w-1/3 sm:h-1/3"
    >
      <FlexBox direction="col" className="border border-black p-5 max-h-11/12">
        <span>{title}</span>
      </FlexBox>
    </FlexBox>
  );
}
