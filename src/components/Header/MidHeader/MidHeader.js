import { useWindowWidth } from "../../../hooks/useWindowWidth";
import { useDispatch, useSelector } from "react-redux";
import { changeCurrency } from "../../../redux/shop/currencySlice";
import { selectCurrency } from "../../../redux/shop/selectors";
import { socials } from "./socials";

import { Container } from "../../Container/Container";
import { ReactComponent as Logo } from "../../../icons/header/logo.svg";
import { ReactComponent as USAIcon } from "../../../icons/USAFlag.svg";
import { ReactComponent as UKIcon } from "../../../icons/UKFlag.svg";

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
                {socials.map(({ href, svg }) => {
                  return (
                    <li key={href}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer">
                        {svg}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </FollowUsStyled>
          </>
        ) : (
          <HeadLogoLinkStyled to="/">
            <Logo />
            CLICON
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
