import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUser } from "../redux/auth/selectors";

export const RestrictedRoute = ({ component }) => {
  const user = useSelector(selectUser);

  console.log(user);

  return user.isLoggedIn ? <Navigate to="/" /> : component;
};
