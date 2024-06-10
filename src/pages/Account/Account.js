import { Suspense } from "react";
import {
  NavLink,
  Outlet,
  useLocation,
} from "react-router-dom";
import { logInGoogle } from "../../firebase";

import { Container } from "../../components/Container/Container";
import { ReactComponent as GoogleIcon } from "../../icons/Google.svg";

import {
  AccountPageStyled,
  AccountWrapper,
  FormWrapper,
  GoogleBtnStyled,
} from "./Account.styled";
import { AuthSeparator } from "../../styles/authUI.styled";

const Account = () => {
  const { pathname } = useLocation();

  return (
    <AccountPageStyled>
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
