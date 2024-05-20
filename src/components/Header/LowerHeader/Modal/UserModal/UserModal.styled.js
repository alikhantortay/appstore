import styled from "styled-components";
import { mediaQueries } from "../../../../../styles/mediaQueries";

export const UserModalStyled = styled.div`
  position: absolute;
  top: 44px;
  right: 0;
  z-index: 1;
  width: 424px;
  padding: 32px;
  border: 1px solid rgb(228, 231, 233);
  border-radius: 4px;
  box-shadow: 0px 8px 40px 0px rgba(0, 0, 0, 0.12);
  background-color: #fff;

  ${mediaQueries("mobile")`width: 280px;
  padding: 24px 16px;`}
`;

export const UserModalTitleStyled = styled.h2`
  margin-bottom: 20px;

  font-size: 20px;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: 0%;
  text-align: center;
  color: var(--title);
`;
