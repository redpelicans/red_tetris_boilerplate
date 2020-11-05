import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "pages/home/Home";
import Lobbies from "pages/lobbies/Lobbies";
import Lobby from "pages/lobby/LobbyContainer";
import GameMulti from "pages/game-multi/GameMulti";
import GameSolo from "pages/game-solo/GameSolo";

import FlexBox from "components/flexbox/FlexBox";
import { GameContextProvider } from "store";
import { StoreContext } from "store";
import useNavigate from "hooks/useNavigate";
import { LOBBIES } from "../../../config/actions/lobbies";
import { socket } from "store/sockets/sockets";
/*
 **   You can had any Route you need inside the <Switch />
 **   The component that should be display for this Route
 **     must be passed as children.
 **   Documentation: https://reactrouter.com/web/guides/quick-start
 */
export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/game-solo">
          <GameContextProvider>
            <GameSolo />
          </GameContextProvider>
        </Route>
        <ProtectedRoutes />
      </Switch>
    </BrowserRouter>
  );
}

const ProtectedRoutes = () => {
  const { state } = React.useContext(StoreContext);
  const { navigate } = useNavigate();

  React.useEffect(() => {
    if (!Object.keys(state.player).length) {
      navigate("/");
    }
    socket.emit(LOBBIES.SUBSCRIBE);
  }, []);

  return (
    <>
      <Route path="/rooms">
        <FlexBox
          width="full"
          height="full"
          className="justify-center overflow-hidden relative"
        >
          <Lobbies />
          <Route exact path="/rooms/id" component={Lobby} />
        </FlexBox>
      </Route>

      <Route path="/game-multi">
        <GameContextProvider>
          <GameMulti />
        </GameContextProvider>
      </Route>
    </>
  );
};
