import styled from "styled-components";
import { mediaQueries } from "../../styles/mediaQueries";

export const ContainerStyled = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  max-width: 1320px;

  ${mediaQueries("tablet")`max-width: 1319px;`}

  ${mediaQueries("mobile")`max-width: 767px;`}
`;
