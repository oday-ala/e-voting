import { AUTH } from "../action-types";
import { initialState } from "../data";

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH.SET_LOGIN_STATUS:
      return { ...state, isUserLoggedIn: action.payload };

    case AUTH.SET_AADHAAR_ID: {
      localStorage.setItem("LOGGEDIN_AADHAAR_ID", action.payload);
      return {
        ...state,
        aadhaarId: action.payload,
      };
    }

    case AUTH.RESET:
      localStorage.removeItem("LOGGEDIN_AADHAAR_ID");
      window.localStorage.clear();
      return initialState;

    default:
      return state;
  }
}
export default authReducer;
