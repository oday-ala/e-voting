import React, { createContext, useContext, useReducer } from "react";
import { voteReducer } from "./reducer";
import { initialState } from "./data";

const VoteContext = createContext({
  state: initialState,
  dispatch: null,
});

const VoteContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(voteReducer, initialState);

  return (
    <VoteContext.Provider value={{ state, dispatch }}>
      {children}
    </VoteContext.Provider>
  );
};

export default VoteContextProvider;

export const useVoteContext = () => useContext(VoteContext);
