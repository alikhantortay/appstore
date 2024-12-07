import styled from "styled-components";

export const AuthLabelStyled = styled.label`
  display: block;
  position: relative;
  margin-bottom: 16px;

  color: var(--title);

  input {
    width: 100%;
    height: 44px;
    margin-top: 8px;
    padding: 0 12px;
    border: 1px solid rgb(228, 231, 233);
    border-radius: 2px;
    background-color: transparent;

    &:focus {
      outline-color: var(--primary);
    }
  }

  a {
    float: right;
    padding: 0 4px;
    border-radius: 2px;
    transition: background-color 250ms ease;

    font-weight: 500;
    color: var(--price);

    &:hover,
    &:focus {
      background-color: var(--warningSecondary);
    }
  }

  .styled-select {
  width: 100%;
  padding: 10px;
  margin-top: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  font-family: inherit;
  background: #f9f9f9;
  color: #333;
  outline: none;
  appearance: none; /* Убираем стрелку по умолчанию */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23666'%3E%3Cpath d='M7 10l5 5 5-5H7z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px top 50%;
  background-size: 12px;
}

.styled-select:focus {
  border-color: #ffa500;
  background-color: #fff;
}

.checkbox-container {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #666;
  gap: 10px;
}

.checkbox-container input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkbox-container .checkmark {
  width: 18px;
  height: 18px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 3px;
  display: inline-block;
  position: relative;
  cursor: pointer;
}

.checkbox-container .checkmark::after {
  content: "";
  position: absolute;
  display: none;
  left: 4px;
  top: 1px;
  width: 6px;
  height: 12px;
  border: solid #ffa500;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox-container input[type="checkbox"]:checked ~ .checkmark::after {
  display: block;
}

.agreement-text {
  font-size: 14px;
  line-height: 1.4;
}

.agreement-text a {
  color: #ffa500;
  text-decoration: none;
}

.agreement-text a:hover {
  text-decoration: underline;
}

  button {
    display: flex;
    position: absolute;
    right: 0;
    bottom: 0;
    height: 44px;
    padding: 0 16px;
    border: none;
    align-items: center;
    background-color: transparent;
    color: var(--title);
    transition: color 250ms ease;

    &:hover {
      cursor: pointer;
      color: var(--primary);
    }
  }
`;

export const LogInBtnStyled = styled.button`
  display: flex;
  margin-top: 20px;
  width: 100%;
  height: 48px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 2px solid var(--primary);
  border-radius: 2px;
  background-color: var(--primary);
  transition: background-color 250ms ease, color 250ms ease;

  font-weight: 700;
  color: var(--textSecondary);

  &:hover,
  &:focus {
    cursor: pointer;
    background-color: #fff;
    color: var(--primary);
  }
`;

export const AuthSeparator = styled.div`
  position: relative;
  margin: 24px 0 12px;

  line-height: 1;

  p {
    display: inline-block;
    position: relative;
    z-index: 2;
    left: 50%;
    transform: translateX(-50%);
    padding: 0 8px;
    background-color: #fff;

    line-height: 1.43;
    color: var(--text);
  }

  &::before {
    content: "";
    position: absolute;
    z-index: 1;
    left: 0;
    top: 10px;
    width: 100%;
    height: 1px;
    background-color: var(--disabledSecondary);
  }
`;

export const AgreementStyled = styled.div`
  display: flex;
  margin: 16px 0 32px;
  gap: 8px;
  color: var(--text);

  div {
    position: relative;
    height: 20px;
    border-radius: 2px;
    background-color: var(--primary);

    input {
      position: relative;
      appearance: none;
      -webkit-appearance: none;
      z-index: 1;
      width: 20px;
      height: 20px;
      border: none;
    }

    svg {
      position: absolute;
      top: 3px;
      left: 3px;
    }
  }

  span {
    font-weight: 500;
    color: var(--price);

    &:hover {
      cursor: pointer;
    }
  }
`;
