import { getCurrentEpoch } from "../utils/util";
import { CONTRACT_ADDRESS } from "./config";
import { Contract, ethers } from "ethers";

const contractABI = require("./Ballot.json");

export class BallotService {
  constructor() {}

  static getInstance() {
    if (!BallotService.instance) {
      BallotService.instance = new BallotService();
    }

    return BallotService.instance;
  }
  checkedWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask!");
        return false;
      }
      await ethereum.enable();

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${Number(5).toString(16)}` }],
      });
      this._accountAddress = accounts[0];
      this._ballotContract = this.getBallotContract(CONTRACT_ADDRESS);
      return true;
    } catch (error) {
      console.log(error);
      alert(error);
      return false;
    }
  };

  async ethEnabled() {
    return await this.checkedWallet();
  }

  getBallotContract(contractAddress) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI["abi"], signer);
  }

  async getAllCandidates(voterAadhaarNumber) {
    try {
      await this.ethEnabled();
      const candidateList = await this._ballotContract.getCandidateList(
        voterAadhaarNumber
      );
      let temp = [];
      for (let i = 0; i < candidateList.length; i++) {
        const {
          nominationNumber,
          3: nominationNumber1,
          ...rest
        } = candidateList[i];
        rest[3] = parseInt(nominationNumber1);
        rest.nominationNumber = parseInt(nominationNumber1);
        temp.push(rest);
      }
      // console.log(temp);
      return temp;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async isVoterEligible(voterAadhaarNo) {
    try {
      await this.ethEnabled();
      const isEligible = await this._ballotContract.isVoterEligible(
        voterAadhaarNo
      );
      return isEligible;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  }

  async castYourVote(voterAadhaarNo, nominationNumber) {
    try {
      await this.ethEnabled();
      const secondsSinceEpoch = getCurrentEpoch();
      if (this._accountAddress === undefined) {
        await this.ethEnabled();
      }
      let castVoteRes;
      const castVote = await this.checkVoterVoted(voterAadhaarNo);
      console.log(castVote, "castVote", nominationNumber, voterAadhaarNo);
      // Check if voter already casted his vote
      if (castVote.canVote) {
        const giveVote = await this._ballotContract.vote(
          nominationNumber,
          voterAadhaarNo,
          secondsSinceEpoch
        );
        // .send();
        console.log("vote Casted => ", giveVote);
        castVoteRes = {
          msg: "You successfully casted your vote!",
          error: false,
        };
      } else {
        castVoteRes = {
          msg:
            "Already vote casted to" +
            castVote.votedCandidate?.name +
            " - " +
            castVote.votedCandidate?.partyShortcut,
          error: false,
        };
      }
      return castVoteRes;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  }

  async checkVoterVoted(voterAadhaarNo) {
    let votedCandidate;
    try {
      await this.ethEnabled();
      const voted = await this._ballotContract.didCurrentVoterVoted(
        voterAadhaarNo
      );
      votedCandidate = {
        canVote: !voted.userVoted_,
        votedCandidate: voted.candidate_,
        error: false,
      };
      return votedCandidate;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  }

  async getElectionResult() {
    try {
      await this.ethEnabled();
      // const secondsSinceEpoch = getCurrentEpoch();
      const secondsSinceEpoch = 1900904953;
      const result = await this._ballotContract.getResults(secondsSinceEpoch);

      return result;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  }

  async getVotingTimeDuration() {
    try {
      await this.ethEnabled();
      const voteDuration = await this._ballotContract.getVotingEndTime();
      console.log(voteDuration);
      return voteDuration;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  }
}
