import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { usePrice } from "../../../../hooks/usePrice";
import { selectCart } from "../../../../redux/shop/selectors";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { removeFromCart } from "../../../../redux/shop/cartSlice";
import { fetch } from "../../../../API";

import { Loader } from "../../../Loader/Loader";
import { ReactComponent as CrossIcon } from "../../../../icons/header/X.svg";
import { ReactComponent as ArrowRightIcon } from "../../../../icons/ArrowRight.svg";

import {
  CartModalPriceStyled,
  EmptyMessageStyled,
  ModalLinkStyled,
  ModalListStyled,
  ModalLowerStyled,
  ModalStyled,
  ModalTitleStyled,
} from "./Modal.styled";

export const CartModal = ({ onClick }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCart);
  const { countSalePrice, countTotalPrice } = usePrice();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  let numberOfItems = 0;
  cartItems.length > 0 &&
    cartItems.map(
      ({ quantity }) => (numberOfItems += quantity),
    );

  useEffect(() => {
    cartItems.forEach((item) => {
      const getCartItem = async () => {
        try {
          items.length === 0 && setLoading(true);
          const responce = await fetch(`${item.id}`);
          responce.data.quantity = item.quantity;
          setItems((prevState) =>
            prevState.some(({ id }) => id === item.id)
              ? prevState
              : [...prevState, responce.data],
          );
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
      getCartItem();
    });
  }, [cartItems, items.length]);

  return (
    <ModalStyled name="cart">
      <ModalTitleStyled>
        Shopping Cart{" "}
        {numberOfItems > 0 && (
          <span>
            (
            {numberOfItems > 9
              ? numberOfItems
              : "0" + numberOfItems}
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
              quantity,
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
                  <div>
                    <Link
                      to={`/shop/${category}/${title
                        .toLowerCase()
                        .replaceAll(" ", "-")}?id=${id}`}
                      onClick={onClick}>
                      {title}
                    </Link>
                    <CartModalPriceStyled>
                      {quantity} x{" "}
                      <span>
                        {countSalePrice(
                          price,
                          discountPercentage,
                        )}
                      </span>
                    </CartModalPriceStyled>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      dispatch(removeFromCart(id));
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
          Your cart is empty!
        </EmptyMessageStyled>
      )}

      <ModalLowerStyled>
        {items.length > 0 && (
          <>
            <p>Sub-Total:</p>
            <span>{countTotalPrice(items)}</span>
          </>
        )}
        <ModalLinkStyled
          to="/shopping-cart"
          onClick={onClick}>
          VIEW CART
          <ArrowRightIcon />
        </ModalLinkStyled>
      </ModalLowerStyled>
      {error && Notify.failure(error.message)}
      {loading && <Loader />}
    </ModalStyled>
  );
};
