import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Container } from "../../Container/Container";

import { LowerDetailsStyled } from "./LowerDetails.styled";

export const LowerDetails = ({ id, title, category }) => {
  // 🛠 Исправлено: Проверяем, есть ли `title` и `category`
  const safeTitle = title?.toLowerCase() || "product";
  const safeCategory = category?.toLowerCase() || "category";

  return (
      <LowerDetailsStyled>
        <Container>
          <h2>More details about {title || "this product"}</h2>
          <p>Category: {category || "Unknown"}</p>

          {/* Добавляем проверку, чтобы избежать ошибки */}
          <Link to={`/shop/${safeCategory}/${safeTitle}?id=${id}`}>
            View related products
          </Link>
        </Container>
      </LowerDetailsStyled>
  );
};

LowerDetails.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  category: PropTypes.string,
};

export default LowerDetails;
