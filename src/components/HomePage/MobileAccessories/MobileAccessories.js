import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePrice } from "../../../hooks/usePrice";
import { fetch } from "../../../API";

import { Container } from "../../Container/Container";
import { Loader } from "../../Loader/Loader";
import { ItemCard } from "../../ItemCard/ItemCard";
import { ShopLink } from "../../ShopLink/ShopLink";
import { ReactComponent as ArrowRightIcon } from "../../../icons/ArrowRight.svg";

import {
  ErrorMessageStyled,
  ItemListStyled,
} from "../../../styles/common";
import {
  AccessoriesPodsStyled,
  AccessoriesTitleStyled,
  MobileAccessoriesStyled,
  SalesShopLinkStyled,
  SummerSalesStyled,
} from "./MobileAccessories.styled";

export const MobileAccessories = () => {
  const [pods, setPods] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { countSalePrice } = usePrice();

  useEffect(() => {
    const getItems = async () => {
      try {
        setLoading(true);
        const responce = await fetch(
          "/category/mobile-accessories?limit=9&skip=5",
        );
        responce.data.products.forEach((item) => {
          item.id === 107
            ? setPods(item)
            : setItems((prevState) => [...prevState, item]);
        });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getItems();
  }, []);

  return (
    <MobileAccessoriesStyled>
      <Container>
        <AccessoriesTitleStyled>
          <h2>Mobile Accessories</h2>
          <Link to="/shop">
            Browse All Products
            <ArrowRightIcon />
          </Link>
        </AccessoriesTitleStyled>

        <ItemListStyled>
          {items.length > 0 &&
            items.map((item) => {
              return (
                <li key={item.id}>
                  <ItemCard item={item} />
                </li>
              );
            })}
        </ItemListStyled>

        {pods && (
          <AccessoriesPodsStyled>
            <img
              src={pods.thumbnail}
              alt={pods.title}
              width={108}
              height={108}
              loading="lazy"
            />
            <h3>{pods.title}</h3>
            <p>{pods.description.slice(0, 86)}</p>
            <p>
              Only for:
              <span>
                {countSalePrice(
                  pods.price,
                  pods.discountPercentage,
                )}
              </span>
            </p>
            <ShopLink
              to={`shop/${pods.category}/${pods.title}`}
              state={pods.id}
            />
          </AccessoriesPodsStyled>
        )}

        {error && (
          <ErrorMessageStyled>{error}</ErrorMessageStyled>
        )}
        {loading && <Loader />}

        <SummerSalesStyled>
          <span>SUMMER SALES</span>
          <h3>37% DISCOUNT</h3>
          <p>
            only for <span>Smartphones</span> product.
          </p>
          <SalesShopLinkStyled to="shop/smartphones">
            SHOP NOW
            <ArrowRightIcon />
          </SalesShopLinkStyled>
        </SummerSalesStyled>
      </Container>
    </MobileAccessoriesStyled>
  );
};
