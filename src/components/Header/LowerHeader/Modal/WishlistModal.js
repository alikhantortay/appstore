import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectWishlist } from "../../../../redux/shop/selectors";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { fetch } from "../../../../API";

import { ReactComponent as CrossIcon } from "../../../../icons/header/X.svg";
import { ReactComponent as ArrowRightIcon } from "../../../../icons/ArrowRight.svg";

import { removeFromWishlist } from "../../../../redux/shop/wishlistSlice";
import { countPrice } from "../../../../countPrice";
import { Loader } from "../../../Loader/Loader";
import { Link } from "react-router-dom";
import {
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

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    wishlistItems.forEach((item) => {
      const getWishlistItems = async () => {
        try {
          setLoading(true);
          const responce = await fetch(`products/${item}`);
          setItems(
            (prevState) =>
              !prevState.some(
                (item) => item.id === item,
              ) && [...prevState, responce.data],
          );
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
      getWishlistItems();
    });
  }, [wishlistItems]);

  return (
    <ModalStyled name="wishlist" $wishlist>
      <ModalTitleStyled>
        Wishlist{" "}
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
      <ModalListStyled>
        {items.map(({ id, images, title, price }) => {
          return (
            <li key={id}>
              <img
                src={images[0]}
                alt={title}
                width="80px"
                height="80px"
                loading="lazy"
              />
              <ModalItemTextStyled>
                <Link
                  to={`/details/${id}`}
                  onClick={onClick}>
                  {title}
                </Link>
                <WishlistModalPriceStyled>
                  {countPrice(price)}
                </WishlistModalPriceStyled>
              </ModalItemTextStyled>
              <button
                type="button"
                onClick={() =>
                  dispatch(removeFromWishlist(id))
                }>
                <CrossIcon />
              </button>
            </li>
          );
        })}
      </ModalListStyled>
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
