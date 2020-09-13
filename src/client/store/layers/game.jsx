import React from "react";
import { piecesReducer, initialPieces } from "reducers";
// import { asyncMiddleware } from "../middlewares";
import PropTypes from "prop-types";

export const GameContext = React.createContext();

export function GameContextProvider({ children }) {
  const [piecesState, piecesDispatch] = React.useReducer(
    piecesReducer,
    initialPieces,
  );

  return (
    <GameContext.Provider
      value={{
        state: piecesState,
        dispatch: piecesDispatch,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

GameContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
