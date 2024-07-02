import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useWindowWidth } from "../../../hooks/useWindowWidth";
import { fetch } from "../../../API";

import { Container } from "../../Container/Container";
import { Loader } from "../../Loader/Loader";
import { ItemCard } from "../../ItemCard/ItemCard";
import { ShopLink } from "../../ShopLink/ShopLink";
import { ReactComponent as ArrowRightIcon } from "../../../icons/ArrowRight.svg";

import {
  ErrorMessageStyled,
  ItemListStyled,
  TitleStyled,
} from "../../../styles/common";

import {
  FeaturedArticleStyled,
  FeaturedEndsStyled,
  FeaturedLinksStyled,
  FeaturedStyled,
  FeaturedTextStyled,
  FeaturedTitleStyled,
  UpperSpanStyled,
} from "./Featured.styled";

export const Featured = () => {
  const width = useWindowWidth();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getItems = async () => {
      try {
        setLoading(true);
        const responce = await fetch("?limit=8&skip=132");

        setItems(responce.data.products);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getItems();
  }, []);

  return (
    <FeaturedStyled>
      <Container>
        <FeaturedArticleStyled>
          <div>
            <UpperSpanStyled>
              COMPUTER & ACCESSORIES
            </UpperSpanStyled>
            <TitleStyled>32% Discount</TitleStyled>
            <FeaturedTextStyled>
              For all ellectronics products
            </FeaturedTextStyled>
            <FeaturedEndsStyled>
              Offers ends in: <span>ENDS OF CHRISTMAS</span>
            </FeaturedEndsStyled>
            <ShopLink to="/shop/laptops" big />
          </div>
          <img
            src={require("../../../images/featured.jpeg")}
            alt="Electronic devices"
            width={312}
            height={428}
            loading="lazy"
          />
        </FeaturedArticleStyled>
        <FeaturedTitleStyled>
          <h2>Featured Products</h2>
          <FeaturedLinksStyled>
            <li>
              <Link
                to="/shop"
                onClick={(e) => e.preventDefault()}>
                All Products
              </Link>
            </li>
            <li>
              <Link to="/shop/smartphones">
                Smartphones
              </Link>
            </li>
            <li>
              <Link to="/shop/laptops">Laptops</Link>
            </li>
            <li>
              <Link to="/shop/sunglasses">Sunglasses</Link>
            </li>
            <li>
              <Link to="/shop/furniture">Furniture</Link>
            </li>
          </FeaturedLinksStyled>
          <Link to="/shop">
            Browse All Products
            <ArrowRightIcon />
          </Link>
        </FeaturedTitleStyled>

        <ItemListStyled>
          {items.length > 0 &&
            items.map((item) => {
              return (
                <li key={item.id}>
                  <ItemCard item={item} />
                </li>
              );
            })}
        </ItemListStyled>

        {error && (
          <ErrorMessageStyled>{error}</ErrorMessageStyled>
        )}
        {loading && <Loader />}
      </Container>
    </FeaturedStyled>
  );
};
