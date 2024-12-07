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
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    phoneNumber: "",
    userType: "PHYSICAL",
    firstName: "",
    lastName: "",
    bin: "",
    companyName: "",
  });

  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [isAgree, setIsAgree] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signUp(formData);
      Notify.success("Registration successful!");
      navigate("/user-account/sign-in");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <AuthLabelStyled htmlFor="userType">
        <span>Тип пользователя</span>
        <select
          id="userType"
          name="userType"
          value={formData.userType}
          onChange={handleInputChange}
          className="styled-select"
        >
          <option value="PHYSICAL">Физическое Лицо</option>
          <option value="JURIDICAL">Юридическое лицо</option>
        </select>
      </AuthLabelStyled>

      <AuthLabelStyled htmlFor="username">
        Имя пользователя
        <input
          id="username"
          name="username"
          type="text"
          placeholder="Имя пользователя"
          value={formData.username}
          onChange={handleInputChange}
          required
        />
      </AuthLabelStyled>

      <AuthLabelStyled htmlFor="password">
        Пароль
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
      </AuthLabelStyled>

      <AuthLabelStyled htmlFor="phoneNumber">
        Номер
        <input
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          placeholder="Номер"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          required
        />
      </AuthLabelStyled>

      <AuthLabelStyled htmlFor="firstName">
        Имя
        <input
          id="firstName"
          name="firstName"
          type="text"
          placeholder="Имя"
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />
      </AuthLabelStyled>

      <AuthLabelStyled htmlFor="lastName">
        Фамилия
        <input
          id="lastName"
          name="lastName"
          type="text"
          placeholder="Фамилия"
          value={formData.lastName}
          onChange={handleInputChange}
          required
        />
      </AuthLabelStyled>

      {formData.userType === "JURIDICAL" && (
        <>
          <AuthLabelStyled htmlFor="username">
            БИН
            <input
              id="bin"
              name="bin"
              type="text"
              placeholder="БИН"
              value={formData.bin}
              onChange={handleInputChange}
              required
            />
          </AuthLabelStyled>

          <AuthLabelStyled htmlFor="username">
            Имя компании
            <input
              id="companyName"
              name="companyName"
              type="text"
              placeholder="Имя компании"
              value={formData.companyName}
              onChange={handleInputChange}
              required
            />
          </AuthLabelStyled>
        </>
      )}

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
        Согласны ли вы с{" "}
          <span>Условиями AppStore</span> и{" "}
          <span>Политикой конфиденциальности.</span>
        </label>
      </AgreementStyled>


      <LogInBtnStyled type="submit" aria-label="Sign up">
        ЗАРЕГИСТРИРОВАТЬСЯ
      </LogInBtnStyled>
    </form>
  );
};

export default SignUp;
