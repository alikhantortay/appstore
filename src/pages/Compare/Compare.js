import { useState, useEffect } from "react";
import { usePrice } from "../../hooks/usePrice";
import { useShopList } from "../../hooks/useShopList";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import { useDispatch, useSelector } from "react-redux";
import { selectCompare } from "../../redux/shop/selectors";
import { removeFromCompare } from "../../redux/shop/compareListSlice";
import { fetch } from "../../API";
import { Helmet } from "react-helmet-async";

import { Container } from "../../components/Container/Container";
import { Loader } from "../../components/Loader/Loader";
import { Stars } from "../../components/Stars/Stars";
import { ReactComponent as CrossCircleIcon } from "../../icons/XCircle.svg";
import { ReactComponent as HeartIcon } from "../../icons/Heart.svg";
import { ReactComponent as CartIcon } from "../../icons/CartSecond.svg";

import {
  ErrorMessageStyled,
  SectionStyled,
} from "../../styles/common";
import {
  ListRemoveBtnStyled,
  ListStockStatusStyled,
} from "../../styles/listStyles";
import { CartBtnStyled } from "../../components/CartBtn/CartBtn.styled";
import {
  CompareBtnsStyled,
  CompareHeadingsStyled,
  CompareLinkStyled,
  CompareListStyled,
  ComparePriceStyled,
  CompareStarRatingStyled,
  CompareWishlistBtnStyled,
  CompareWrapper,
} from "./Compare.styled";

const Compare = () => {
  const dispatch = useDispatch();
  const compareItems = useSelector(selectCompare);
  const { checkIsInList, modifyList } = useShopList();
  const { countPrice, countSalePrice } = usePrice();
  const windowWidth = useWindowWidth();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    compareItems.forEach((item) => {
      const getItem = async () => {
        try {
          items.length === 0 && setLoading(true);
          const responce = await fetch(`${item}`);
          setItems((prevState) =>
            prevState.some(({ id }) => id === item)
              ? prevState
              : [...prevState, responce.data],
          );
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
      getItem();
    });
  }, [compareItems, items.length]);

  return (
    <SectionStyled>
      <Helmet>
        <title>Compare</title>
      </Helmet>

      <Container>
        <CompareWrapper>
          {items.length > 0 ? (
            <>
              <CompareHeadingsStyled>
                <li>
                  <p>Customer feedback:</p>
                </li>
                <li>
                  <p>Price:</p>
                </li>
                <li>
                  <p>Sold by:</p>
                </li>
                <li>
                  <p>Brand:</p>
                </li>
                <li>
                  <p>Stock status:</p>
                </li>
                <li>
                  <p>Size:</p>
                </li>
                <li>
                  <p>Weight:</p>
                </li>
              </CompareHeadingsStyled>
              <CompareListStyled>
                {items.map(
                  ({
                    id,
                    title,
                    thumbnail,
                    category,
                    brand,
                    rating,
                    reviews,
                    price,
                    discountPercentage,
                    stock,
                    dimensions: { width },
                    weight,
                  }) => {
                    return (
                      <li key={id}>
                        <ListRemoveBtnStyled
                          type="button"
                          aria-label="Remove item from compare list"
                          onClick={() => {
                            dispatch(removeFromCompare(id));
                            setItems((prevState) =>
                              prevState.filter(
                                (item) => item.id !== id,
                              ),
                            );
                          }}>
                          <CrossCircleIcon />
                        </ListRemoveBtnStyled>

                        <CompareLinkStyled
                          to={`/shop/${category}/${title
                            .toLowerCase()
                            .replaceAll(
                              " ",
                              "-",
                            )}?id=${id}`}>
                          <img
                            src={thumbnail}
                            alt={title}
                            width={272}
                            height={272}
                            loading="lazy"
                          />
                          <p>
                            {windowWidth > 567
                              ? title
                              : title.slice(0, 20) + "..."}
                          </p>
                        </CompareLinkStyled>

                        <CompareBtnsStyled>
                          <CartBtnStyled
                            type="button"
                            aria-label="Add to Cart"
                            onClick={() =>
                              modifyList(id, "cart")
                            }
                            $inList={checkIsInList(
                              id,
                              "cart",
                            )}
                            disabled={!stock}>
                            {windowWidth > 1119 &&
                              "ADD TO CART"}
                            <CartIcon />
                          </CartBtnStyled>
                          <CompareWishlistBtnStyled
                            type="button"
                            aria-label="Add to Wishlist"
                            onClick={() =>
                              modifyList(id, "wishlist")
                            }
                            $inList={checkIsInList(
                              id,
                              "wishlist",
                            )}
                            disabled={!stock}>
                            <HeartIcon />
                          </CompareWishlistBtnStyled>
                        </CompareBtnsStyled>

                        <CompareStarRatingStyled>
                          <Stars rating={rating} />
                          {reviews.length && (
                            <p>{`(${reviews.length})`}</p>
                          )}
                        </CompareStarRatingStyled>

                        <ComparePriceStyled>
                          {windowWidth > 567 &&
                            discountPercentage > 10 && (
                              <span>
                                {countPrice(price)}
                              </span>
                            )}
                          {countSalePrice(
                            price,
                            discountPercentage,
                          )}
                        </ComparePriceStyled>

                        <p>{brand || "Clicon"}</p>
                        <p>{brand || "Clicon"}</p>

                        <ListStockStatusStyled
                          $inStock={stock}>
                          {stock
                            ? "IN STOCK"
                            : "OUT OF STOCK"}
                        </ListStockStatusStyled>

                        <p>{`${width} inches, ${(
                          width * 2.54
                        ).toFixed(2)} cm`}</p>
                        <p>{`${Math.round(
                          weight * 453.6,
                        )} g (${(weight * 16).toFixed(
                          2,
                        )} oz)`}</p>
                      </li>
                    );
                  },
                )}
              </CompareListStyled>
            </>
          ) : (
            <p>Your compare list is empty!</p>
          )}
        </CompareWrapper>

        {error && (
          <ErrorMessageStyled>
            {error.message}
          </ErrorMessageStyled>
        )}
        {loading && <Loader />}
      </Container>
    </SectionStyled>
  );
};

export default Compare;
