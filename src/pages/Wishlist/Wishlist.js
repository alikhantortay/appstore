import { useEffect, useState } from "react";
import { usePrice } from "../../hooks/usePrice";
import { useDispatch, useSelector } from "react-redux";
import { selectWishlist } from "../../redux/shop/selectors";
import { removeFromWishlist } from "../../redux/shop/wishlistSlice";
import { fetch } from "../../API";
import { Helmet } from "react-helmet-async";

import { Container } from "../../components/Container/Container";
import { Loader } from "../../components/Loader/Loader";
import { CartBtn } from "../../components/CartBtn/CartBtn";
import { ReactComponent as CrossCircleIcon } from "../../icons/XCircle.svg";

import {
  SectionStyled,
  ErrorMessageStyled,
} from "../../styles/common";
import {
  ListWrapper,
  ListPriceStyled,
  ListStockStatusStyled,
  ListRemoveBtnStyled,
} from "../../styles/listStyles";
import {
  WishlistHeadingsStyled,
  WishlistLinkStyled,
  WishlistStyled,
  WishlistBtnsStyled,
} from "./Wishlist.styled";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlist);
  const { countPrice, countSalePrice } = usePrice();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    wishlistItems.forEach((item) => {
      const getWishlistItem = async () => {
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
      getWishlistItem();
    });
  }, [wishlistItems, items.length]);

  return (
    <SectionStyled>
      <Helmet>
        <title>Wishlist</title>
      </Helmet>

      <Container>
        <ListWrapper>
          <h2>Wishlist</h2>

          {items.length > 0 ? (
            <>
              <WishlistHeadingsStyled>
                <li>
                  <p>PRODUCTS</p>
                </li>
                <li>
                  <p>PRICE</p>
                </li>
                <li>
                  <p>STOCK STATUS</p>
                </li>
                <li>
                  <p>ACTIONS</p>
                </li>
              </WishlistHeadingsStyled>

              <WishlistStyled>
                {items.map(
                  ({
                    id,
                    title,
                    category,
                    thumbnail,
                    price,
                    discountPercentage,
                    stock,
                  }) => {
                    return (
                      <li key={id}>
                        <WishlistLinkStyled
                          to={`/shop/${category}/${title
                            .toLowerCase()
                            .replaceAll(
                              " ",
                              "-",
                            )}?id=${id}`}>
                          <img
                            src={thumbnail}
                            alt={title}
                            width={72}
                            height={72}
                            loading="lazy"
                          />
                          {title}
                        </WishlistLinkStyled>

                        <ListPriceStyled>
                          {discountPercentage > 10 && (
                            <span>{countPrice(price)}</span>
                          )}
                          {countSalePrice(
                            price,
                            discountPercentage,
                          )}
                        </ListPriceStyled>

                        <ListStockStatusStyled
                          $inStock={stock}>
                          {stock
                            ? "IN STOCK"
                            : "OUT OF STOCK"}
                        </ListStockStatusStyled>

                        <WishlistBtnsStyled>
                          {" "}
                          <CartBtn
                            id={id}
                            disabled={!stock}
                          />
                          <ListRemoveBtnStyled
                            type="button"
                            aria-label="Remove from Wishlist"
                            onClick={() => {
                              dispatch(
                                removeFromWishlist(id),
                              );
                              setItems((prevState) =>
                                prevState.filter(
                                  (item) => item.id !== id,
                                ),
                              );
                            }}>
                            <CrossCircleIcon />
                          </ListRemoveBtnStyled>
                        </WishlistBtnsStyled>
                      </li>
                    );
                  },
                )}
              </WishlistStyled>
            </>
          ) : (
            <p>Your wishlist is empty!</p>
          )}
        </ListWrapper>

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

export default Wishlist;
