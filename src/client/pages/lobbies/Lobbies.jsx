import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import LobbyItem from "./LobbyItem";
import CreateLobby from "./CreateLobby";
import Overlay from "components/overlay/Overlay";
import SearchLobby from "./SearchLobby";
import { StoreContext } from "store";
import "./Lobbies.scss";
import { setupSocketRooms } from "store/middleware/sockets";
import useNavigate from "hooks/useNavigate";
import { setLobby } from "actions/store";
import { toast } from "react-toastify";
import { LOBBY } from "../../../config/actions/lobby";
import { socket } from "store/middleware/sockets";
import { isEmpty } from "helpers/common";

export default function Lobbies() {
  const { state, dispatch } = React.useContext(StoreContext);
  const { navigate } = useNavigate();
  const [hasClickedCreate, setHasClickedCreate] = React.useState(false);
  const notify = (error) => toast.error(error);

  const lobbies = Object.values(state.lobbies || {});
  const [searchedValue, setSearchedValue] = React.useState("");
  const [filteredLobbies, setFilteredLobbies] = React.useState(lobbies);
  const filterLobbyList = (newValue) => {
    if (newValue === "") {
      setFilteredLobbies(lobbies);
    } else {
      const filterLobbies = lobbies.filter(
        (lobby) =>
          lobby.name.toLowerCase().indexOf(newValue.toLowerCase()) > -1,
      );
      setFilteredLobbies(filterLobbies);
    }
  };
  React.useEffect(() => {
    filterLobbyList(searchedValue);
  }, [searchedValue, state.lobbies]);

  React.useEffect(() => {
    setupSocketRooms(dispatch);
  }, []);

  React.useEffect(() => {
    if (state.lobbyResponse.action === LOBBY.SUBSCRIBE) {
      if (state.lobbyResponse.type === "error") {
        notify(state?.lobbyResponse?.reason);
      } else if (state.lobbyResponse.type === "success") {
        dispatch(setLobby(state.lobbyResponse.payload));
        navigate(
          `/rooms/${state.lobbyResponse.payload.name}[${state.player.name}]`,
        );
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

      <SearchLobby
        searchedValue={searchedValue}
        setSearchedValue={(newValue) => setSearchedValue(newValue)}
      />

      <LobbyList
        filteredLobbies={filteredLobbies}
        state={state}
        dispatch={dispatch}
      />
      <ButtonsLobbies>
        <JoinButton players={state.players} lobbies={filteredLobbies} />
        <CreateButton onClick={() => setHasClickedCreate(true)} />
      </ButtonsLobbies>
    </FlexBox>
  );
}

const LobbyList = ({ filteredLobbies, state, dispatch }) => (
  <FlexBox
    direction="col"
    wrap="no-wrap"
    className="min-h-3/4 my-6 overflow-y-scroll hide-scroll"
  >
    {filteredLobbies.map((lobby, index) => (
      <LobbyItem lobby={lobby} key={index} state={state} dispatch={dispatch} />
    ))}
  </FlexBox>
);

const ButtonsLobbies = ({ children }) => (
  <FlexBox direction="row" className="justify-between">
    {children}
  </FlexBox>
);

const JoinButton = ({ players, lobbies }) => {
  const { state } = React.useContext(StoreContext);

  const isDisabled =
    !isEmpty(Object.keys(state.lobby)) ||
    lobbies.length === 0 ||
    lobbies.every(
      (lobby) =>
        lobby.isPlaying || parseInt(lobby.maxPlayer) === lobby.players.length,
    );

  const handleClick = () => {
    if (isDisabled) {
      return;
    }

    const joinableLobbies = lobbies.filter(
      (lobby) =>
        !lobby.isPlaying && parseInt(lobby.maxPlayer) > lobby.players.length,
    );
    const lobbyToJoin = joinableLobbies.reduce(
      (toJoin, lobby) =>
        lobby.players.length < toJoin.players.length ? lobby : toJoin,
      lobbies[0],
    );
    socket.emit(LOBBY.SUBSCRIBE, {
      lobbyId: lobbyToJoin.id,
      playerId: state.player.id,
    });
  };

  return (
    <button
      className={`w-3/5 ${isDisabled ? "disabled-btn" : "action-btn "}`}
      disabled={isDisabled}
      onClick={handleClick}
    >
      <FlexBox direction="col">
        <span className="text-base text-white">Join Game</span>
        <span className="text-s text-white">
          {Object.keys(players).length} players connected
        </span>
      </FlexBox>
    </button>
  );
};

const CreateButton = ({ onClick, ...rest }) => (
  <button className="w-1/3 action-btn" onClick={onClick} {...rest}>
    <span className="text-base text-white">Create Lobby</span>
  </button>
);
