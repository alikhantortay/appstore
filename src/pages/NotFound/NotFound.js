import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { Container } from "../../components/Container/Container";
import { ReactComponent as ArrowIcon } from "../../icons/ArrowRight.svg";
import { ReactComponent as HomeIcon } from "../../icons/House.svg";

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
      <Helmet>
        <title>404, Page not founds</title>
      </Helmet>

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
            <ArrowIcon />
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
