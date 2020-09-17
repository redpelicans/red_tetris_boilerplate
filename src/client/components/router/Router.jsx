import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "pages/home/Home";
import Game from "pages/game/Game";
import Matchmaking from "pages/matchmaking/Matchmaking";

import { GameContextProvider } from "store";

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
        <Route path="/game">
          <GameContextProvider>
            <Game />
          </GameContextProvider>
        </Route>
        <Route path="/matchmaking">
          <Matchmaking />
        </Route>
        <Route render={() => <h1>Not found!</h1>} />
      </Switch>
    </BrowserRouter>
  );
}
