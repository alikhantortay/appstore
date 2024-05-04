import styled from "styled-components";
import { mediaQueries } from "../../styles/mediaQueries";

export const ContainerStyled = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  max-width: 1320px;

  ${mediaQueries("tablet")`
  max-width: 1319px;
  padding: 0 30px;`}

  ${mediaQueries("mobile")`
  max-width: 767px;
  padding: 0 20px;`}
`;
