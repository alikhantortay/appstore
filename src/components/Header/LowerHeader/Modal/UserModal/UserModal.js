import { useRef } from "react";
import { useAuth } from "../../../../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../../redux/auth/selectors";

import { ReactComponent as ArrowRightIcon } from "../../../../../icons/ArrowRight.svg";
import { ReactComponent as EyeIcon } from "../../../../../icons/Eye.svg";

import { ModalLinkStyled } from "../Modal.styled";
import {
  UserModalStyled,
  UserModalTitleStyled,
} from "./UserModal.styled";
import {
  AuthLabelStyled,
  AuthSeparator,
  LogInBtnStyled,
} from "../../../../../styles/authStyles";

export const UserModal = ({ onClick }) => {
  const { logIn, logOut } = useAuth();

  const passwordRef = useRef();
  const { displayName, isLoggedIn } =
    useSelector(selectUser);

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    logIn(
      form.elements.email.value,
      form.elements.password.value,
    );
  };

  const changePasswordVisibilty = () => {
    passwordRef.current.type === "password"
      ? (passwordRef.current.type = "text")
      : (passwordRef.current.type = "password");
  };

  return (
    <UserModalStyled name="userMenu">
      <UserModalTitleStyled>
        {isLoggedIn
          ? `Welcome ${displayName}`
          : "Sign in to your account"}
      </UserModalTitleStyled>
      {isLoggedIn ? (
        <LogInBtnStyled type="button" onClick={logOut}>
          LOG OUT
        </LogInBtnStyled>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <AuthLabelStyled htmlFor="email">
              Email Address
              <input
                id="email"
                name="email"
                type="email"
                required
              />
            </AuthLabelStyled>

            <AuthLabelStyled htmlFor="password">
              Password
              <Link
                to="/user-account/forget-password"
                onClick={onClick}>
                Forget Password
              </Link>
              <input
                id="password"
                name="password"
                type="password"
                ref={passwordRef}
                required
              />
              <button
                type="button"
                aria-label="Show/hide Password"
                onClick={changePasswordVisibilty}>
                <EyeIcon />
              </button>
            </AuthLabelStyled>

            <LogInBtnStyled type="submit">
              LOGIN
              <ArrowRightIcon />
            </LogInBtnStyled>
          </form>
          <AuthSeparator>
            <p>Don't have account</p>
          </AuthSeparator>
          <ModalLinkStyled
            to="/user-account/sign-up"
            onClick={onClick}>
            CREATE ACCOUNT
          </ModalLinkStyled>
        </>
      )}
    </UserModalStyled>
  );
};
