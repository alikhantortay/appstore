import { useEffect, useState } from "react";
import { useShopList } from "../../../hooks/useShopList";
import { Link } from "react-router-dom";
import { fetch } from "../../../API";
import { usePrice } from "../../../hooks/usePrice";
import { itemIds } from "./itemIds";

import { Container } from "../../Container/Container";
import { Hot } from "./Hot/Hot";
import { Loader } from "../../Loader/Loader";
import { BestDealsTimer } from "./BestDealsTimer";
import { ReactComponent as ArrowRightIcon } from "../../../icons/ArrowRight.svg";
import { ReactComponent as HeartIcon } from "../../../icons/Heart.svg";
import { ReactComponent as CartIcon } from "../../../icons/Cart.svg";
import { ReactComponent as EyeIcon } from "../../../icons/Eye.svg";

import { ErrorMessageStyled } from "../../../styles/common";
import {
  BestDealsStyled,
  BestDealsGridContainer,
  DiscountWarningStyled,
  OldPriceStyled,
  PriceStyled,
  TitlesStyled,
  BestDealsItemStyled,
  ImgWrapper,
  HoverBtnsStyled,
  ListBtnStyled,
} from "./BestDeals.styled";

export const BestDeals = () => {
  const [hot, setHot] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { checkIsInList, modifyList } = useShopList();
  const { countPrice, countSalePrice } = usePrice();

  useEffect(() => {
    itemIds.forEach((id) => {
      const getItem = async () => {
        try {
          setLoading(true);
          const responce = await fetch(`products/${id}`);
          responce.data.id === 80
            ? setHot(responce.data)
            : setItems((prevState) => [
                ...prevState,
                responce.data,
              ]);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
      getItem();
    });
  }, []);

  return (
    <BestDealsStyled>
      <Container>
        <TitlesStyled>
          <h2>Best Deals</h2>
          <p>Deals ends in</p>
          <BestDealsTimer />
          <Link to="/shop">
            Browse All Products
            <ArrowRightIcon />
          </Link>
        </TitlesStyled>

        <BestDealsGridContainer>
          {hot && <Hot hot={hot} />}

          {items.length > 0 &&
            items.map(
              ({
                id,
                title,
                category,
                thumbnail,
                price,
                discountPercentage,
              }) => (
                <BestDealsItemStyled key={id}>
                  {discountPercentage > 10 && (
                    <DiscountWarningStyled>
                      {`${Math.round(
                        discountPercentage,
                      )}% OFF`}
                    </DiscountWarningStyled>
                  )}
                  <ImgWrapper tabIndex="0">
                    <img
                      src={thumbnail}
                      alt={title}
                      width={216}
                      height={216}
                    />
                    <HoverBtnsStyled>
                      <ListBtnStyled
                        type="button"
                        onClick={() =>
                          modifyList(id, "wishlist")
                        }
                        $inList={checkIsInList(
                          id,
                          "wishlist",
                        )}>
                        <HeartIcon />
                      </ListBtnStyled>
                      <ListBtnStyled
                        type="button"
                        onClick={() =>
                          modifyList(id, "cart")
                        }
                        $inList={checkIsInList(id, "cart")}>
                        <CartIcon />
                      </ListBtnStyled>
                      <ListBtnStyled
                        type="button"
                        onClick={() =>
                          modifyList(id, "compare")
                        }
                        $inList={checkIsInList(
                          id,
                          "compare",
                        )}>
                        <EyeIcon />
                      </ListBtnStyled>
                    </HoverBtnsStyled>
                  </ImgWrapper>
                  <Link
                    to={`shop/${category}/${title
                      .toLowerCase()
                      .replaceAll(" ", "-")}`}
                    state={id}>
                    {title}
                  </Link>
                  {discountPercentage > 10 && (
                    <OldPriceStyled>
                      {countPrice(price)}
                    </OldPriceStyled>
                  )}
                  <PriceStyled>
                    {countSalePrice(
                      price,
                      discountPercentage,
                    )}
                  </PriceStyled>
                </BestDealsItemStyled>
              ),
            )}
        </BestDealsGridContainer>
        {error && (
          <ErrorMessageStyled>{error}</ErrorMessageStyled>
        )}
        {loading && <Loader />}
      </Container>
    </BestDealsStyled>
  );
};
