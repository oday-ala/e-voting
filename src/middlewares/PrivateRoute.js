import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../contexts";

const PrivateRoute = ({ children }) => {
  const {
    state: { isUserLoggedIn },
  } = useAuthContext();
  const state = useLocation();

  const userStatus = localStorage.getItem("LOGGEDIN_AADHAAR_ID");

  console.log("isUserLoggedIn", "private");

  return isUserLoggedIn || userStatus ? (
    children
  ) : (
    <Navigate replace to="/login" state={{ from: state.pathname }} />
  );
};

export default PrivateRoute;
