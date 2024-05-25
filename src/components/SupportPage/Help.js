import { useState } from "react";

import { TitleStyled } from "../../styles/common";
import { Container } from "../Container/Container";
import {
  HelpSpanStyled,
  HelpStyled,
  QuestionFormStyled,
} from "./Help.styled";

export const Help = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <HelpStyled>
      <Container>
        <HelpSpanStyled>HELP CENTER</HelpSpanStyled>
        <TitleStyled $left>
          How we can help you!
        </TitleStyled>
        <QuestionFormStyled onSubmit={handleSubmit}>
          <input
            name="question"
            type="text"
            placeholder="Enter your question or keyword"
            required
          />
          <button type="submit">SEARCH</button>
          {isSubmitted && <p>Nothing found!</p>}
        </QuestionFormStyled>
      </Container>
    </HelpStyled>
  );
};
