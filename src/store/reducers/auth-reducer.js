import { AUTH } from "../action-types";

const initialState = {
  aadhaarId: "1234567896",
  OTP: "123456",
  isUserLoggedIn: false,
  isLoading: false,
  isEligible: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH.SET_LOGIN_STATUS:
      return { ...state, isUserLoggedIn: action.payload };
    case AUTH.RESET:
      return initialState;
    case AUTH.SET_ELIGIBLE:
      return { ...state, isEligible: action.payload };

    default:
      return state;
  }
};

export default authReducer;
