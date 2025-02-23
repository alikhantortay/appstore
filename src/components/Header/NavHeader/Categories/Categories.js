import { useSelector } from "react-redux";
import { selectCategories } from "../../../../redux/shop/selectors";
import { Link } from "react-router-dom";
import { useState } from "react";

import { CategoriesStyled, SubCategoriesStyled } from "./Categories.styled";

export const Categories = ({ onClick }) => {
    const categories = useSelector(selectCategories);
    const [activeCategory, setActiveCategory] = useState(null);

    return (
        <CategoriesStyled name="categories">
            <ul>
                {categories.map((category) => (
                    <li
                        key={category.id}
                        onMouseEnter={() => setActiveCategory(category.id)}
                        onMouseLeave={() => setActiveCategory(null)}
                    >
                        <Link to={`/shop/${category.id}`}>{category.name}</Link>

                        {/* Показываем subCatalogs при наведении */}
                        {activeCategory === category.id && category.subCatalogs?.length > 0 && (
                            <SubCategoriesStyled>
                                <ul>
                                    {category.subCatalogs.map((sub) => (
                                        <li key={sub.id}>
                                            <Link to={`/shop/${sub.id}`}>{sub.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </SubCategoriesStyled>
                        )}
                    </li>
                ))}
            </ul>
        </CategoriesStyled>
    );
};
