import { useCallback } from "react";
import { BallotService } from "../repository/Ballot";
import {
  getAllCandidate,
  checkVoterVoted,
  castVotes,
  setVoteDuration,
  userVoterEligibility,
  setWinner,
  setLoading,
  useVoteContext,
} from "../contexts";
import { toastError, toastSuccess } from "../utils/toastMessage";
import { useNavigate } from "react-router-dom";
import { setLoginStatus } from "../contexts";

export const useVote = () => {
  const s1 = BallotService.getInstance();
  const { dispatch } = useVoteContext();
  let navigate = useNavigate();

  const getAllCandidates = useCallback(async (voterAadhaarNo) => {
    try {
      dispatch(setLoading());
      const listData = await s1.getAllCandidates(voterAadhaarNo);
      dispatch(getAllCandidate(listData));
    } catch (error) {
      toastError("Error while retrieving candidates");
    } finally {
      dispatch(setLoading(false));
    }
  }, []);

  const checkVoterEligibility = useCallback(async (voterAadhaarNo) => {
    try {
      const isVoterEligible = await s1.isVoterEligible(voterAadhaarNo);
      if (isVoterEligible) {
        dispatch(userVoterEligibility(isVoterEligible));
        navigate("/home");
      } else {
        toastError("User age is less than 18 years, therefore he can't vote!");
        window.localStorage.clear();
        dispatch(setLoginStatus(false));
        dispatch(userVoterEligibility(isVoterEligible));
        navigate("/");
      }
    } catch (error) {
      toastError("Error while checking user details");
    }
  }, []);

  const checkUserVotingStatus = useCallback(async (voterAadharNo) => {
    try {
      const voteStatus = await s1.checkVoterVoted(voterAadharNo);
      // console.log(voteStatus, "voteStatus");
      if (voteStatus.canVote) {
        dispatch(checkVoterVoted(voteStatus));
      } else {
        toastError("Your vote has been already registered");
        dispatch(userVoterEligibility(voteStatus.canVote));
        voteStatus.votedCandidate &&
          dispatch(castVotes(voteStatus.votedCandidate));
      }
    } catch (e) {
      toastError("Error while checking user details");
    }
  }, []);

  const castVote = useCallback(async (voterAadhaarNo, candidate) => {
    try {
      console.log(candidate);
      dispatch(setLoading(true));
      const voteStatus = await s1.castYourVote(
        voterAadhaarNo,
        candidate.nominationNumber
      );
      if (voteStatus.error) {
        toastError(voteStatus.msg);
      } else {
        dispatch(castVotes(candidate));
        toastSuccess(voteStatus.msg);
      }
    } catch (e) {
      toastError("Error while casting vote");
    } finally {
      dispatch(setLoading(false));
    }
  }, []);

  const getVoteTiming = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const voteTiming = await s1.getVotingTimeDuration();
      dispatch(setVoteDuration(voteTiming));
    } catch (e) {
      toastError("Error while getting vote time");
    } finally {
      dispatch(setLoading(false));
    }
  }, []);

  const getResult = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const winners = await s1.getElectionResult();
      console.log(winners);
      dispatch(setWinner(winners));
    } catch (error) {
      toastError("Error while getting results");
    } finally {
      dispatch(setLoading(false));
    }
  }, []);

  return {
    castVote,
    getAllCandidates,
    checkUserVotingStatus,
    getVoteTiming,
    getResult,
    checkVoterEligibility,
  };
};
