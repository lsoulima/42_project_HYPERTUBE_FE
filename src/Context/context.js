import React, { createContext, useReducer } from "react";
import { Initialstate, HyperReducer } from "./reducer";

export const HyperContext = createContext(Initialstate);

export const HyperProvider = ({ children }) => {
  const [state, dispatch] = useReducer(HyperReducer, Initialstate);

  return (
    <HyperContext.Provider value={{ state, dispatch }}>
      {children}
    </HyperContext.Provider>
  );
};
