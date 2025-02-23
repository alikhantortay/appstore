import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { makeErrorMessage } from "../makeErrorMessage";
import { addUser, removeUser } from "../redux/auth/slice";
import { useState } from "react";


// Функция для декодирования JWT токена
const decodeToken = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    console.error("Error decoding token", e);
    return null;
  }
};

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  // Централизованная обработка ошибок
  const handleAuthError = (error) => {
    if (error.response) {
      console.error("Server responded with an error:", error.response.data);
      makeErrorMessage(error.response.data || "Unknown error");
    } else if (error.request) {
      console.error("No response from the server:", error.request);
      makeErrorMessage("Server not responding. Try again later.");
    } else {
      console.error("Error during request setup:", error.message);
      makeErrorMessage("An unexpected error occurred.");
    }
  };

  // Обновление токена
  const refreshAccessToken = async () => {
    try {
      const refreshToken = sessionStorage.getItem("refreshToken");
      if (!refreshToken) throw new Error("No refresh token available");

      const response = await axios.post(`${apiBaseUrl}/auth/refresh`, {
        refreshToken,
      });

      const newAccessToken = response.data.accessToken;
      sessionStorage.setItem("accessToken", newAccessToken);

      // Обновляем информацию о пользователе в Redux store
      const decodedToken = decodeToken(newAccessToken);
      if (decodedToken) {
        dispatch(addUser({
          username: decodedToken.sub,
          role: decodedToken.role
        }));
      }

      return newAccessToken;
    } catch (error) {
      console.error("Token refresh failed:", error);
      logOut();
      throw error;
    }
  };

  // Интерсепторы Axios
  axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const newAccessToken = await refreshAccessToken();
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axios(originalRequest);
        }

        return Promise.reject(error);
      }
  );

  // Вход
  const logIn = async (username, password) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${apiBaseUrl}/auth/login`, {
        username,
        password,
      });

      const { accessToken, refreshToken } = response.data;

      // Сохраняем токены в sessionStorage
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);
      sessionStorage.setItem("username", username);

      // Расшифровываем токен
      const decodedToken = decodeToken(accessToken);

      if (decodedToken) {
        // Сохраняем пользователя и токены в Redux
        dispatch(
            addUser({
              username: decodedToken.sub,
              role: decodedToken.role,
              token: accessToken,
            })
        );
      }

      window.location.reload();
      Notify.success("Login successful");
      return response.data;
    } catch (error) {
      handleAuthError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };


  // Выход
  const logOut = () => {
    try {
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
      sessionStorage.removeItem("username");

      dispatch(removeUser());
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Проверка текущего пользователя
  const checkIsUserLoggedIn = () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const username = sessionStorage.getItem("username");

      if (accessToken && username) {
        const decodedToken = decodeToken(accessToken);
        if (decodedToken) {
          dispatch(addUser({
            username: decodedToken.sub,
            role: decodedToken.role
          }));
        }
        return true;
      } else {
        dispatch(removeUser());
        return false;
      }
    } catch (error) {
      dispatch(removeUser());
      console.error("Error during user check:", error);
      return false;
    }
  };

  // Регистрация
  const signUp = async (formData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${apiBaseUrl}/auth/register`, formData);

      sessionStorage.setItem("accessToken", response.data.accessToken);
      sessionStorage.setItem("refreshToken", response.data.refreshToken);
      sessionStorage.setItem("username", formData.username);

      dispatch(addUser({ username: formData.username }));

      Notify.success("Registration successful");
      return response.data;
    } catch (error) {
      handleAuthError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signUp,
    logIn,
    logOut,
    checkIsUserLoggedIn,
    isLoading,
  };
};
