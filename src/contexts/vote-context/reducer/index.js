import { VOTING } from "../action-types";
import { initialState } from "../data";

export function voteReducer(state = initialState, action) {
  let checkVoteData;
  switch (action.type) {
    case VOTING.SET_LOADING:
      return { ...state, loading: action.payload };

    case VOTING.GET_ALL_CANDIDATES: {
      return {
        ...state,
        allCandidates: action.payload,
      };
    }

    case VOTING.SET_VOTE_TIME:
      return { ...state, voteTiming: action.payload };

    case VOTING.CAST_YOUR_VOTES:
      checkVoteData = {
        canVote: false,
        error: false,
        votedCandidate: action.payload,
      };
      return {
        ...state,
        votedCandidate: action.payload,
        checkVoteResult: checkVoteData,
      };

    case VOTING.CHECK_ALREADY_VOTED:
      return {
        ...state,
        checkVoteResult: action.payload,
        votedCandidate: undefined,
      };

    case VOTING.GET_WINNER:
      return { ...state, winningCandidate: action.payload };

    case VOTING.IS_CANDIDATE_ELIGIBLE:
      checkVoteData = {
        canVote: action.payload,
        error: false,
        votedCandidate: undefined,
      };
      return { ...state, checkVoteResult: checkVoteData };

    case VOTING.RESET:
      return initialState;

    default:
      return state;
  }
}
export default voteReducer;
