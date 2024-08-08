import { useDispatch } from "react-redux";

import { DetailsQuantityStyled } from "./DetailsQuantity.styled";
import {
  changeQuantity,
  decreaseQuantity,
  increaseQuantity,
} from "../../../redux/shop/cartSlice";

export const DetailsQuantity = ({
  id,
  inCart,
  quantity,
  setQuantity,
}) => {
  const dispatch = useDispatch();

  return (
    <DetailsQuantityStyled>
      <button
        type="button"
        aria-label="Remove one unit from cart"
        onClick={() => {
          setQuantity((quantity -= 1));
          inCart && dispatch(decreaseQuantity(id));
        }}
        disabled={quantity < 2}>
        -
      </button>
      <input
        type="number"
        onFocus={(e) => (e.target.value = "")}
        onChange={(e) => {
          setQuantity(Number(e.target.value));
          inCart &&
            dispatch(
              changeQuantity({
                id,
                quantity: Number(e.target.value),
              }),
            );
        }}
        value={quantity < 10 ? "0" + quantity : quantity}
        placeholder={
          quantity < 10 ? "0" + quantity : quantity
        }
      />
      <button
        type="button"
        aria-label="Add one unit to cart"
        onClick={() => {
          setQuantity((quantity += 1));
          inCart && dispatch(increaseQuantity(id));
        }}>
        +
      </button>
    </DetailsQuantityStyled>
  );
};
