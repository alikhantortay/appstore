import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/auth/selectors";
import {
  logIn,
  logOut,
  signUp,
  logInGoogle,
  resetPassword,
} from "../../../firebase";

export const AuthHead = () => {
  const reduxUser = useSelector(selectUser);

  return (
    <div>
      <p>{reduxUser.isLoggedIn ? "In" : "Out"}</p>
      <button
        type="button"
        onClick={() => {
          signUp(
            "zzyzz",
            "kagowo8423@agafx.com",
            "qwerty123",
          );
        }}>
        register
      </button>
      <button
        type="button"
        onClick={() =>
          logIn("kagowo8423@agafx.com", "jkl3030")
        }>
        login
      </button>

      <button type="button" onClick={logOut}>
        logOut
      </button>
      <button type="button" onClick={logInGoogle}>
        logInGoogle
      </button>
      <button
        type="button"
        onClick={() =>
          resetPassword("kagowo8423@agafx.com")
        }>
        RESET
      </button>
    </div>
  );
};
