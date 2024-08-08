import { Suspense } from "react";
import {
  NavLink,
  Outlet,
  useLocation,
} from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

import { Container } from "../../components/Container/Container";
import { ReactComponent as GoogleIcon } from "../../icons/Google.svg";

import { AuthSeparator } from "../../styles/authStyles";
import {
  AccountPageStyled,
  AccountWrapper,
  FormWrapper,
  GoogleBtnStyled,
} from "./Account.styled";

const Account = () => {
  const { logInGoogle } = useAuth();
  const { pathname } = useLocation();

  return (
    <AccountPageStyled>
      <Helmet>
        <title>User Account</title>
      </Helmet>

      <Container>
        <AccountWrapper>
          {pathname !== "/user-account/forget-password" && (
            <>
              <NavLink to="sign-in">Sign In</NavLink>
              <NavLink to="sign-up">Sign Up</NavLink>
            </>
          )}
          <FormWrapper>
            <Suspense fallback={null}>
              <Outlet />
            </Suspense>
            {pathname !==
              "/user-account/forget-password" && (
              <>
                <AuthSeparator>
                  <p>or</p>
                </AuthSeparator>
                <GoogleBtnStyled
                  type="button"
                  aria-label="Login with Google"
                  onClick={logInGoogle}>
                  <GoogleIcon />
                  Login with Google
                </GoogleBtnStyled>
              </>
            )}
          </FormWrapper>
        </AccountWrapper>
      </Container>
    </AccountPageStyled>
  );
};

export default Account;
