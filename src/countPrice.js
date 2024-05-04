import { store } from "./redux/store";

export const countPrice = (price) => {
  const currency = store.getState().currency.current;

  return currency === "USD"
    ? "$" + price
    : "€" + Math.round(price * 1.07);
};

export const countTotalPrice = (array) => {
  return countPrice(
    array.reduce(
      (acc, { price, quantity }) => acc + price * quantity,
      0,
    ),
  );
};
