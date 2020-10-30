import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import LobbyItem from "./LobbyItem";
import CreateLobby from "pages/rooms/lobby/CreateLobby";
import Overlay from "components/overlay/Overlay";
import SearchLobby from "./SearchLobby";
import "pages/rooms/Rooms.scss";

export default function LobbiesContainer({ state, dispatch }) {
  const [hasClickedCreate, setHasClickedCreate] = React.useState(false);

  return (
    <FlexBox
      direction="col"
      width="3/4"
      height="auto"
      className="justify-center"
    >
      <OverlayCreate
        clicked={hasClickedCreate}
        close={() => setHasClickedCreate(false)}
        state={state}
        dispatch={dispatch}
      />
      <SearchLobby />
      <LobbyList state={state} dispatch={dispatch} />
      <ButtonsLobbies>
        <JoinButton players={state.players} />
        <CreateButton onClick={() => setHasClickedCreate(true)} />
      </ButtonsLobbies>
    </FlexBox>
  );
}

const LobbyList = ({ state, dispatch }) => (
  <FlexBox direction="col" className="max-h-3/5 my-6">
    <div className="overflow-y-scroll hide-scroll">
      {Object.entries(state.lobbies || {}).map(([key, el], index) => {
        return (
          <LobbyItem lobby={el} key={index} state={state} dispatch={dispatch} />
        );
      })}
    </div>
  </FlexBox>
);

const OverlayCreate = ({ clicked, close, state, dispatch }) => {
  return (
    clicked && (
      <Overlay
        isOpen={clicked}
        close={close}
        children={
          <CreateLobby close={close} state={state} dispatch={dispatch} />
        }
        className="create-modal"
      />
    )
  );
};

const ButtonsLobbies = ({ children }) => (
  <FlexBox direction="row" className="justify-between">
    {children}
  </FlexBox>
);

const JoinButton = ({ players }) => (
  <button className="w-3/5 text-center bg-red-400 hover:bg-red-600 rounded-lg shadow-lg">
    <FlexBox direction="col">
      <span className="text-base text-white">Join Game</span>
      <span className="text-s text-white">
        {Object.keys(players).length} players connected
      </span>
    </FlexBox>
  </button>
);

const CreateButton = ({ onClick, ...rest }) => (
  <button
    className="text-base w-1/3 text-center bg-red-400 hover:bg-red-600 rounded-lg shadow-lg"
    onClick={onClick}
  >
    <span className="text-base text-white">Create Lobby</span>
  </button>
);
