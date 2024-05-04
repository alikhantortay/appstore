import { useRef } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../../../redux/auth/selectors";

import { ReactComponent as ArrowRightIcon } from "../../../../../../icons/ArrowRight.svg";
import { ReactComponent as EyeIcon } from "../../../../../../icons/Eye.svg";

import {
  LogInBtnStyled,
  UserModalFormStyled,
  UserModalSeparator,
  UserModalStyled,
  UserModalTitleStyled,
} from "./UserModal.styled";
import { logIn } from "../../../../../../firebase";
import { Link } from "react-router-dom";
import { ModalLinkStyled } from "../Modal.styled";

export const UserModal = () => {
  const passwordRef = useRef();
  const { displayName, isLoggedIn } =
    useSelector(selectUser);

  const handleSubmit = (e) => {
    e.preventDefault();
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
      <UserModalFormStyled onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email Address
          <input
            id="email"
            name="email"
            type="email"
            required
          />
        </label>

        <label htmlFor="password">
          Password
          <Link to="/signin/reset_password">
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
            onClick={changePasswordVisibilty}>
            <EyeIcon />
          </button>
        </label>

        <LogInBtnStyled type="submit">
          LOGIN
          <ArrowRightIcon />
        </LogInBtnStyled>
      </UserModalFormStyled>
      <UserModalSeparator>
        <p>Dont have account</p>
      </UserModalSeparator>
      <ModalLinkStyled to="/signin/signup">
        CREATE ACCOUNT
      </ModalLinkStyled>
    </UserModalStyled>
  );
};
