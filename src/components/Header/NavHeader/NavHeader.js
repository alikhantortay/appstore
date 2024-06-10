import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useWindowWidth } from "../../../hooks/useWindowWidth";
import { Categories } from "./Categories/Categories";

import { Container } from "../../Container/Container";
import { ReactComponent as PhoneIcon } from "../../../icons/PhoneCall.svg";
import { ReactComponent as CaretIcon } from "../../../icons/CaretDown.svg";
import { ReactComponent as CompareIcon } from "../../../icons//Compare.svg";
import { ReactComponent as SupportIcon } from "../../../icons/Headphones.svg";

import {
  CategoryBtnStyled,
  HeaderTelStyled,
  NavHeaderStyled,
  NavStyled,
} from "./NavHeader.styled";

export const NavHeader = () => {
  const width = useWindowWidth();
  const [isCategoriesOpen, setIsCategoriesOpen] =
    useState(false);

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      !e.target.closest('[name="categories"]') &&
        setIsCategoriesOpen(false);
    });

    return () => {
      document.removeEventListener("mousedown", (e) => {
        !e.target.closest('[name="categories"]') &&
          setIsCategoriesOpen(false);
      });
    };
  });

  return (
    <NavHeaderStyled>
      <Container>
        <NavStyled>
          <CategoryBtnStyled
            name="categories"
            type="button"
            onClick={() =>
              setIsCategoriesOpen((prevState) => !prevState)
            }
            $isOpen={isCategoriesOpen}>
            All Category
            <CaretIcon />
          </CategoryBtnStyled>
          {isCategoriesOpen && (
            <Categories
              onClick={() => setIsCategoriesOpen(false)}
            />
          )}
          <NavLink to="/compare">
            <CompareIcon />
            {width > 424 && "Compare"}
          </NavLink>
          <NavLink to="/support">
            <SupportIcon />
            {width > 424 && "Customer Support"}
          </NavLink>
        </NavStyled>
        <HeaderTelStyled href="tel:+12025550104">
          <PhoneIcon />
          +1-202-555-0104
        </HeaderTelStyled>
      </Container>
    </NavHeaderStyled>
  );
};
