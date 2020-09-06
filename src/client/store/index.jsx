import React from "react";
import { storeReducer, initialStore } from "reducers";
import { asyncMiddleware } from "./middlewares";
import PropTypes from "prop-types";

export const StoreContext = React.createContext();

export function StoreContextProvider({ children }) {
  const [state, dispatch] = React.useReducer(storeReducer, initialStore);

  return (
    <StoreContext.Provider
      value={{ state, dispatch: asyncMiddleware(dispatch) }}
    >
      {children}
    </StoreContext.Provider>
  );
}

StoreContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
