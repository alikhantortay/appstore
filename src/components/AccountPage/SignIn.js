import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import { ReactComponent as ArrowRightIcon } from "../../icons/ArrowRight.svg";
import { ReactComponent as EyeIcon } from "../../icons/Eye.svg";

import {
  AuthLabelStyled,
  AuthSeparator,
  LogInBtnStyled,
} from "../../styles/authStyles";

const SignIn = () => {
  const { logIn } = useAuth(); // Подключаем метод логина из useAuth
  const navigate = useNavigate(); // Для перенаправления после логина
  const passwordRef = useRef(); // Для управления видимостью пароля

  // Локальные состояния для формы
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Отключаем стандартное поведение формы
    try {
      // Вызываем logIn с данными пользователя
      await logIn(username, password);
      navigate("/"); // Перенаправляем на домашнюю страницу после успешного входа
      window.location.reload(); // 🔄 Перезагружаем страницу после навигации
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const changePasswordVisibility = () => {
    passwordRef.current.type === "password"
        ? (passwordRef.current.type = "text")
        : (passwordRef.current.type = "password");
  };

  return (
      <div>
        <h2>Войдите в свой аккаунт</h2>
        <form onSubmit={handleSubmit}>
          {/* Поле ввода имени пользователя */}
          <AuthLabelStyled htmlFor="username">
            Имя пользователя
            <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
          </AuthLabelStyled>

          {/* Поле ввода пароля */}
          <AuthLabelStyled htmlFor="password">
            Пароль
            <Link to="/"> {/* user-account/forget-password */}
              Забыли пароль
            </Link>
            <input
                id="password"
                name="password"
                type="password"
                ref={passwordRef}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button
                type="button"
                aria-label="Show/hide Password"
                onClick={changePasswordVisibility}
            >
              <EyeIcon />
            </button>
          </AuthLabelStyled>

          {/* Кнопка логина */}
          <LogInBtnStyled type="submit">
            ВОЙТИ
            <ArrowRightIcon />
          </LogInBtnStyled>
        </form>
      </div>
  );
};

export default SignIn;
