import { VOTING } from "../action-types";

export const setLoading = (payload) => {
  return {
    type: VOTING.SET_LOADING,
    payload,
  };
};

export const getAllCandidate = (payload) => {
  return {
    type: VOTING.GET_ALL_CANDIDATES,
    payload,
  };
};

export const castVotes = (payload) => {
  return {
    type: VOTING.CAST_YOUR_VOTES,
    payload,
  };
};
export const checkVoterVoted = (payload) => {
  return {
    type: VOTING.CHECK_ALREADY_VOTED,
    payload,
  };
};
export const setWinner = (payload) => {
  return {
    type: VOTING.GET_WINNER,
    payload,
  };
};
export const setVoteDuration = (payload) => {
  return {
    type: VOTING.SET_VOTE_TIME,
    payload,
  };
};
export const userVoterEligibility = (payload) => {
  return {
    type: VOTING.IS_CANDIDATE_ELIGIBLE,
    payload,
  };
};

export const resetVoteContextState = (payload) => {
  return {
    type: VOTING.RESET,
  };
};
