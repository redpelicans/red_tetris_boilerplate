import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import LobbyItem from "./LobbyItem";
import CreateLobby from "./CreateLobby";
import Overlay from "components/overlay/Overlay";
import SearchLobby from "./SearchLobby";
import { StoreContext } from "store";
import "./Lobbies.scss";
import { setupSocketRooms, rooms } from "store/middleware/sockets";
import useNavigate from "hooks/useNavigate";
import { setLobby } from "actions/store";
import { toast } from "react-toastify";
import { LOBBY } from "../../../config/actions/lobby";

export default function Lobbies() {
  const { state, dispatch } = React.useContext(StoreContext);
  const [hasClickedCreate, setHasClickedCreate] = React.useState(false);
  const { navigate } = useNavigate();
  const notify = (error) => toast.error(error);

  React.useEffect(() => {
    if (!rooms) setupSocketRooms(dispatch);
  }, []);

  React.useEffect(() => {
    if (state.lobbyResponse.action === LOBBY.SUBSCRIBE) {
      if (state.lobbyResponse.type === "error") {
        notify(state?.lobbyResponse?.reason);
      } else if (state.lobbyResponse.type === "success") {
        dispatch(setLobby(state.lobbyResponse.payload));
        navigate("/rooms/id");
      }
    }
  }, [state.lobbyResponse]);

  return (
    <FlexBox
      direction="col"
      width="2/4"
      height="full"
      wrap="no-wrap"
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
  // at less than 600 delete min height
  <FlexBox
    direction="col"
    wrap="no-wrap"
    className="min-h-3/4 my-6 overflow-y-scroll hide-scroll"
  >
    {Object.values(state.lobbies || {}).map((lobby, index) => (
      <LobbyItem lobby={lobby} key={index} state={state} dispatch={dispatch} />
    ))}
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
