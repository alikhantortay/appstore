import { Link } from "react-router-dom";
import { useWindowWidth } from "../../../hooks/useWindowWidth";
import { useSelector } from "react-redux";
import { selectCategories } from "../../../redux/shop/selectors";

import { Container } from "../../Container/Container";

import { TitleStyled } from "../../../styles/common";
import { CategoriesStyled } from "./Categories.styled";

export const Categories = () => {
  const categories = useSelector(selectCategories);
  const width = useWindowWidth();

    console.log('Hey', categories)

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const getCategoryImageUrl = (imageName) => `${apiBaseUrl}/public/images/${imageName}`;



    return (
    <CategoriesStyled>
      <Container>
        <TitleStyled>Shop with Categories</TitleStyled>
        <swiper-container
          space-between="18"
          navigation={width > 767}
          mousewheel="true"
          keyboard="true"
          slides-per-view="auto">
            {categories.map(({ slug, name, imageName }) => (
                <swiper-slide key={slug} lazy="true">
                    <Link to={`/shop/${slug}`}>
                        <img
                            src={getCategoryImageUrl(imageName)}
                            alt={name}
                            loading="lazy"
                            style={{
                                width: "148px",
                                height: "148px",
                                objectFit: "cover"
                            }}
                        />

                        <h3 style={{fontSize: "1.1rem"}}>{name}</h3>
                    </Link>
                </swiper-slide>
            ))}
        </swiper-container>
      </Container>
    </CategoriesStyled>
    );
};
