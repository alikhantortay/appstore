import { useSelector } from "react-redux";
import { selectCurrency } from "../redux/shop/selectors";

export const usePrice = () => {
  const currency = useSelector(selectCurrency);

  const countPrice = (price) => {
    return currency === "USD"
      ? "$" + Math.round(price)
      : "€" + Math.round(price * 1.07);
  };

  const countSalePrice = (price, discount = 10) => {
    return countPrice(price - (price * discount) / 100);
  };

  const countTotalPrice = (array) => {
    return countPrice(
      array.reduce(
        (acc, { price, quantity, discountPercentage }) =>
          acc +
          (price - (price * discountPercentage) / 100) *
            quantity,
        0,
      ),
    );
  };

  return { countPrice, countSalePrice, countTotalPrice };
};
