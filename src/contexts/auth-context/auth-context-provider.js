import React, { createContext, useContext, useReducer } from "react";
import { authReducer } from "./reducer";
import { initialState } from "./data";

const AuthContext = createContext({
  state: initialState,
  dispatch: null,
});

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
