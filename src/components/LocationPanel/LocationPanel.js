import { useLocation } from "react-router-dom";

import { ReactComponent as HomeIcon } from "../../icons/House.svg";
import { ReactComponent as CaretRightIcon } from "../../icons/CaretRight.svg";

import { Container } from "../Container/Container";
import {
  CategoryLinkStyled,
  LocationPanelStyled,
  LocationsStyled,
} from "./LocationPanel.styled";

export const LocationPanel = () => {
  const { pathname } = useLocation();

  let link = "";
  let links = [];

  pathname.split("/").map((string) => {
    if (string) {
      link += `/${string}`;
    }
    return links.push({ link, string });
  });

  return (
    <LocationPanelStyled>
      <Container>
        <LocationsStyled>
          {links.map(({ string, link }) => {
            return (
              <li key={link}>
                {link ? <CaretRightIcon /> : <HomeIcon />}
                <CategoryLinkStyled
                  to={link}
                  $current={link === pathname}>
                  {link ? string.replace("-", " ") : "home"}
                </CategoryLinkStyled>
              </li>
            );
          })}
        </LocationsStyled>
      </Container>
    </LocationPanelStyled>
  );
};
