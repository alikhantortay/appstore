import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { usePrice } from "../../../../hooks/usePrice";
import { selectWishlist } from "../../../../redux/shop/selectors";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { fetch } from "../../../../API";
import { removeFromWishlist } from "../../../../redux/shop/wishlistSlice";

import { Loader } from "../../../Loader/Loader";
import { ReactComponent as CrossIcon } from "../../../../icons/header/X.svg";
import { ReactComponent as ArrowRightIcon } from "../../../../icons/ArrowRight.svg";

import {
  EmptyMessageStyled,
  ModalItemTextStyled,
  ModalLinkStyled,
  ModalListStyled,
  ModalLowerStyled,
  ModalStyled,
  ModalTitleStyled,
  WishlistModalPriceStyled,
} from "./Modal.styled";

export const WishlistModal = ({ onClick }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlist);
  const { countSalePrice } = usePrice();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    wishlistItems.forEach((item) => {
      const getWishlistItems = async () => {
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
      getWishlistItems();
    });
  }, [wishlistItems, items.length]);

  return (
    <ModalStyled name="wishlist" $wishlist>
      <ModalTitleStyled>
        Wishlist
        {items.length > 0 && (
          <span>
            (
            {items.length > 9
              ? items.length
              : "0" + items.length}
            )
          </span>
        )}
      </ModalTitleStyled>

      {items.length > 0 ? (
        <ModalListStyled>
          {items.map(
            ({
              id,
              thumbnail,
              title,
              category,
              price,
              discountPercentage,
            }) => {
              return (
                <li key={id}>
                  <img
                    src={thumbnail}
                    alt={title}
                    width="80px"
                    height="80px"
                    loading="lazy"
                  />
                  <ModalItemTextStyled>
                    <Link
                      to={`/shop/${category}/${title
                        .toLowerCase()
                        .replaceAll(" ", "-")}`}
                      state={id}
                      onClick={onClick}>
                      {title}
                    </Link>
                    <WishlistModalPriceStyled>
                      {countSalePrice(
                        price,
                        discountPercentage,
                      )}
                    </WishlistModalPriceStyled>
                  </ModalItemTextStyled>
                  <button
                    type="button"
                    onClick={() => {
                      dispatch(removeFromWishlist(id));
                      setItems((prevState) =>
                        prevState.filter(
                          (item) => item.id !== id,
                        ),
                      );
                    }}>
                    <CrossIcon />
                  </button>
                </li>
              );
            },
          )}
        </ModalListStyled>
      ) : (
        <EmptyMessageStyled>
          Your wishlist is empty!
        </EmptyMessageStyled>
      )}

      <ModalLowerStyled>
        <ModalLinkStyled to="/wishlist" onClick={onClick}>
          VIEW WISHLIST
          <ArrowRightIcon />
        </ModalLinkStyled>
      </ModalLowerStyled>
      {error && Notify.failure(error.message)}
      {loading && <Loader />}
    </ModalStyled>
  );
};
