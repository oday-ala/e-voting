import { VOTING } from "../action-types";

const initialState = {
  allCandidates: [],
  voteTiming: Math.round(Date.now() / 1000).toString(),
  checkVoteResult: undefined,
  votedCandidate: undefined,
  winnerCandidate: undefined,
};

const voteReducer = (state = initialState, action) => {
  switch (action.type) {
    case VOTING.GET_ALL_CANDIDATE:
      return { ...state, allCandidates: action.payload };
    case VOTING.SET_VOTE_TIME:
      return { ...state, voteTiming: action.payload };
    case VOTING.CAST_YOUR_VOTES: {
      state.checkVoteResult.canVote = false;
      state.checkVoteResult.votedCandidate = action.payload;
      state.checkVoteResult.error = false;

      return { ...state, votedCandidate: action.payload };
    }

    case VOTING.CHECK_ALREADY_VOTED:
      return {
        ...state,
        checkVoteResult: action.payload,
        votedCandidate: action.payload.votedCandidate,
      };

    case VOTING.SET_VOTED_CANDIDATE:
      return { ...state, votedCandidate: action.payload.votedCandidate };

    case VOTING.GET_WINNER:
      return { ...state, winnerCandidate: action.payload };

    default:
      return state;
  }
};

export default voteReducer;
