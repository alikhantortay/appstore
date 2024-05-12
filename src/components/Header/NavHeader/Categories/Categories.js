import { useSelector } from "react-redux";
import { CategoriesStyled } from "./Categories.styled";
import { selectCategories } from "../../../../redux/shop/selectors";
import { Link } from "react-router-dom";

export const Categories = () => {
  const categories = useSelector(selectCategories);

  return (
    <CategoriesStyled name="categories">
      <ul>
        {categories.map((item) => {
          return (
            <li key={item}>
              <Link to={`/shop/${item}`}>
                {item.replace("-", " ")}
              </Link>
            </li>
          );
        })}
      </ul>
    </CategoriesStyled>
  );
};
