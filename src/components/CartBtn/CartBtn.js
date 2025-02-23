import PropTypes from "prop-types";
import { useState } from "react";
import { ReactComponent as CartIcon } from "../../icons/CartSecond.svg";
import { CartBtnStyled } from "./CartBtn.styled";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import axios from "axios";

const API_ADD_TO_CART = "https://appstore.up.railway.app/shop-service/api/user/cart/cart-item";

export const CartBtn = ({ id, quantity = 1, big, disabled }) => {
    const [inCart, setInCart] = useState(false);

    const handleAddToCart = async () => {
        const token = sessionStorage.getItem("accessToken");

        if (!token) {
            Notify.failure("Ошибка: отсутствует токен авторизации!");
            return;
        }

        try {
            const quantityToAdd = quantity || 1; // ✅ По умолчанию 1

            // 🔥 Добавление в корзину через URL API
            await axios.post(
                `${API_ADD_TO_CART}/${id}/${quantityToAdd}/create`,
                null, // Body не нужен
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setInCart(true); // Обновляем состояние UI
            Notify.success("Товар добавлен в корзину!");
        } catch (error) {
            console.error("Ошибка при добавлении в корзину:", error);
            Notify.failure("Не удалось добавить товар в корзину.");
        }
    };

    return (
        <CartBtnStyled
            type="button"
            aria-label={inCart ? "Удалить из корзины" : "Добавить в корзину"}
            onClick={handleAddToCart}
            $inList={inCart}
            $big={big}
            disabled={disabled}
        >
            <CartIcon />
            {inCart ? "В КОРЗИНЕ" : "ДОБАВИТЬ НА КОРЗИНКУ"}
        </CartBtnStyled>
    );
};

CartBtn.propTypes = {
    id: PropTypes.number.isRequired,
    quantity: PropTypes.number,
    big: PropTypes.bool,
    disabled: PropTypes.bool,
};
