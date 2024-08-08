import styled from "styled-components";
import { mediaQueries } from "../../../styles/mediaQueries";

export const CategoriesStyled = styled.div`
  h2 {
    margin-bottom: 40px;
  }

  swiper-container {
    position: relative;
  }

  swiper-slide {
    width: 205px;
    padding: 24px 12px;
    border: 1px solid var(--disabledSecondary);
    border-radius: 4px;

    a {
      &:hover,
      &:focus {
        h3 {
          color: var(--primary);
        }
      }
      img {
        margin: 0 auto 16px auto;

        ${mediaQueries("mobile")`margin-bottom: 8px;
`}
      }

      h3 {
        text-align: center;
        font-weight: 500;
        color: var(--title);
      }
    }
  }
`;
