import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { makeErrorMessage } from "../makeErrorMessage";
import { addUser, removeUser } from "../redux/auth/slice";
import { useState } from "react";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Состояние загрузки

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  // Централизованная обработка ошибок
  const handleAuthError = (error) => {
    if (error.response) {
      console.error("Server responded with an error:", error.response.data);
      makeErrorMessage(error.response.data.message || "Unknown error");
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

      sessionStorage.setItem("accessToken", response.data.accessToken);
      return response.data.accessToken;
    } catch (error) {
      console.error("Token refresh failed:", error);
      logOut(); // Выход из системы при неудачном обновлении
      throw error;
    }
  };

  // Интерсепторы Axios для автоматического обновления токена
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

  // Вход
  const logIn = async (username, password) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${apiBaseUrl}/auth/login`, {
        username,
        password,
      });

      sessionStorage.setItem("accessToken", response.data.accessToken);
      sessionStorage.setItem("refreshToken", response.data.refreshToken);
      sessionStorage.setItem("username", username);

      dispatch(addUser({ username }));
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
        dispatch(addUser({ username }));
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

  return {
    signUp,
    logIn,
    logOut,
    checkIsUserLoggedIn,
    isLoading,
  };
};
