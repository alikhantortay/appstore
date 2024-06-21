import { useEffect, useState } from "react";
import { Container } from "../../Container/Container";
import {
  BigDealImgWrapper,
  BigDealStyled,
  BigDealTextStyled,
} from "./BigDeal.styled";
import {
  BigShopLinkStyled,
  ErrorMessageStyled,
} from "../../../styles/common";
import { Loader } from "../../Loader/Loader";
import { fetch } from "../../../API";
import { usePrice } from "../../../hooks/usePrice";
import { ReactComponent as ArrowRightIcon } from "../../../icons/ArrowRight.svg";

export const BigDeal = () => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { countPrice, countSalePrice } = usePrice();

  useEffect(() => {
    const getItems = async () => {
      try {
        setLoading(true);
        const responce = await fetch("/78");
        setItem(responce.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getItems();
  }, []);

  return (
    <div>
      <Container>
        {item && (
          <BigDealStyled>
            <BigDealTextStyled>
              <span>SAVE UP TO {countPrice(200)}</span>
              <h2>{item.title.slice(0, 13)}</h2>
              <p>{item.description.slice(0, 68)}</p>
              <BigShopLinkStyled
                to={`shop/${item.category}/${item.title
                  .toLowerCase()
                  .replaceAll(" ", "-")}`}
                state={item.id}>
                SHOP NOW
                <ArrowRightIcon />
              </BigShopLinkStyled>
            </BigDealTextStyled>

            <BigDealImgWrapper>
              <img
                src={item.images[0]}
                alt={item.title}
                width={424}
                height={424}
              />
              <span>
                {countSalePrice(
                  item.price,
                  item.discountPercentage,
                )}
              </span>
            </BigDealImgWrapper>
          </BigDealStyled>
        )}

        {error && (
          <ErrorMessageStyled>{error}</ErrorMessageStyled>
        )}
        {loading && <Loader />}
      </Container>
    </div>
  );
};
