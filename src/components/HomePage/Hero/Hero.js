import { useEffect, useState } from "react";
import { usePrice } from "../../../hooks/usePrice";
import { fetch } from "../../../API";

import { Container } from "../../Container/Container";
import { Loader } from "../../Loader/Loader";
import { ShopLink } from "../../ShopLink/ShopLink";

import { ErrorMessageStyled } from "../../../styles/common";
import {
  CirclesStyled,
  HeroGridContainer,
  PhoneImgStyled,
  PhoneSaleStyled,
  PhoneTextStyled,
  PodsStyled,
  XBoxImgStyled,
  XBoxStyled,
  XBoxTextStyled,
} from "./Hero.styled";

export const Hero = () => {
  const { countPrice, countSalePrice } = usePrice();

  const [phone, setPhone] = useState(null);
  const [pods, setPods] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const phone = await fetch("/133");
        setPhone(phone.data);
        const pods = await fetch("/100");
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
                Save up to 50% on select Xbox games. Get 3
                months of PC Game Pass for $2 USD.
              </p>
              <ShopLink to="/shop/laptops" big />
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
                loading="lazy"
              />
              <span>{countPrice(299)}</span>
            </XBoxImgStyled>
          </XBoxStyled>

          {phone && (
            <PhoneSaleStyled>
              <PhoneTextStyled>
                <span>SUMMER SALES</span>
                <h2>{phone.title}</h2>
                <ShopLink
                  to={`/shop/${phone.category}/${phone.title}?id=${phone.id}`}
                />
              </PhoneTextStyled>
              <PhoneImgStyled>
                <img
                  src={phone.images[2]}
                  alt={phone.title}
                  width={206}
                  height={366}
                  loading="lazy"
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
                loading="lazy"
              />
              <div>
                <h2>{pods.title}</h2>
                <span>
                  {countSalePrice(
                    pods.price,
                    pods.discountPercentage,
                  )}
                </span>
                <ShopLink
                  to={`/shop/${pods.category}/${pods.title}?id=${pods.id}`}
                />
              </div>
            </PodsStyled>
          )}
        </HeroGridContainer>
        {error && (
          <ErrorMessageStyled>
            {error.message}
          </ErrorMessageStyled>
        )}
        {loading && <Loader />}
      </Container>
    </div>
  );
};
