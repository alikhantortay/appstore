import { useEffect, useState } from "react";
import { usePrice } from "../../../hooks/usePrice";
import { useShopList } from "../../../hooks/useShopList";
import { fetch } from "../../../API";

import { Loader } from "../../Loader/Loader";
import { ReactComponent as CartIcon } from "../../../icons/CartSecond.svg";
import { ReactComponent as ArrowIcon } from "../../../icons/ArrowRight.svg";
import { ReactComponent as AppleIcon } from "../../../icons/Apple.svg";

import {
  CartBtnStyled,
  ErrorMessageStyled,
} from "../../../styles/common";
import {
  ShopArticleLinkStyled,
  ShopArticlePriceStyled,
  ShopArticleStyled,
} from "./ShopArticle.styled";

export const ShopArticle = () => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { countSalePrice } = usePrice();
  const { checkIsInList, modifyList } = useShopList();

  useEffect(() => {
    const getItem = async () => {
      try {
        setLoading(true);
        const responce = await fetch(`/106`);
        setItem(responce.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getItem();
  }, []);

  return (
    <>
      {item && (
        <ShopArticleStyled>
          <img
            src={item.thumbnail}
            alt={item.title}
            width={180}
            height={180}
            loading="lazy"
          />
          <h3>
            <AppleIcon />
            WATCH<span>SERIES 7</span>
          </h3>
          <p>Heavy on Features. Light on Price.</p>
          <ShopArticlePriceStyled>
            Only for:
            <span>
              {countSalePrice(
                item.price,
                item.discountPercentage,
              )}
            </span>
          </ShopArticlePriceStyled>
          <CartBtnStyled
            type="button"
            onClick={() => modifyList(item.id, "cart")}
            $inList={checkIsInList(item.id, "cart")}>
            ADD TO CART
            <CartIcon />
          </CartBtnStyled>
          <ShopArticleLinkStyled
            to={`/shop/${item.category}/${item.title
              .toLowerCase()
              .replaceAll(" ", "-")}`}
            state={item.id}>
            VIEW DETAILS
            <ArrowIcon />
          </ShopArticleLinkStyled>
        </ShopArticleStyled>
      )}

      {error && (
        <ErrorMessageStyled>{error}</ErrorMessageStyled>
      )}
      {loading && <Loader />}
    </>
  );
};
