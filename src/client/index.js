import React from "react";
import ReactDom from "react-dom";
import Router from "components/router/Router";
import { StoreContextProvider } from "store";
import { ToastContainer } from "react-toastify";
import LanguageSelection from "components/language/LanguageSelection";
import "react-toastify/dist/ReactToastify.css";
import "./styles.scss";
import "locales/i18n";

ReactDom.render(
  <StoreContextProvider>
    <Router />
    <LanguageSelection />
    <ToastContainer />
  </StoreContextProvider>,
  document.getElementById("tetris"),
);
