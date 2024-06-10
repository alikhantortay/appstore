import PropTypes from "prop-types";

import { ReactComponent as StarIcon } from "../../icons/Star.svg";
import { ReactComponent as StarEmptyIcon } from "../../icons/StarEmpty.svg";

import { StarsStyled } from "./Stars.styled";

export const Stars = ({ rating, bestDeals }) => {
  let stars = [];

  for (let i = 0; i < Math.round(rating); i++) {
    stars.push(<StarIcon key={i} />);
  }

  for (let i = 0; i < 5 - Math.round(rating); i++) {
    stars.push(<StarEmptyIcon key={i + "empty"} />);
  }

  return (
    <StarsStyled $bestDeals={bestDeals}>
      {stars.map((star) => star)}
    </StarsStyled>
  );
};

Stars.propTypes = {
  rating: PropTypes.number.isRequired,
  bestDeals: PropTypes.bool,
};
