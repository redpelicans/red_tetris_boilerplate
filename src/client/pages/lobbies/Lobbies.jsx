import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import LobbyItem from "./LobbyItem";
import CreateLobby from "./CreateLobby";
import Overlay from "components/overlay/Overlay";
import SearchLobby from "./SearchLobby";
import { StoreContext } from "store";
import "./Lobbies.scss";
import { setupSocketRooms } from "store/middleware/sockets";

export default function Lobbies() {
  const { state, dispatch } = React.useContext(StoreContext);
  const [hasClickedCreate, setHasClickedCreate] = React.useState(false);

  React.useEffect(() => {
    setupSocketRooms(dispatch);
  }, []);

  return (
    <FlexBox
      direction="col"
      width="2/4"
      height="auto"
      className="justify-between py-8"
    >
      {hasClickedCreate && (
        <Overlay
          isOpen={hasClickedCreate}
          close={() => setHasClickedCreate(false)}
          className="create-modal"
        >
          <CreateLobby
            close={() => setHasClickedCreate(false)}
            state={state}
            dispatch={dispatch}
          />
        </Overlay>
      )}

      <FlexBox direction="col">
        <SearchLobby />
        <LobbyList state={state} dispatch={dispatch} />
      </FlexBox>

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
      {Object.values(state.lobbies || {}).map((lobby, index) => (
        <LobbyItem
          lobby={lobby}
          key={index}
          state={state}
          dispatch={dispatch}
        />
      ))}
    </div>
  </FlexBox>
);

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
    {...rest}
  >
    <span className="text-base text-white">Create Lobby</span>
  </button>
);
