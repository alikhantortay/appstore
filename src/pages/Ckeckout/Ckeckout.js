import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePrice } from "../../hooks/usePrice";
import { useSelector } from "react-redux";
import { selectCart } from "../../redux/shop/selectors";
import { selectUser } from "../../redux/auth/selectors";
import { fetch } from "../../API";

import { Container } from "../../components/Container/Container";
import { Loader } from "../../components/Loader/Loader";
import { ReactComponent as ArrowIcon } from "../../icons/ArrowRight.svg";

import {
  ErrorMessageStyled,
  SectionStyled,
} from "../../styles/common";
import {
  CartModalPriceStyled,
  EmptyMessageStyled,
} from "../../components/Header/LowerHeader/Modal/Modal.styled";
import { CartTotalStyled } from "../../components/CartPage/CartTotals/CartTotals.styled";
import {
  CheckoutBtnStyled,
  CheckoutListStyled,
  CheckoutStyled,
  CheckoutTotalsListStyled,
  CheckoutMsgStyled,
} from "./Checkout.styled";

const Ckeckout = () => {
  const navigate = useNavigate();
  const cartItems = useSelector(selectCart);
  const { isLoggedIn } = useSelector(selectUser);
  const {
    countPrice,
    countSalePrice,
    countTotalPrice,
    countTotalDiscount,
  } = usePrice();

  const [items, setItems] = useState([]);
  const [isOrdered, setIsOrdered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const totalPrice = countTotalPrice(items);

  useEffect(() => {
    cartItems.forEach((item) => {
      const getCartItem = async () => {
        try {
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
  }, [cartItems]);

  return (
    <SectionStyled>
      <Container>
        <CheckoutStyled>
          <h2>Order Summary</h2>

          {items.length > 0 ? (
            <CheckoutListStyled>
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
                        width="64px"
                        height="64px"
                        loading="lazy"
                      />
                      <div>
                        <Link
                          to={`/shop/${category}/${title
                            .toLowerCase()
                            .replaceAll(" ", "-")}`}
                          state={id}>
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
                    </li>
                  );
                },
              )}
            </CheckoutListStyled>
          ) : (
            <EmptyMessageStyled>
              Your cart is empty!
            </EmptyMessageStyled>
          )}
          <CheckoutTotalsListStyled>
            <li>
              <p>Sub-total</p>
              <span>{totalPrice}</span>
            </li>
            <li>
              <p>Shipping</p>
              <span>
                {totalPrice.length > 3
                  ? "Free"
                  : countPrice(5)}
              </span>
            </li>
            <li>
              <p>Discount</p>
              <span>{countTotalDiscount(items)}</span>
            </li>
            <li>
              <p>Tax</p>
              <span>
                {countPrice(totalPrice.slice(1) / 5)}
              </span>
            </li>
          </CheckoutTotalsListStyled>
          <CartTotalStyled>
            <p>Total</p>
            <span>
              {countPrice(
                Number(totalPrice.slice(1)) +
                  totalPrice.slice(1) / 5,
              )}
            </span>
          </CartTotalStyled>

          {isOrdered ? (
            <CheckoutMsgStyled>
              Your order was placed!
            </CheckoutMsgStyled>
          ) : (
            <>
              {!isLoggedIn && (
                <CheckoutMsgStyled>
                  Sign in to proceed.
                </CheckoutMsgStyled>
              )}
              <CheckoutBtnStyled
                type="button"
                onClick={() => {
                  isLoggedIn
                    ? setIsOrdered(true)
                    : navigate("/user-account/sign-in", {
                        state: "/shopping-cart/checkout",
                      });
                }}>
                {isLoggedIn ? "PLACE ORDER" : "SIGN IN"}
                <ArrowIcon />
              </CheckoutBtnStyled>
            </>
          )}

          {error && (
            <ErrorMessageStyled>{error}</ErrorMessageStyled>
          )}
          {loading && <Loader />}
        </CheckoutStyled>
      </Container>
    </SectionStyled>
  );
};

export default Ckeckout;
