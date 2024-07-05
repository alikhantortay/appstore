import { useEffect, useState } from "react";
import { useShopList } from "../../hooks/useShopList";
import { usePrice } from "../../hooks/usePrice";
import { useDispatch, useSelector } from "react-redux";
import { selectWishlist } from "../../redux/shop/selectors";
import { removeFromWishlist } from "../../redux/shop/wishlistSlice";
import { fetch } from "../../API";

import { Container } from "../../components/Container/Container";
import { Loader } from "../../components/Loader/Loader";
import { ReactComponent as CartIcon } from "../../icons/CartSecond.svg";
import { ReactComponent as CrossCircleIcon } from "../../icons/XCircle.svg";

import {
  SectionStyled,
  CartBtnStyled,
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
  const { checkIsInList, modifyList } = useShopList();
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
                          to={`shop/${category}/${title
                            .toLowerCase()
                            .replaceAll(" ", "-")}`}
                          state={id}>
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
                          <CartBtnStyled
                            type="button"
                            onClick={() =>
                              modifyList(id, "cart")
                            }
                            $inList={checkIsInList(
                              id,
                              "cart",
                            )}
                            disabled={!stock}>
                            ADD TO CART
                            <CartIcon />
                          </CartBtnStyled>
                          <ListRemoveBtnStyled
                            type="button"
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
          <ErrorMessageStyled>{error}</ErrorMessageStyled>
        )}
        {loading && <Loader />}
      </Container>
    </SectionStyled>
  );
};

export default Wishlist;
