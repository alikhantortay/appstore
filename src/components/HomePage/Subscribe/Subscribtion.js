import { useState } from "react";
import { Link } from "react-router-dom";

import { Container } from "../../Container/Container";
import { ReactComponent as ArrowRight } from "../../../icons/ArrowRight.svg";
import { ReactComponent as GoogleIcon } from "../../../icons/companies/Google.svg";
import { ReactComponent as AmazonIcon } from "../../../icons/companies/Amazon.svg";
import { ReactComponent as PhilipsIcon } from "../../../icons/companies/Philips.svg";
import { ReactComponent as ToshibaIcon } from "../../../icons/companies/Toshiba.svg";
import { ReactComponent as SamsungIcon } from "../../../icons/companies/Samsung.svg";

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
              type="email"
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
          <li>
            <Link to="shop?q=google">
              <GoogleIcon />
            </Link>
          </li>
          <li>
            <Link to="shop?q=amazon">
              <AmazonIcon />
            </Link>
          </li>
          <li>
            <Link to="shop?q=philips">
              <PhilipsIcon />
            </Link>
          </li>
          <li>
            <Link to="shop?q=toshiba">
              <ToshibaIcon />
            </Link>
          </li>
          <li>
            <Link to="shop?q=samsung">
              <SamsungIcon />
            </Link>
          </li>
        </CompaniesListStyled>
      </Container>
    </SubscribtionStyled>
  );
};
