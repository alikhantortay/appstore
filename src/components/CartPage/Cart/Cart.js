import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { usePrice } from "../../../hooks/usePrice";
import { useDispatch } from "react-redux";
import {
  changeQuantity,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../../redux/shop/cartSlice";

import { ReactComponent as CrossCircleIcon } from "../../../icons/XCircle.svg";
import { ReactComponent as ArrowIcon } from "../../../icons/ArrowRight.svg";

import {
  ListPriceStyled,
  ListRemoveBtnStyled,
  ListWrapper,
} from "../../../styles/common";
import {
  CartBtnstyled,
  CartHeadingsStyled,
  CartProductStyled,
  CartStyled,
  QuantityStyled,
} from "./Cart.styled";

export const Cart = ({ items, setItems }) => {
  const dispatch = useDispatch();
  const { countPrice, countSalePrice } = usePrice();

  const minusQuantity = (id) => {
    dispatch(decreaseQuantity(id));

    items.map((item) => {
      item.id === id &&
        item.quantity !== 1 &&
        item.quantity--;
      return item;
    });
  };

  const plusQuantity = (id) => {
    dispatch(increaseQuantity(id));

    items.map((item) => {
      if (item.id === id) {
        item.quantity === item.stock
          ? Notify.failure(
              "We don't have more items in stock!",
            )
          : item.quantity++;
      }
      return item;
    });
  };

  const setQuantity = (e, id) => {
    if (Number(e.target.value) > 0) {
      dispatch(
        changeQuantity({
          id,
          quantity: Number(e.target.value),
        }),
      );

      items.map((item) => {
        if (item.id === id) {
          if (Number(e.target.value) > item.stock) {
            Notify.failure(
              `We have only ${item.stock} items in stock!`,
            );
            item.quantity = item.stock;
          } else {
            item.quantity = Number(e.target.value);
          }
        }
        return item;
      });
    }
  };

  return (
    <ListWrapper>
      <h2>Shopping Cart</h2>

      {items.length > 0 ? (
        <>
          <CartHeadingsStyled>
            <li>
              <p>PRODUCTS</p>
            </li>
            <li>
              <p>PRICE</p>
            </li>
            <li>
              <p>QUANTITY</p>
            </li>
            <li>
              <p>SUB-TOTAL</p>
            </li>
          </CartHeadingsStyled>

          <CartStyled>
            {items.map(
              ({
                id,
                title,
                category,
                thumbnail,
                price,
                quantity,
                discountPercentage,
              }) => {
                return (
                  <li key={id}>
                    <CartProductStyled>
                      <ListRemoveBtnStyled
                        type="button"
                        onClick={() => {
                          dispatch(removeFromCart(id));
                          setItems((prevState) =>
                            prevState.filter(
                              (item) => item.id !== id,
                            ),
                          );
                        }}>
                        <CrossCircleIcon />
                      </ListRemoveBtnStyled>
                      <Link
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
                      </Link>
                    </CartProductStyled>

                    <ListPriceStyled $gray>
                      {discountPercentage > 10 && (
                        <span>{countPrice(price)}</span>
                      )}
                      {countSalePrice(
                        price,
                        discountPercentage,
                      )}
                    </ListPriceStyled>

                    <div>
                      <QuantityStyled>
                        <button
                          type="button"
                          onClick={() => minusQuantity(id)}
                          disabled={quantity < 2}>
                          -
                        </button>

                        <input
                          type="number"
                          onFocus={(e) =>
                            (e.target.value = "")
                          }
                          onChange={(e) =>
                            setQuantity(e, id)
                          }
                          value={quantity}
                          placeholder={quantity}
                        />
                        <button
                          type="button"
                          onClick={() => plusQuantity(id)}>
                          +
                        </button>
                      </QuantityStyled>
                    </div>

                    <ListPriceStyled>
                      {countSalePrice(
                        price,
                        discountPercentage,
                        quantity,
                      )}
                    </ListPriceStyled>
                  </li>
                );
              },
            )}
          </CartStyled>
        </>
      ) : (
        <p>Your cart is empty!</p>
      )}

      <CartBtnstyled>
        <Link to="/shop">
          <ArrowIcon />
          RETURN TO SHOP
        </Link>
        <button
          type="button"
          onClick={() =>
            setItems((prevState) => prevState)
          }>
          UPDATE CART
        </button>
      </CartBtnstyled>
    </ListWrapper>
  );
};

Cart.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      discountPercentage: PropTypes.number.isRequired,
      stock: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};
