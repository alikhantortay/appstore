import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import { TagsStyled } from "./TagsStyled";

export const Tags = ({ footer }) => {
  return (
    <TagsStyled $footer={footer}>
      <h2>POPULAR TAG</h2>
      <ul>
        <li>
          <NavLink to="/shop?q=game">Game</NavLink>
        </li>
        <li>
          <NavLink to="/shop?q=iphone">iPhone</NavLink>
        </li>
        <li>
          <NavLink to="/shop?q=tv">TV</NavLink>
        </li>
        <li>
          <NavLink to="/shop?q=asus+laptops">
            Asus Laptops
          </NavLink>
        </li>
        <li>
          <NavLink to="/shop?q=macbook">MacBook</NavLink>
        </li>
        <li>
          <NavLink to="/shop?q=ssd">SSD</NavLink>
        </li>
        <li>
          <NavLink to="/shop?q=graphic+card">
            Graphic Card
          </NavLink>
        </li>
        <li>
          <NavLink to="/shop?q=power+bank">
            Power Bank
          </NavLink>
        </li>
        <li>
          <NavLink to="/shop?q=smart+tv">Smart TV</NavLink>
        </li>
        <li>
          <NavLink to="/shop?q=speaker">Speaker</NavLink>
        </li>
        <li>
          <NavLink to="/shop?q=tablet">Tablet</NavLink>
        </li>
        <li>
          <NavLink to="/shop?q=microvawe">
            Microvawe
          </NavLink>
        </li>
        <li>
          <NavLink to="/shop?q=samsung">Samsung</NavLink>
        </li>
      </ul>
    </TagsStyled>
  );
};

Tags.propTypes = {
  footer: PropTypes.bool,
};
