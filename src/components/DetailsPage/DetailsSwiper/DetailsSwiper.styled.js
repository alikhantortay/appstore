import styled from "styled-components";
import { mediaQueries } from "../../../styles/mediaQueries";

export const DetailsSwiperStyled = styled.div`
  width: 580px;

  ${mediaQueries("tablet")`width: 360px;`}
  ${mediaQueries("mobile")`width: 100%;`}

  img {
    border: 1px solid var(--disabledSecondary);
    border-radius: 2px;
  }

  .thumbs {
    margin-top: 24px;

    .preview {
      img {
        transition: border-width 100ms ease,
          border-color 250ms ease;
      }

      &:hover {
        cursor: pointer;

        img {
          border: 2px solid var(--primary);
        }
      }
    }
  }
`;
