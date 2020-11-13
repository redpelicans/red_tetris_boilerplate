import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import { Link } from "react-router-dom";
import LobbyItem from "./LobbyItem";
import CreateLobby from "./CreateLobby";
import Overlay from "components/overlay/Overlay";
import SearchLobby from "./SearchLobby";
import { StoreContext } from "store";
import "./Lobbies.scss";
import { socket, socketRoomsOn } from "store/middleware";
import useNavigate from "hooks/useNavigate";
import { setLobby, setLobbyResponse } from "actions/store";
import { toast } from "react-toastify";
import { LOBBY } from "../../../config/actions/lobby";
import { isEmpty } from "helpers/common";
import { useTranslation } from "react-i18next";
import ButtonSpecial from "components/button/ButtonSpecial";

export default function Lobbies() {
  const { t } = useTranslation();
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
    socketRoomsOn(dispatch);
  }, []);

  React.useEffect(() => {
    if (state.lobbyResponse.action === LOBBY.SUBSCRIBE) {
      if (state.lobbyResponse.type === "error") {
        notify(state?.lobbyResponse?.reason);
      } else if (state.lobbyResponse.type === "success") {
        dispatch(setLobby(state.lobbyResponse.payload));
        dispatch(setLobbyResponse({}));
      }
    }
  }, [state.lobbyResponse]);

  React.useEffect(() => {
    if (!isEmpty(Object.keys(state.lobby))) {
      navigate(`/rooms/${state.lobby.name}[${state.player.name}]`);
    }
  }, [state.lobby]);

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
          data-testid="overlay_create_lobby"
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

      <Link
        className="fixed top-0 left-0 pt-1 px-1 mt-1 ml-16 text-sm border rounded shadow"
        to="/"
      >
        {t("pages.lobbies.go_back_home")}
      </Link>

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

const LobbyList = ({ filteredLobbies, state, dispatch }) => {
  const { t } = useTranslation();

  return (
    <FlexBox
      direction="col"
      wrap="no-wrap"
      className="min-h-3/4 my-6 overflow-y-scroll hide-scroll"
    >
      {filteredLobbies.length > 0 ? (
        filteredLobbies.map((lobby, index) => (
          <LobbyItem
            lobby={lobby}
            key={index}
            state={state}
            dispatch={dispatch}
          />
        ))
      ) : (
        <p className="text-center italic">
          {t("pages.lobbies.empty_lobby_list")}.
        </p>
      )}
    </FlexBox>
  );
};

const ButtonsLobbies = ({ children }) => (
  <FlexBox direction="row" className="justify-between">
    {children}
  </FlexBox>
);

const JoinButton = ({ players, lobbies }) => {
  const { t } = useTranslation();
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
    <ButtonSpecial
      className={`w-3/5 ${isDisabled ? "disabled-btn" : "action-btn "}`}
      disabled={isDisabled}
      onClick={handleClick}
    >
      <FlexBox direction="col">
        <span className="font-semibold text-white">
          {t("pages.lobbies.join_game")}
        </span>
        <span className="text-sm text-white">
          {t("pages.lobbies.players_connected", {
            count: Object.keys(players || {}).length,
          })}
        </span>
      </FlexBox>
    </ButtonSpecial>
  );
};

const CreateButton = ({ onClick, ...rest }) => {
  const { t } = useTranslation();

  return (
    <button className="w-1/3 action-btn" onClick={onClick} {...rest}>
      <span className="font-semibold text-white">
        {t("pages.lobbies.create_lobby")}
      </span>
    </button>
  );
};
