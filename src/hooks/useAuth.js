import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { makeErrorMessage } from "../makeErrorMessage";
import { jwtDecode } from "jwt-decode";
import { addUser, removeUser } from "../redux/auth/slice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  // Регистрация
  const signUp = async (formData) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/auth/register`, formData);
  
      // После успешной регистрации сохраняем нового пользователя
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("username", formData.username);
  
      // Добавляем нового пользователя в Redux
      dispatch(addUser({ username: formData.username }));
  
      Notify.success("Registration successful");
      return response.data;
    } catch (error) {
      console.error("Error during registration:", error);
      makeErrorMessage(error.response?.data?.message || "An error occurred");
      throw error;
    }
  };
  
  

  const logIn = async (username, password) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/auth/login`, {
        username,
        password,
      });
  
      console.log("Response data:", response.data);
  
      // Сохраняем токены
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
  
      // Сохраняем username в localStorage
      localStorage.setItem("username", username);
  
      dispatch(addUser({ username }));
      Notify.success("Login successful");
      return response.data;
    } catch (error) {
      console.error("Login failed:", error.message);
      makeErrorMessage(error.response?.data?.message || "An error occurred");
      throw error;
    }
  };
  

  // Выход из системы
  const logOut = () => {
    try {
      // Удаляем токены и данные пользователя из localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("username");
  
      // Удаляем пользователя из Redux
      dispatch(removeUser());
  
      // Перенаправляем на главную страницу
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  

  // Проверка текущего пользователя
  const checkIsUserLoggedIn = () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const username = localStorage.getItem("username");
  
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
  };
};
