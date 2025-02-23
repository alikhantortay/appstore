import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { usePrice } from "../../hooks/usePrice";
import { Helmet } from "react-helmet-async";
import { Notify } from "notiflix/build/notiflix-notify-aio";

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

const API_CART_URL = "https://appstore.up.railway.app/shop-service/api/user/cart/by-session/get";
const API_ORDER_URL = "https://appstore.up.railway.app/shop-service/api/order/create";
const IMAGE_API_URL = "https://appstore.up.railway.app/shop-service/api/public/images/";

const Checkout = () => {
  const navigate = useNavigate();
  const { countPrice } = usePrice();

  const [items, setItems] = useState([]);
  const [orderTotal, setOrderTotal] = useState(null);
  const [isOrdered, setIsOrdered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Получаем корзину из API
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(true);
        const token = sessionStorage.getItem("accessToken");
        if (!token) {
          Notify.failure("Ошибка: отсутствует токен авторизации!");
          return;
        }
        const response = await axios.get(API_CART_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data && Array.isArray(response.data)) {
          setItems(response.data);
        }
      } catch (error) {
        console.error("Ошибка загрузки корзины:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  // Вычисляем общую сумму заказа
  const totalPrice = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  // Функция получения URL изображения
  const getImageUrl = (fileName) => {
    return fileName ? `${IMAGE_API_URL}${encodeURIComponent(fileName)}` : "/placeholder.png";
  };

  // Функция оформления заказа
  const handlePlaceOrder = async () => {
    try {
      const token = sessionStorage.getItem("accessToken");
      if (!token) {
        Notify.failure("Ошибка: отсутствует токен авторизации!");
        return;
      }

      const orderData = {
        firstname: "John",
        lastname: "Doe",
        companyName: "Компания",
        paymentMethod: "Наличные",
        phoneNumber: "+7-777-777-7777",
        country: "Казахстан",
        city: "Алматы",
        point: "Пункт выдачи",
        totalPrice: totalPrice,
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity || 1,
        })),
      };

      console.log("Отправка заказа:", orderData);

      const response = await axios.post(API_ORDER_URL, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        Notify.success("Заказ успешно оформлен!");
        // Сохраняем итоговую сумму до очистки корзины
        setOrderTotal(totalPrice);
        setIsOrdered(true);
        setItems([]);
      }
    } catch (error) {
      console.error("Ошибка при оформлении заказа:", error);
      Notify.failure("Ошибка оформления заказа.");
    }
  };

  return (
      <SectionStyled>
        <Helmet>
          <title>Checkout</title>
        </Helmet>
        <Container>
          <CheckoutStyled>
            <h2>Order Summary</h2>
            <Link to="/shopping-cart">Edit Cart</Link>

            {items.length > 0 ? (
                <CheckoutListStyled>
                  {items.map(({ id, imageUrls, name, categoryName, quantity, price }) => (
                      <li key={id}>
                        <img
                            src={getImageUrl(imageUrls ? imageUrls[0] : "")}
                            alt={name}
                            width="64px"
                            height="64px"
                            loading="lazy"
                        />
                        <div>
                          <Link to={`/shop/${categoryName}/${name.toLowerCase().replaceAll(" ", "-")}?id=${id}`}>
                            {name}
                          </Link>
                          <CartModalPriceStyled>
                            {quantity} x <span>{countPrice(price)}</span>
                          </CartModalPriceStyled>
                        </div>
                      </li>
                  ))}
                </CheckoutListStyled>
            ) : (
                <EmptyMessageStyled>Thanks for your order!</EmptyMessageStyled>
            )}

            <CheckoutTotalsListStyled>
              <li>
                <p>Sub-total</p>
                <span>{countPrice(isOrdered ? orderTotal : totalPrice)}</span>
              </li>
            </CheckoutTotalsListStyled>

            <CartTotalStyled>
              <p>Total</p>
              <span>{countPrice(isOrdered ? orderTotal : totalPrice)}</span>
            </CartTotalStyled>

            {isOrdered ? (
                <CheckoutMsgStyled>
                  Your order was placed!<br />
                  Sub-total: {countPrice(orderTotal)}<br />
                  Total: {countPrice(orderTotal)}
                </CheckoutMsgStyled>
            ) : (
                <CheckoutBtnStyled type="button" onClick={handlePlaceOrder}>
                  PLACE ORDER
                  <ArrowIcon />
                </CheckoutBtnStyled>
            )}

            {error && <ErrorMessageStyled>{error.message}</ErrorMessageStyled>}
            {loading && <Loader />}
          </CheckoutStyled>
        </Container>
      </SectionStyled>
  );
};

export default Checkout;
