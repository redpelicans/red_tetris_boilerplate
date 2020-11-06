import React from "react";
import ReactDom from "react-dom";
import Router from "components/router/Router";
import { StoreContextProvider } from "store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.scss";
import "locales/i18n";

ReactDom.render(
  // <React.StrictMode>
  <StoreContextProvider>
    <Router />
    <ToastContainer />
  </StoreContextProvider>,
  // </React.StrictMode>,
  document.getElementById("tetris"),
);
