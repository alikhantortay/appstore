import { useEffect, useState } from "react";
import axios from "axios";
import { usePrice } from "../../../hooks/usePrice";
import { Notify } from "notiflix/build/notiflix-notify-aio";

import { ReactComponent as ArrowIcon } from "../../../icons/ArrowRight.svg";

import {
    CartTotalStyled,
    CartTotalsListStyled,
    CartTotalsStyled,
    OrderLinkStyled,
} from "./CartTotals.styled";

const API_URL = "https://appstore.up.railway.app/shop-service/api/user/cart/by-session/get";

export const CartTotals = () => {
    const { countPrice } = usePrice();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // ✅ Загружаем корзину из API
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                setLoading(true);
                const token = sessionStorage.getItem("accessToken");

                if (!token) {
                    Notify.failure("Ошибка: отсутствует токен авторизации!");
                    return;
                }

                const response = await axios.get(API_URL, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.data && Array.isArray(response.data)) {
                    setCartItems(response.data);
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

    // ✅ Считаем `Sub-total` (цена * количество)
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

    // ✅ Итоговая сумма (на данный момент просто `Sub-total`, можно добавить налоги/доставку)
    const grandTotal = totalPrice;

    return (
        <CartTotalsStyled>
            <h2>Cart Totals</h2>
            {loading ? (
                <p>Загрузка...</p>
            ) : error ? (
                <p>Ошибка загрузки корзины</p>
            ) : (
                <>
                    <CartTotalsListStyled>
                        <li>
                            <p>Sub-total</p>
                            <span>{countPrice(totalPrice)}</span>
                        </li>
                    </CartTotalsListStyled>
                    <CartTotalStyled>
                        <p>Total</p>
                        <span>{countPrice(grandTotal)}</span>
                    </CartTotalStyled>
                    <OrderLinkStyled to="/shopping-cart/checkout" $big>
                        PROCEED TO CHECKOUT
                        <ArrowIcon />
                    </OrderLinkStyled>
                </>
            )}
        </CartTotalsStyled>
    );
};
