import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import CreateLobby from "components/lobby/CreateLobby";
import Lobby from "components/lobby/Lobby";
import Lobbies from "components/lobbies/Lobbies";
import Players from "components/players/Players";
import Player from "components/player/Player";
import Chat from "components/chat/Chat";

export default function ({ state, dispatch }) {
  const components = [
    { title: "PLAYER", comp: <Player state={state} /> },
    { title: "PLAYERS", comp: <Players state={state} /> },
    { title: "CHAT", comp: <Chat state={state} /> },
    { title: "LOBBIES", comp: <Lobbies state={state} dispatch={dispatch} /> },
    {
      title: "CREATE LOBBY",
      comp: <CreateLobby state={state} dispatch={dispatch} />,
    },
    { title: "LOBBY", comp: <Lobby state={state} /> },
  ];

  return (
    <>
      {components.map((component, index) => {
        return (
          <FlexBox
            height="6/12"
            width="full"
            className="justify-center items-center sm:w-1/3 sm:h-1/3"
            key={index + "match making placement"}
          >
            <FlexBox
              direction="col"
              className="border border-black p-5 max-h-11/12"
            >
              <span>{component.title}</span>
              {component.comp}
            </FlexBox>
          </FlexBox>
        );
      })}
    </>
  );
}
