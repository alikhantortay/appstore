import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCart } from "../../redux/shop/selectors";
import { fetch } from "../../API";

import { Container } from "../../components/Container/Container";
import { Loader } from "../../components/Loader/Loader";
import { Cart } from "../../components/CartPage/Cart/Cart";
import { CartTotals } from "../../components/CartPage/CartTotals/CartTotals";
import { CouponCode } from "../../components/CartPage/CouponCode/CouponCode";

import {
  ErrorMessageStyled,
  SectionStyled,
} from "../../styles/common";
import { CartGridContainer } from "./CartPage.styled";

const CartPage = () => {
  const cartItems = useSelector(selectCart);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    <SectionStyled>
      <Container>
        <CartGridContainer>
          <Cart items={items} setItems={setItems} />
          <CartTotals items={items} />
          <CouponCode />
        </CartGridContainer>

        {error && (
          <ErrorMessageStyled>{error}</ErrorMessageStyled>
        )}
        {loading && <Loader />}
      </Container>
    </SectionStyled>
  );
};

export default CartPage;
