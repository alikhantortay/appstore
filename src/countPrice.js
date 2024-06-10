import { store } from "./redux/store";

export const countPrice = (price) => {
  const currency = store.getState().currency.current;
  return currency === "USD"
    ? "$" + Math.round(price)
    : "€" + Math.round(price * 1.07);
};

export const countSalePrice = (price, discount = 10) => {
  return countPrice(price - (price * discount) / 100);
};

export const countTotalPrice = (array) => {
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
