import { AUTH } from "../action-types";

export const setLoginStatus = (payload) => {
  return {
    type: AUTH.SET_LOGIN_STATUS,
    payload,
  };
};

export const setAadhaarId = (payload) => {
  return {
    type: AUTH.SET_AADHAAR_ID,
    payload,
  };
};

export const setVotedCandidate = (payload) => {
  return {
    type: AUTH.SET_VOTED_CANDIDATE,
    payload,
  };
};

export const resetState = () => {
  return {
    type: AUTH.RESET,
  };
};
