import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Home from "pages/home/Home";
import Lobbies from "pages/lobbies/Lobbies";
import Lobby from "pages/lobby/LobbyContainer";
const LazyGameMulti = React.lazy(() => import("pages/game-multi/GameMulti"));
const LazyGameSolo = React.lazy(() => import("pages/game-solo/GameSolo"));
import FlexBox from "components/flexbox/FlexBox";
import { GameContextProvider } from "store";
import { StoreContext } from "store";
import useNavigate from "hooks/useNavigate";
import { LOBBIES } from "../../../config/actions/lobbies";
import { socket } from "store/middleware";
import { useTranslation } from "react-i18next";

/*
 **   You can had any Route you need inside the <Switch />
 **   The component that should be display for this Route
 **     must be passed as children.
 **   Documentation: https://reactrouter.com/web/guides/quick-start
 */
export default function Router() {
  return (
    <HashRouter hashType="noslash">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/single-player[solo]/game">
          <GameContextProvider>
            <LazyLoader LazyComponent={LazyGameSolo} />
          </GameContextProvider>
        </Route>
        <ProtectedRoutes />
      </Switch>
    </HashRouter>
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
          <Route exact path="/rooms/:roomName" component={Lobby} />
        </FlexBox>
      </Route>

      <Route exact path="/game-multi">
        <GameContextProvider>
          <LazyLoader LazyComponent={LazyGameMulti} />
        </GameContextProvider>
      </Route>
    </>
  );
};

const Fallback = () => {
  const { t } = useTranslation();

  return (
    <FlexBox
      height="full"
      className="justify-center items-center font-bold text-4xl"
    >
      {t("pages.router.loading")}
    </FlexBox>
  );
};

const LazyLoader = ({ LazyComponent }) => (
  <React.Suspense fallback={<Fallback />}>
    <LazyComponent />
  </React.Suspense>
);
