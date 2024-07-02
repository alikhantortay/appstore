import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePrice } from "../../hooks/usePrice";
import { useSelector } from "react-redux";
import { selectCart } from "../../redux/shop/selectors";
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
  OrderedMsgStyled,
} from "./Checkout.styled";

const Ckeckout = () => {
  const cartItems = useSelector(selectCart);
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
                            4
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
            <OrderedMsgStyled>
              Your order was placed!
            </OrderedMsgStyled>
          ) : (
            <CheckoutBtnStyled
              type="button"
              onClick={() => setIsOrdered(true)}>
              PLACE ORDER
              <ArrowIcon />
            </CheckoutBtnStyled>
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
