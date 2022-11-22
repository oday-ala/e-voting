import { Routes as ParentRoutes, Route } from "react-router";
import PrivateRoute from "../middlewares/PrivateRoute";
import LoginPage from "../pages/Login";
import ErrorPage from "../pages/Error";
import VotingPage from "../pages/Voting";
import AlreadyCastedPage from "../pages/Home/AlreadyCasted";
import HomePage from "../pages/Home/Home";
import {
  useVoteContext,
  setLoginStatus,
  setAadhaarId,
  useAuthContext,
} from "../contexts";
import LandingPage from "../pages/Landing";
import ResultsPage from "../pages/Results";

const Routes = () => {
  const {
    state: { checkVoteResult },
  } = useVoteContext();
  const {
    state: { isUserLoggedIn },
    dispatch,
  } = useAuthContext();
  const userStatus = localStorage.getItem("LOGGEDIN_AADHAAR_ID");
  if (userStatus && !isUserLoggedIn) {
    dispatch(setLoginStatus(true));
    dispatch(setAadhaarId(userStatus));
  }

  return (
    <ParentRoutes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/*" element={<ErrorPage />} />
      <Route path="/results" element={<ResultsPage />} />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            {checkVoteResult && !checkVoteResult.canVote ? (
              <AlreadyCastedPage />
            ) : (
              <HomePage />
            )}
          </PrivateRoute>
        }
      />
      <Route
        path="/vote"
        element={
          <PrivateRoute>
            <VotingPage />
          </PrivateRoute>
        }
      />
    </ParentRoutes>
  );
};

export default Routes;
