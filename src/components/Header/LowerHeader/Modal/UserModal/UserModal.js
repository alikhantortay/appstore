import { useRef } from "react";
import { useAuth } from "../../../../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const { username, isLoggedIn, role } = useSelector(selectUser);
  const isAdmin = role === 'ROLE_ADMIN';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    try {
      await logIn(
          form.elements.username.value,
          form.elements.password.value,
      );
      onClick(); // Закрываем модальное окно после успешного входа
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const changePasswordVisibility = () => {
    if (passwordRef.current) {
      passwordRef.current.type =
          passwordRef.current.type === "password" ? "text" : "password";
    }
  };

  const handleAdminPanelClick = () => {
    navigate('/admin');
    onClick(); // Закрываем модальное окно при переходе
  };

  return (
      <UserModalStyled name="userMenu">
        <UserModalTitleStyled>
          {isLoggedIn
              ? `Привет ${username}`
              : "Войдите в свой аккаунт"}
        </UserModalTitleStyled>
        {isLoggedIn ? (
            <>
              {isAdmin && (
                  <LogInBtnStyled
                      type="button"
                      onClick={handleAdminPanelClick}
                      style={{ marginBottom: '10px' }}
                  >
                    АДМИН ПАНЕЛЬ
                    <ArrowRightIcon />
                  </LogInBtnStyled>
              )}
              <LogInBtnStyled type="button" onClick={logOut}>
                ВЫХОД
              </LogInBtnStyled>
            </>
        ) : (
            <>
              <form onSubmit={handleSubmit}>
                <AuthLabelStyled htmlFor="username">
                  Имя пользователя
                  <input
                      id="username"
                      name="username"
                      type="text"
                      required
                  />
                </AuthLabelStyled>

                <AuthLabelStyled htmlFor="password">
                  Пароль
                  <Link
                      to="/" /* user-account/forget-password */
                      onClick={onClick}>
                    Забыли пароль
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
                      onClick={changePasswordVisibility}>
                    <EyeIcon />
                  </button>
                </AuthLabelStyled>

                <LogInBtnStyled type="submit">
                  ВОЙТИ
                  <ArrowRightIcon />
                </LogInBtnStyled>
              </form>
              <AuthSeparator>
                <p>ЕЩЕ НЕ ЗАРЕГИСТРИРОВАНЫ?</p>
              </AuthSeparator>
              <ModalLinkStyled
                  to="/user-account/sign-up"
                  onClick={onClick}>
                СОЗДАТЬ АККАУНТ
              </ModalLinkStyled>
            </>
        )}
      </UserModalStyled>
  );
};

