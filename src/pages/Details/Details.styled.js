import styled from "styled-components";
import { mediaQueries } from "../../styles/mediaQueries";

export const DetailsWrapper = styled.div`
  display: flex;
  padding: 32px 0 72px;
  gap: 56px;

  ${mediaQueries("mobile")`flex-direction: column;`}
`;
