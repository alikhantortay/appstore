import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Notify } from "notiflix/build/notiflix-notify-aio";

import { ReactComponent as CrossCircleIcon } from "../../../icons/XCircle.svg";
import { ReactComponent as ArrowIcon } from "../../../icons/ArrowRight.svg";

import {
    ListPriceStyled,
    ListRemoveBtnStyled,
    ListWrapper,
} from "../../../styles/listStyles";
import {
    CartBtnstyled,
    CartHeadingsStyled,
    CartProductStyled,
    CartStyled,
    QuantityStyled,
} from "./Cart.styled";

const API_CART = "https://appstore.up.railway.app/shop-service/api/user/cart/by-session/get";
const API_REMOVE_CART_ITEM = "https://appstore.up.railway.app/shop-service/api/user/cart";
const API_UPDATE_QUANTITY = "https://appstore.up.railway.app/shop-service/api/user/cart/cart-item"; // API обновления количества

export const Cart = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                setLoading(true);
                const token = sessionStorage.getItem("accessToken");
                if (!token) {
                    Notify.failure("Ошибка: отсутствует токен авторизации!");
                    return;
                }

                const response = await axios.get(API_CART, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.data && Array.isArray(response.data)) {
                    setItems(response.data.map(item => ({
                        ...item,
                        quantity: item.quantity || 1,
                    })));
                }
            } catch (error) {
                console.error("Ошибка загрузки корзины:", error.response ? error.response.data : error.message);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    // ✅ Получаем изображение товара
    const getImageUrl = (fileName) => {
        return fileName
            ? `https://appstore.up.railway.app/shop-service/api/public/images/${encodeURIComponent(fileName)}`
            : "/placeholder.png";
    };

    // ✅ Удаление товара из корзины
    const removeItem = async (id) => {
        if (!id) {
            console.error("Ошибка: передан пустой ID для удаления!");
            Notify.failure("Ошибка: Не удалось определить товар.");
            return;
        }

        try {
            const token = sessionStorage.getItem("accessToken");
            if (!token) {
                Notify.failure("Ошибка: отсутствует токен авторизации!");
                return;
            }

            const response = await axios.delete(`${API_REMOVE_CART_ITEM}/cart-item/${id}/delete`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 200) {
                setItems((prevState) => prevState.filter((item) => item.id !== id));
                Notify.success("Товар удален из корзины!");
            } else {
                console.error("Ошибка удаления товара:", response);
                Notify.failure("Ошибка при удалении товара.");
            }
        } catch (error) {
            console.error("Ошибка удаления из корзины:", error);
            Notify.failure("Не удалось удалить товар.");
        }
    };



    // ✅ Обновление количества товара
    const updateQuantity = async (id, newQuantity) => {
        if (!id) {
            console.error("Ошибка: передан пустой ID для обновления!");
            Notify.failure("Ошибка: Не удалось определить товар.");
            return;
        }

        if (newQuantity < 1) return;

        try {
            const token = sessionStorage.getItem("accessToken");
            if (!token) {
                Notify.failure("Ошибка: отсутствует токен авторизации!");
                return;
            }

            const response = await axios.put(`${API_REMOVE_CART_ITEM}/cart-item/${id}/update`,
                { quantity: newQuantity },
                {
                    headers: { Authorization: `Bearer ${token}` },
                });

            if (response.status === 200) {
                setItems((prevItems) =>
                    prevItems.map((item) =>
                        item.individualCode === id ? { ...item, quantity: newQuantity } : item
                    )
                );
                Notify.success("Количество товара обновлено!");
            } else {
                console.error("Ошибка обновления количества:", response);
                Notify.failure("Ошибка при обновлении количества.");
            }
        } catch (error) {
            console.error("Ошибка обновления количества:", error);
            Notify.failure("Не удалось обновить количество товара.");
        }
    };


    return (
        <ListWrapper>
            <h2>Корзина</h2>

            {loading ? (
                <p>Загрузка...</p>
            ) : error ? (
                <p>Ошибка загрузки корзины</p>
            ) : items.length > 0 ? (
                <>
                    <CartHeadingsStyled>
                        <li><p>PRODUCTS</p></li>
                        <li><p>PRICE</p></li>
                        <li><p>QUANTITY</p></li>
                        <li><p>SUB-TOTAL</p></li>
                    </CartHeadingsStyled>

                    <CartStyled>
                        {items.map(({ id, name, category, imageUrls, price, quantity }) => (
                            <li key={id}>
                                <CartProductStyled>
                                    <ListRemoveBtnStyled
                                        type="button"
                                        aria-label="Remove item from Cart"
                                        onClick={() => removeItem(id)}
                                    >
                                        <CrossCircleIcon />
                                    </ListRemoveBtnStyled>
                                    <Link to={`/shop/${category}/${name ? name.toLowerCase().replaceAll(" ", "-") : "unknown"}?id=${id}`}>
                                        <img
                                            src={getImageUrl(imageUrls ? imageUrls[0] : "")}
                                            alt={name || "Без названия"}
                                            width={72}
                                            height={72}
                                            loading="lazy"
                                        />
                                        {name || "Без названия"}
                                    </Link>
                                </CartProductStyled>

                                <ListPriceStyled>{price} $</ListPriceStyled>

                                <div>
                                    <QuantityStyled>
                                        <button
                                            type="button"
                                            onClick={() => updateQuantity(id, quantity - 1)}
                                            disabled={quantity < 2}
                                        >-</button>

                                        <input
                                            type="number"
                                            value={quantity}
                                            onChange={(e) => updateQuantity(id, Number(e.target.value))}
                                        />

                                        <button
                                            type="button"
                                            onClick={() => updateQuantity(id, quantity + 1)}
                                        >+</button>
                                    </QuantityStyled>
                                </div>

                                <ListPriceStyled>{(price * quantity).toFixed(2)} $</ListPriceStyled>
                            </li>
                        ))}
                    </CartStyled>
                </>
            ) : (
                <p>Ваша корзина пуста</p>
            )}

            <CartBtnstyled>
                <Link to="/shop"><ArrowIcon />RETURN TO SHOP</Link>
            </CartBtnstyled>
        </ListWrapper>
    );
};
