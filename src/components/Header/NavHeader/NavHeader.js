import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useWindowWidth } from "../../../hooks/useWindowWidth";
import { Categories } from "./Categories/Categories";

import { Container } from "../../Container/Container";
import { ReactComponent as PhoneIcon } from "../../../icons/PhoneCall.svg";
import { ReactComponent as CaretIcon } from "../../../icons/CaretDown.svg";
import { ReactComponent as SupportIcon } from "../../../icons/Headphones.svg";

import {
  CategoryBtnStyled,
  HeaderTelStyled,
  NavHeaderStyled,
  NavStyled,
} from "./NavHeader.styled";

export const NavHeader = () => {
  const width = useWindowWidth();
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('[name="categories"]')) {
        setIsCategoriesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 📌 Функция обработки клика
  const handleCategoryClick = () => {
    console.log("🟠 Кнопка 'Все категории' нажата");
    setIsCategoriesOpen((prevState) => !prevState);
  };

  return (
      <NavHeaderStyled>
        <Container>
          <NavStyled>
            {/* 🔥 Добавлен console.log() */}
            <CategoryBtnStyled
                name="categories"
                type="button"
                onClick={handleCategoryClick}
                $isOpen={isCategoriesOpen}
            >
              Все категории
              <CaretIcon />
            </CategoryBtnStyled>

            {isCategoriesOpen && <Categories onClick={() => setIsCategoriesOpen(false)} />}

            <NavLink to="/support">
              <SupportIcon />
              {width > 424 && "Служба поддержки"}
            </NavLink>
          </NavStyled>

          <HeaderTelStyled href="tel:+12025550104">
            <PhoneIcon />
            +7-777-777-7777
          </HeaderTelStyled>
        </Container>
      </NavHeaderStyled>
  );
};
