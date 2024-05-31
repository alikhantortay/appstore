import { useSelector } from "react-redux";
import { selectCategories } from "../../../../redux/shop/selectors";
import { Link } from "react-router-dom";

import { CategoriesStyled } from "./Categories.styled";

export const Categories = ({ onClick }) => {
  const categories = useSelector(selectCategories);

  return (
    <CategoriesStyled name="categories">
      <ul>
        {categories.map(({ slug, name }) => {
          return (
            <li key={slug}>
              <Link to={`/shop/${slug}`} onClick={onClick}>
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </CategoriesStyled>
  );
};
