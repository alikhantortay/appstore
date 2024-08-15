import { useRef, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Notify } from "notiflix/build/notiflix-notify-aio";

import { ReactComponent as ArrowRightIcon } from "../../icons/ArrowRight.svg";
import { ReactComponent as EyeIcon } from "../../icons/Eye.svg";
import { ReactComponent as CheckIcon } from "../../icons/Check.svg";

import {
  AgreementStyled,
  AuthLabelStyled,
  LogInBtnStyled,
} from "../../styles/authStyles";

const SignUp = () => {
  const [isAgree, setIsAgree] = useState(false);
  const { signUp } = useAuth();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      elements: { name, email, password, confirmPassword },
    } = e.currentTarget;

    if (password.value !== confirmPassword.value) {
      Notify.failure("Your passwords don't match!");
    } else {
      signUp(name.value, email.value, password.value) &&
        navigate("/user-account/sign-in");
    }
  };

  const changePasswordVisibilty = (ref) => {
    ref.current.type === "password"
      ? (ref.current.type = "text")
      : (ref.current.type = "password");
  };

  return (
    <form onSubmit={handleSubmit}>
      <AuthLabelStyled htmlFor="name">
        Name
        <input id="name" name="name" type="text" required />
      </AuthLabelStyled>

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
        <input
          id="password"
          name="password"
          type="password"
          ref={passwordRef}
          placeholder="8+ characters"
          required
        />
        <button
          type="button"
          aria-label="Show/hide Password"
          onClick={() =>
            changePasswordVisibilty(passwordRef)
          }>
          <EyeIcon />
        </button>
      </AuthLabelStyled>

      <AuthLabelStyled htmlFor="confirmPassword">
        Confirm Password
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="confirmPassword"
          ref={confirmPasswordRef}
          required
        />
        <button
          type="button"
          aria-label="Show/hide Password"
          onClick={() =>
            changePasswordVisibilty(confirmPasswordRef)
          }>
          <EyeIcon />
        </button>
      </AuthLabelStyled>

      <AgreementStyled>
        <div>
          <input
            name="agreement"
            type="checkbox"
            onChange={() =>
              setIsAgree((prevState) => !prevState)
            }
            required
          />
          {isAgree && <CheckIcon />}
        </div>
        <label>
          Are you agree to Clicon{" "}
          <span>Terms of Condition</span> and{" "}
          <span>Privacy Policy.</span>
        </label>
      </AgreementStyled>

      <LogInBtnStyled type="submit" aria-label="Sign up">
        SIGN UP
        <ArrowRightIcon />
      </LogInBtnStyled>
    </form>
  );
};

export default SignUp;
