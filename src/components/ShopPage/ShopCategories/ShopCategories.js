import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCategories } from "../../../redux/shop/selectors";

import { ShopCategoriesStyled } from "./ShopCategories.styled";

export const ShopCategories = () => {
  const categories = useSelector(selectCategories);

  return (
    <ShopCategoriesStyled>
      <h2>CATEGORY</h2>

      <ul>
        {categories.map(({ slug, name }) => {
          return (
            <li key={slug}>
              <NavLink to={`/shop/${slug}`}>{name}</NavLink>
            </li>
          );
        })}
      </ul>
    </ShopCategoriesStyled>
  );
};
