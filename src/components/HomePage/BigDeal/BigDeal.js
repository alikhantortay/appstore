import { useEffect, useState } from "react";
import { usePrice } from "../../../hooks/usePrice";
import { fetch } from "../../../API";

import { Container } from "../../Container/Container";
import { Loader } from "../../Loader/Loader";
import { ShopLink } from "../../ShopLink/ShopLink";

import { ErrorMessageStyled } from "../../../styles/common";
import {
  BigDealImgWrapper,
  BigDealStyled,
  BigDealTextStyled,
} from "./BigDeal.styled";

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
              <ShopLink
                to={`shop/${item.category}/${item.title}?id=${item.id}`}
              />
            </BigDealTextStyled>

            <BigDealImgWrapper>
              <img
                src={item.images[0]}
                alt={item.title}
                width={424}
                height={424}
                loading="lazy"
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
          <ErrorMessageStyled>
            {error.message}
          </ErrorMessageStyled>
        )}
        {loading && <Loader />}
      </Container>
    </div>
  );
};
