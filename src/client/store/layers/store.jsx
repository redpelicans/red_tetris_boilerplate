import React from "react";
import { storeReducer, initialStore } from "reducers";
import PropTypes from "prop-types";

export const StoreContext = React.createContext();

export function StoreContextProvider({ children }) {
  const [storeState, storeDispatch] = React.useReducer(
    storeReducer,
    initialStore,
  );

  return (
    <StoreContext.Provider
      value={{
        state: storeState,
        dispatch: storeDispatch,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

StoreContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.node,
  ]).isRequired,
};
