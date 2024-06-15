import { Link } from "react-router-dom";
import { useWindowWidth } from "../../../hooks/useWindowWidth";
import { useSelector } from "react-redux";
import { selectCategories } from "../../../redux/shop/selectors";
import { register } from "swiper/element/bundle";

import { Container } from "../../Container/Container";

import { TitleStyled } from "../../../styles/common";
import { CategoriesStyled } from "./Categories.styled";

export const Categories = () => {
  const categories = useSelector(selectCategories);
  const width = useWindowWidth();

  register();

  return (
    <CategoriesStyled>
      <Container>
        <TitleStyled>Shop with Categories</TitleStyled>
        <swiper-container
          space-between="18"
          navigation={width > 767}
          mousewheel="true"
          keyboard="true"
          slides-per-view={
            width > 767
              ? Math.round(width / 205)
              : width / 125
          }
          loop="true">
          {categories.map(({ slug, name, img }) => {
            return (
              <swiper-slide key={slug}>
                <Link to={`/shop/${slug}`}>
                  <img
                    src={img}
                    alt={name}
                    width={148}
                    height={148}
                    loading="lazy"
                  />
                  <h3>{name}</h3>
                </Link>
              </swiper-slide>
            );
          })}
        </swiper-container>
      </Container>
    </CategoriesStyled>
  );
};
