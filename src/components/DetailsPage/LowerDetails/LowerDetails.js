import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useWindowWidth } from "../../../hooks/useWindowWidth";
import { infoLinks } from "./infoLinks";

import {
  InfoLinkStyled,
  LowerDetailsStyled,
} from "./LowerDetails.styled";

export const LowerDetails = ({ id, title, category }) => {
  const { pathname } = useLocation();
  const width = useWindowWidth();

  return (
    <LowerDetailsStyled>
      {width < 768 ? (
        <swiper-container
          slides-per-view="1.2"
          space-between="12">
          {infoLinks.map((link) => {
            return (
              <swiper-slide key={link}>
                <InfoLinkStyled
                  to={
                    link === "description"
                      ? `/shop/${category}/${title
                          .toLowerCase()
                          .replaceAll(" ", "-")}?id=${id}`
                      : `${link.replaceAll(
                          " ",
                          "-",
                        )}?id=${id}`
                  }
                  $active={
                    link === "description"
                      ? pathname ===
                        `/shop/${category}/${title
                          .toLowerCase()
                          .replaceAll(" ", "-")}`
                      : pathname ===
                        `/shop/${category}/${title
                          .toLowerCase()
                          .replaceAll(
                            " ",
                            "-",
                          )}/${link.replaceAll(" ", "-")}`
                  }>
                  {link}
                </InfoLinkStyled>
              </swiper-slide>
            );
          })}
        </swiper-container>
      ) : (
        <ul>
          {infoLinks.map((link) => {
            return (
              <li key={link}>
                <InfoLinkStyled
                  to={
                    link === "description"
                      ? `/shop/${category}/${title
                          .toLowerCase()
                          .replaceAll(" ", "-")}?id=${id}`
                      : `${link.replaceAll(
                          " ",
                          "-",
                        )}?id=${id}`
                  }
                  $active={
                    link === "description"
                      ? pathname ===
                        `/shop/${category}/${title
                          .toLowerCase()
                          .replaceAll(" ", "-")}`
                      : pathname ===
                        `/shop/${category}/${title
                          .toLowerCase()
                          .replaceAll(
                            " ",
                            "-",
                          )}/${link.replaceAll(" ", "-")}`
                  }>
                  {link}
                </InfoLinkStyled>
              </li>
            );
          })}
        </ul>
      )}

      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </LowerDetailsStyled>
  );
};

LowerDetails.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};
