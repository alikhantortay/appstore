import { useNavigate } from "react-router-dom";

import { ReactComponent as ArrowRight } from "../../icons/ArrowRight.svg";
import { ReactComponent as HomeIcon } from "../../icons/House.svg";

import { Container } from "../../components/Container/Container";
import {
  GoBackLinkStyled,
  HomeLinkStyled,
  NotFoundStyled,
  NotFoundWrapper,
} from "./NotFound.styled";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <NotFoundWrapper>
      <Container>
        <NotFoundStyled>
          <h1>404, Page not founds</h1>
          <p>
            Something went wrong. It’s look that your
            requested could not be found. It’s look like the
            link is broken or the page is removed.
          </p>
          <GoBackLinkStyled
            to="#"
            onClick={() => navigate(-1)}>
            <ArrowRight />
            GO BACK
          </GoBackLinkStyled>
          <HomeLinkStyled to="/">
            <HomeIcon />
            GO TO HOME
          </HomeLinkStyled>
        </NotFoundStyled>
      </Container>
    </NotFoundWrapper>
  );
};

export default NotFound;
