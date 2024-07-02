import { useState } from "react";

import {
  CouponBtnStyled,
  CouponCodeStyled,
} from "./CouponCode.styled";

export const CouponCode = () => {
  const [applied, setApplied] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setApplied(true);
  };

  return (
    <CouponCodeStyled>
      <h2>Coupon Code</h2>
      {applied ? (
        <p>Coupon applied!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Coupon Code"
            required
          />
          <CouponBtnStyled type="submit">
            APPLY COUPON
          </CouponBtnStyled>
        </form>
      )}
    </CouponCodeStyled>
  );
};
