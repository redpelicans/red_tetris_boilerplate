import React from "react";
import ReactDom from "react-dom";
import Router from "components/router/Router";
import { StoreContextProvider, SocketContextProvider } from "store";
import "./styles.scss";

ReactDom.render(
  <React.StrictMode>
    <StoreContextProvider>
      <SocketContextProvider>
        <Router />
      </SocketContextProvider>
    </StoreContextProvider>
  </React.StrictMode>,
  document.getElementById("tetris"),
);
