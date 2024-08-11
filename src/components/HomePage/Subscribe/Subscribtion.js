import { useState } from "react";
import { Link } from "react-router-dom";
import { companies } from "./companies";

import { Container } from "../../Container/Container";
import { ReactComponent as ArrowRight } from "../../../icons/ArrowRight.svg";

import { TitleStyled } from "../../../styles/common";
import {
  CompaniesListStyled,
  SubscribeBtnStyled,
  SubscribedMessageStyled,
  SubscribtionStyled,
  SubscriptionFormStyled,
} from "./Subscribtion.styled";

export const Subscribtion = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  return (
    <SubscribtionStyled>
      <Container>
        <TitleStyled>
          Subscribe to our newsletter
        </TitleStyled>
        <p>
          Enter your email address and start getting the
          latest Clicon articles, news and exclusive offers
          in your inbox!
        </p>
        {isSubscribed ? (
          <SubscribedMessageStyled>
            SUBSCRIBED!
          </SubscribedMessageStyled>
        ) : (
          <SubscriptionFormStyled
            onSubmit={() => setIsSubscribed(true)}>
            <input
              name="email"
              type="email"
              autoComplete="on"
              placeholder="Email address"
              required
            />
            <SubscribeBtnStyled type="submit">
              SUBSCRIBE
              <ArrowRight />
            </SubscribeBtnStyled>
          </SubscriptionFormStyled>
        )}
        <CompaniesListStyled>
          {companies.map(({ href, svg, label }) => {
            return (
              <li key={label}>
                <Link to={href} aria-label={label}>
                  {svg}
                </Link>
              </li>
            );
          })}
        </CompaniesListStyled>
      </Container>
    </SubscribtionStyled>
  );
};
