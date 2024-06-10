import { topics } from "./topics";

import { Container } from "../../Container/Container";

import { TitleStyled } from "../../../styles/common";
import {
  HelpTopicsStyled,
  TopicsListStyled,
} from "./HelpTopics.styled";

export const HelpTopics = () => {
  return (
    <HelpTopicsStyled>
      <Container>
        <TitleStyled>
          What can we assist you with today?
        </TitleStyled>
        <TopicsListStyled>
          {topics.map(({ icon, title }) => {
            return (
              <li key={title}>
                <button type="button">
                  {icon}
                  {title}
                </button>
              </li>
            );
          })}
        </TopicsListStyled>
      </Container>
    </HelpTopicsStyled>
  );
};
