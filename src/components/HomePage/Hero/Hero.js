import { useEffect, useState } from "react";
import { usePrice } from "../../../hooks/usePrice";
import { fetch } from "../../../API";

import { Container } from "../../Container/Container";
import { Loader } from "../../Loader/Loader";
import { ReactComponent as ArrowRight } from "../../../icons/ArrowRight.svg";

import {
  ErrorMessageStyled,
  ShopLinkStyled,
} from "../../../styles/common";
import {
  CirclesStyled,
  HeroGridContainer,
  PhoneImgStyled,
  PhoneSaleStyled,
  PhoneTextStyled,
  PodsStyled,
  XBoxImgStyled,
  XBoxLinkStyled,
  XBoxStyled,
  XBoxTextStyled,
} from "./Hero.styled";

export const Hero = () => {
  const [phone, setPhone] = useState(null);
  const [pods, setPods] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { countPrice, countSalePrice } = usePrice();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const phone = await fetch("products/133");
        setPhone(phone.data);
        const pods = await fetch("products/100");
        setPods(pods.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  return (
    <div>
      <Container>
        <HeroGridContainer>
          <XBoxStyled>
            <XBoxTextStyled>
              <span>THE BEST PLACE TO PLAY</span>
              <h2>Xbox Consoles</h2>
              <p>
                Save up to 50% on select Xbox games.
                <br />
                Get 3 months of PC Game Pass for $2
                <br />
                USD.
              </p>
              <XBoxLinkStyled to="/shop/laptops">
                SHOP NOW
                <ArrowRight />
              </XBoxLinkStyled>
              <CirclesStyled>
                <span />
                <span />
                <span />
              </CirclesStyled>
            </XBoxTextStyled>
            <XBoxImgStyled>
              <img
                src={require("../../../images/XBox.png")}
                alt="XBox console"
                width={368}
                height={408}
              />
              <span>{countPrice(299)}</span>
            </XBoxImgStyled>
          </XBoxStyled>
          {phone && (
            <PhoneSaleStyled>
              <PhoneTextStyled>
                <span>SUMMER SALES</span>
                <h2>{phone.title}</h2>
                <ShopLinkStyled
                  to={`/shop/${phone.category}/${phone.title
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}>
                  SHOP NOW
                  <ArrowRight />
                </ShopLinkStyled>
              </PhoneTextStyled>
              <PhoneImgStyled>
                <img
                  src={phone.images[2]}
                  alt={phone.title}
                  width={206}
                  height={366}
                />
                <span>29% OFF</span>
              </PhoneImgStyled>
            </PhoneSaleStyled>
          )}
          {pods && (
            <PodsStyled>
              <img
                src={pods.images[1]}
                alt={pods.title}
                width={160}
                height={160}
              />
              <div>
                <h2>{pods.title}</h2>
                <span>
                  {countSalePrice(
                    pods.price,
                    pods.discountPercentage,
                  )}
                </span>
                <ShopLinkStyled
                  to={`/shop/${pods.category}/${pods.title
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}>
                  SHOP NOW
                  <ArrowRight />
                </ShopLinkStyled>
              </div>
            </PodsStyled>
          )}
        </HeroGridContainer>
        {error && (
          <ErrorMessageStyled>{error}</ErrorMessageStyled>
        )}
        {loading && <Loader />}
      </Container>
    </div>
  );
};
