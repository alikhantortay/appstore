import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUser } from "../redux/auth/selectors";

export const RestrictedRoute = ({ component }) => {
  const { isLoggedIn } = useSelector(selectUser);
  return isLoggedIn ? <Navigate to="/" /> : component;
};
