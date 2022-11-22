import { VOTING } from "../action-types";

export function getAllCandidate(payload) {
  return {
    type: VOTING.GET_ALL_CANDIDATE,
    payload,
  };
}

export function castVotes(payload) {
  return {
    type: VOTING.CAST_YOUR_VOTES,
    payload,
  };
}

export function checkVoterVoted(payload) {
  return {
    type: VOTING.CHECK_ALREADY_VOTED,
    payload,
  };
}
export function setWinner(payload) {
  return {
    type: VOTING.GET_WINNER,
    payload,
  };
}
export function setVoteDuration(payload) {
  return {
    type: VOTING.SET_VOTE_TIME,
    payload,
  };
}
