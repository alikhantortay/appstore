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
              <NavLink to="sign-in">ВОЙТИ</NavLink>
              <NavLink to="sign-up">ЗАРЕГИСТРИ <span>РОВАТЬСЯ</span></NavLink>
            </>
          )}
          <FormWrapper>
            <Suspense fallback={null}>
              <Outlet />
            </Suspense>
          </FormWrapper>
        </AccountWrapper>
      </Container>
    </AccountPageStyled>
  );
};

export default Account;
