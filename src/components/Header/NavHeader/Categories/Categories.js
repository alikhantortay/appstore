import { useSelector } from "react-redux";
import { selectCategories } from "../../../../redux/shop/selectors";
import { Link } from "react-router-dom";

import { CategoriesStyled } from "./Categories.styled";

export const Categories = ({ onClick }) => {
  const categories = useSelector(selectCategories);

  return (
    <CategoriesStyled name="categories">
      <ul>
        {categories.map((item) => {
          return (
            <li key={item}>
              <Link to={`/shop/${item}`} onClick={onClick}>
                {item.replace("-", " ")}
              </Link>
            </li>
          );
        })}
      </ul>
    </CategoriesStyled>
  );
};
