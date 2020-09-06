import React from "react";
import ReactDom from "react-dom";
import Router from "components/router/Router";
import { StoreContextProvider } from "store";
import "./styles.scss";

ReactDom.render(
  <React.StrictMode>
    <StoreContextProvider>
      <Router />
    </StoreContextProvider>
  </React.StrictMode>,
  document.getElementById("tetris"),
);
