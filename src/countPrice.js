import { store } from "./redux/store";

export const countPrice = (price) => {
  const currency = store.getState().currency.current;
  return currency === "USD"
    ? "$" + price
    : "€" + Math.round(price * 1.07);
};
