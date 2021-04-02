import React, { createContext, useReducer } from "react";
import { InitialState, HyperReducer } from "./reducer'";

export const HyperContext = createContext(InitialState);

export const HyperProvider = ({ children }) => {
  const [state, dispatch] = useReducer(HyperReducer, InitialState);

  return (
    <HyperContext.Provider value={{ state, dispatch }}>
      {children}
    </HyperContext.Provider>
  );
};
