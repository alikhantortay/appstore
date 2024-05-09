import { useWindowWidth } from "../../../hooks/useWindowWidth";
import { useDispatch, useSelector } from "react-redux";
import { changeCurrency } from "../../../redux/shop/currencySlice";
import { selectCurrency } from "../../../redux/shop/selectors";

import { ReactComponent as Logo } from "../../../icons/header/logo.svg";

import { ReactComponent as TwitterIcon } from "../../../icons/socials/Twitter.svg";
import { ReactComponent as FacebookIcon } from "../../../icons/socials/Facebook.svg";
import { ReactComponent as PinterestIcon } from "../../../icons/socials/Pinterest.svg";
import { ReactComponent as RedditIcon } from "../../../icons/socials/Reddit.svg";
import { ReactComponent as YoutubeIcon } from "../../../icons/socials/Youtube.svg";
import { ReactComponent as InstagramIcon } from "../../../icons/socials/Instagram.svg";
import { ReactComponent as USAIcon } from "../../../icons/USAFlag.svg";
import { ReactComponent as UKIcon } from "../../../icons/UKFlag.svg";

import { Container } from "../../Container/Container";
import {
  FollowUsStyled,
  MidHeaderStyled,
  WelcomeTextStyled,
} from "./MidHeader.styled";
import { HeadSelectStyled } from "./HeadSelect.styled";
import { HeadLogoLinkStyled } from "../LowerHeader/LowerHeader.styled";

export const MidHeader = () => {
  const width = useWindowWidth();

  const dispatch = useDispatch();
  const currency = useSelector(selectCurrency);

  return (
    <MidHeaderStyled>
      <Container>
        {width > 767 ? (
          <>
            <WelcomeTextStyled>
              Welcome to Clicon online eCommerce store.
            </WelcomeTextStyled>

            <FollowUsStyled>
              <p>Follow us:</p>
              <ul>
                <li>
                  <a href="https://twitter.com/">
                    <TwitterIcon />
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/">
                    <FacebookIcon />
                  </a>
                </li>
                <li>
                  <a href="https://www.pinterest.com/">
                    <PinterestIcon />
                  </a>
                </li>
                <li>
                  <a href="https://www.reddit.com/">
                    <RedditIcon />
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/">
                    <YoutubeIcon />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/">
                    <InstagramIcon />
                  </a>
                </li>
              </ul>
            </FollowUsStyled>
          </>
        ) : (
          <HeadLogoLinkStyled>
            <Logo />
            <span>CLICON</span>
          </HeadLogoLinkStyled>
        )}

        <HeadSelectStyled
          defaultValue={{ value: "USA", label: "Eng (UK)" }}
          isSearchable={false}
          classNamePrefix="Select"
          options={[
            {
              value: "USA",
              label: (
                <>
                  <USAIcon />
                  <span>Eng (USA)</span>
                </>
              ),
            },
            {
              value: "UK",
              label: (
                <>
                  <UKIcon />
                  <span>Eng (UK)</span>
                </>
              ),
            },
          ]}
        />

        <HeadSelectStyled
          isSearchable={false}
          classNamePrefix="Select"
          options={[
            {
              value: "USD",
              label: "USD",
            },
            {
              value: "EUR",
              label: "EUR",
            },
          ]}
          value={{
            value: `${currency}`,
            label: `${currency}`,
          }}
          onChange={(e) =>
            dispatch(changeCurrency(e.value))
          }
        />
      </Container>
    </MidHeaderStyled>
  );
};
