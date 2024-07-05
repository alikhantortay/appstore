import { useAuth } from "../../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

import { ReactComponent as ArrowRightIcon } from "../../../icons/ArrowRight.svg";

import {
  AuthLabelStyled,
  LogInBtnStyled,
} from "../../../styles/authStyles";
import {
  AuthLinksStyled,
  ForgetPasswordLowerTextStyled,
  ForgetPasswordStyled,
  ForgetPasswordUpperTextStyled,
} from "./ForgetPassword.styled";

const ForgetPassword = () => {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    resetPassword(form.elements.email.value);
    navigate("/user-account/sign-in");
  };

  return (
    <ForgetPasswordStyled>
      <h2>Forget Password</h2>
      <ForgetPasswordUpperTextStyled>
        Enter the email address associated with your Clicon
        account.
      </ForgetPasswordUpperTextStyled>

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
        <LogInBtnStyled type="submit">
          SEND LINK
          <ArrowRightIcon />
        </LogInBtnStyled>
      </form>

      <AuthLinksStyled>
        <li>
          <p>Already have account? </p>
          <Link to="/user-account/sign-in">Sign In</Link>
        </li>
        <li>
          <p>Don’t have account? </p>
          <Link to="/user-account/sign-up">Sign Up</Link>
        </li>
      </AuthLinksStyled>

      <ForgetPasswordLowerTextStyled>
        You may contact{" "}
        <Link to="/support">Customer Service</Link> for help
        restoring access to your account.
      </ForgetPasswordLowerTextStyled>
    </ForgetPasswordStyled>
  );
};

export default ForgetPassword;
