import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import TestSockets from "../../pages/TestSockets";

/*
 **   You can had any Route you need inside the <Switch />
 **   The component that should be display for this Route must be passed as children
 **   Documentation: https://reactrouter.com/web/guides/quick-start
 */
export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route to="/">
          <TestSockets />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
